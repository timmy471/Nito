import { formatUrl } from '@src/helpers';
import { createAsyncThunk } from '@reduxjs/toolkit';
import makeRequest from '@src/services/makeRequest';
import { IAdminUser, IAdminUserQueryParam } from 'types';
import { clearCurrentAdminUser } from '../slices/teamSlice';

export const GetAdminUsers = createAsyncThunk(
  'team/get-users',
  async (_, { rejectWithValue, getState }) => {
    try {
      const {
        team: { queryParams },
      } = getState() as { team: { queryParams: IAdminUserQueryParam } };

      const { data } = await makeRequest('get', formatUrl('/users', queryParams));
      return data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const CreateAdminUser = createAsyncThunk(
  'team/create-user',
  async (
    { payload, cb }: { payload: IAdminUser; cb: () => void },
    { rejectWithValue, getState, dispatch }
  ) => {
    try {
      const {
        team: { currentUser },
      } = getState() as { team: { currentUser: IAdminUser } };

      const method = !!currentUser ? 'put' : 'post';
      const url = !!currentUser ? `/users/${currentUser.id}` : '/users';

      const { data } = await makeRequest(method, url, payload);
      cb?.();
      dispatch(clearCurrentAdminUser());
      return data?.data?.user ? data.data?.user : data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
