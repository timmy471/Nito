import axios from 'axios';
import {
  ILoginFormData,
  IForgotPasswordActionType,
  IVerifyOTPFormData,
  INewPasswordActionType,
  IRole,
} from 'types';
import moment from 'moment';
import Router from 'next/router';
import { API } from '../constants';
import { getStorageUser } from '@src/services';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { displayAlert, getMinutes } from '@src/helpers';
import { ErrorHandler } from '@src/services/errorHandler';
import { setCookie, destroyCookie, parseCookies } from 'nookies';
import { setLoadingTrue, setLoadingFalse } from '../slices/authSlice';

const formatLastLogin = (lastLogin: string) => {
  const dateTime = new Date(lastLogin);

  return moment(dateTime).format('MMMM DD, YYYY h:mm a');
};

//Returns an array of strings of the user's role permissions
export const formatUserPermissions = (permissions: any) => {
  if (!permissions) return [];

  let permissionsArr: string[] = [];

  Object.entries(permissions).forEach(([key, value]) =>
    (value as unknown as IRole[]).forEach((val) => permissionsArr.push(val.name))
  );

  return permissionsArr;
};

/* Login */
export const UserLogin = createAsyncThunk(
  'auth/login',
  async (payload: ILoginFormData, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoadingTrue());
      const { remember, ...rest } = payload;
      const { data } = await axios.post(`${API}/users/login`, rest);
      const { user, token, lastLogin } = data?.data;

      const { data: roleData } = await axios.get(`${API}/roles/${user.roleId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      user.permissions = formatUserPermissions(roleData.data?.permissions);

      if (remember)
        setCookie(null, 'email', payload.email, {
          path: '/',
          sameSite: 'strict',
        });
      if (lastLogin) user.lastLogin = formatLastLogin(lastLogin);

      setCookie(null, 'assetStackAdmin', JSON.stringify({ user, access_token: token }), {
        path: '/',
        sameSite: 'strict',
      });
      Router.push('/dashboard');

      return user;
    } catch (error) {
      const { message } = ErrorHandler(error, false);
      if (message) displayAlert({ msg: message });
      dispatch(setLoadingFalse());
      return rejectWithValue(error);
    }
  }
);

export const UserForgotPassword = createAsyncThunk(
  'auth/forgot-password',
  async ({ payload, cb }: IForgotPasswordActionType) => {
    try {
      const cookies = parseCookies();

      //Incase user clicks on 'Resend mail'
      const passwordResetData = cookies.password_reset || '{}';

      const newEmail = payload?.email || JSON.parse(passwordResetData)?.email;

      const newPayload = { email: newEmail };

      await axios.post(`${API}/users/password-reset`, newPayload);
      setCookie(null, 'password_reset', JSON.stringify(newPayload), {
        path: '/',
        sameSite: 'strict',
        expires: getMinutes(10),
      });

      if (cb) cb();

      if (!payload) {
        displayAlert({ msg: 'OTP has been resent to your mail', variant: 'success' });
      }
    } catch (error) {
      const { message } = ErrorHandler(error, false);
      if (message) displayAlert({ msg: message });
    }
  }
);

export const UserVerifyOTP = createAsyncThunk(
  'auth/verify-otp',
  async (payload: IVerifyOTPFormData) => {
    try {
      const cookies = parseCookies();

      const passwordResetData = cookies.password_reset;
      if (!passwordResetData) return Router.push('/forgot-password');

      const email = JSON.parse(passwordResetData)?.email;
      if (!email) Router.push('/forgot-password');
      const newPayload = {
        otp: Number(payload.otp),
        email,
      };

      await axios.patch(`${API}/users/password-reset/otp`, newPayload);
      setCookie(null, 'password_reset', JSON.stringify(newPayload), {
        path: '/',
        sameSite: 'strict',
        expires: getMinutes(10),
      });

      Router.push('/new-password');
    } catch (error) {
      const { message } = ErrorHandler(error, false);
      if (message) displayAlert({ msg: message });
    }
  }
);

export const UserResetPassword = createAsyncThunk(
  'auth/reset-password',
  async ({ payload, cb }: INewPasswordActionType) => {
    try {
      const cookies = parseCookies();
      const passwordResetData = cookies.password_reset;

      if (!passwordResetData) return Router.push('/forgot-password');
      const { email, otp } = JSON.parse(passwordResetData);

      if (!email || !otp) Router.push('/forgot-password');
      const newPayload = { email, otp: Number(otp), newPassword: payload?.password };

      await axios.patch(`${API}/users/password-reset`, newPayload);

      destroyCookie(null, 'password_reset', { path: '/' });
      if (cb) cb();
    } catch (error) {
      const { message } = ErrorHandler(error, false);
      if (message) displayAlert({ msg: message });
    }
  }
);

export const hasPermission = (permission?: string) => {
  if (!permission) return false;
  const userPermissions = getStorageUser()?.user?.permissions;
  return userPermissions?.includes(permission);
};
