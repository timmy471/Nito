import axios from 'axios';
import { AxiosRequestConfig } from 'axios';
import { getAccessToken } from '@src/services';
import { API } from '@src/redux/constants';

const baseURL = `${API}`;

export const axiosInstance = axios.create({
  baseURL,
});

axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig): AxiosRequestConfig => {
    if (getAccessToken()) {
      config.headers!.Authorization = `Bearer ${getAccessToken()}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
