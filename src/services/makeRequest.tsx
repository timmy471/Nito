import { getAccessToken } from '@src/services';
import { ErrorHandler } from './errorHandler';
import { axiosInstance } from './axiosInstace';

const makeRequest = (
  requestType: string,
  appendUrl: string,
  payload?: object,
  access_token?: string
): any => {
  axiosInstance.interceptors.request.use(
    (config) => {
      const accessToken = getAccessToken() || access_token;
      if (accessToken) {
        config.headers!.Authorization = `Bearer ${accessToken}`;
      }

      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );

  const axiosGet = () => {
    return new Promise((resolve, reject) => {
      axiosInstance
        .get(appendUrl)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(ErrorHandler(error));
        });
    });
  };

  const axiosPost = () => {
    return new Promise((resolve, reject) => {
      axiosInstance
        .post(appendUrl, payload)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(ErrorHandler(error));
        });
    });
  };

  const axiosDelete = () => {
    return new Promise((resolve, reject) => {
      axiosInstance
        .delete(appendUrl, payload)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(ErrorHandler(error));
        });
    });
  };

  const axiosPut = () => {
    return new Promise((resolve, reject) => {
      axiosInstance
        .put(appendUrl, payload)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(ErrorHandler(error));
        });
    });
  };

  const axiosPatch = () => {
    return new Promise((resolve, reject) => {
      axiosInstance
        .patch(appendUrl, payload)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(ErrorHandler(error));
        });
    });
  };

  switch (requestType.toLowerCase()) {
    case 'post':
      return axiosPost();

    case 'get':
      return axiosGet();

    case 'delete':
      return axiosDelete();

    case 'put':
      return axiosPut();

    case 'patch':
      return axiosPatch();

    default:
      break;
  }
};

export default makeRequest;
