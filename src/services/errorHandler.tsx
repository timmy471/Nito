import Router from 'next/router';
import { Logout } from '@src/services';
import { displayAlert } from '@src/helpers';

export const ErrorHandler = (error: any, isProtected = true) => {
  if (typeof window !== 'undefined' && !window.navigator.onLine) {
    displayAlert({
      msg: 'Check your internet connection.',
      header: 'Network Error',
      placement: 'bottomRight',
    });
    return {};
  }

  let message = '';
  let defaultMessage = 'Something went wrong, please try again.';
  if (error?.response) {
    let status = error.response.status;
    if (status >= 500 && status < 600) {
      displayAlert({ msg: defaultMessage });
      return {};
    }
    if (status.toString().startsWith('4')) {
      if (status === 401) {
        if (isProtected) {
          Logout();
        }

        message = error.response.data?.message;
      } else if (status === 403) {
        Router.push('/dashboard');
      } else if (status === 404) {
        message = error.response.data.message;
        return { message, status };
      } else {
        //Cases 422, 400, e.t.c
        const errorArr = error.response.data?.data;
        if (Array.isArray(errorArr)) {
          let formattedError = '';
          errorArr.forEach((err: string, i: number) => {
            formattedError += err + `${i === errorArr.length - 1 ? '.' : ', '}`;
          });
          displayAlert({ msg: formattedError });
          return formattedError;
        }

        if (error.response.data.message) {
          displayAlert({ msg: error.response.data.message });
        }
        return error.response;
      }
    }
  } else {
    message = error?.message || defaultMessage;
  }
  return { message };
};

export const isHttpNotFound = (error: any) => error?.status?.toString() === '404';
