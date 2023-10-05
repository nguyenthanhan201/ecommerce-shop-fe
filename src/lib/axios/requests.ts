import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

import { isEmpty } from '../helpers/functions';
import { getCookie, removeCookie, setCookie } from '../hooks/useCookie';
import { AuthServices } from '../repo/auth.repo';

const request = () => {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BE,
    withCredentials: true,
    timeout: 60000, // 60s
    // headers: {
    //   'Access-Control-Allow-Headers': '*', // allow all
    //   Cookie: `token=${getCookie('token')}`,
    // },
  });

  instance.interceptors.response.use(undefined, async (errorResponse: AxiosError) => {
    const accessToken = getCookie('token');

    if (errorResponse.response?.status !== 401 || isEmpty(accessToken))
      return Promise.reject(errorResponse);
    const originalRequest = errorResponse.config;

    // handle access token expired
    return await AuthServices.refreshToken().then(
      async (rs) => {
        const { access_token: newToken } = await rs;

        setCookie('token', newToken);

        // Create a new instance with updated headers
        const newRequestInstance = axios.create({
          ...instance.defaults,
          headers: {
            ...instance.defaults.headers,
            // Authorization: `Bearer ${newToken}`,
          },
        });

        // call expired api again
        return await newRequestInstance
          .request({
            ...originalRequest,
            headers: {
              ...originalRequest?.headers,
              // Authorization: `Bearer ${newToken}`,
            },
          })
          .then(
            (res) => {
              return res;
            },
            (error) => {
              console.log('🚀 ~ file: crud-axios.ts error', error);
              return Promise.reject(error);
            },
          );
      },
      (error) => {
        console.log('🚀 ~ file: crud-axios.ts error', error);
        removeCookie('token');
        removeCookie('refreshToken');
        return Promise.reject(error);
      },
    );
  });

  return instance;
};

export const get = async (path: string, config?: AxiosRequestConfig<any>) => {
  const response: AxiosResponse = await request().get(path, config);
  return response.data;
};

export const post = async (path: string, data: object = {}, config?: AxiosRequestConfig<any>) => {
  const response: AxiosResponse = await request().post(path, data, config);
  return response.data;
};

export const put = async (path: string, data: object = {}, config?: AxiosRequestConfig<any>) => {
  const response: AxiosResponse = await request().put(path, data, config);
  return response.data;
};

export const deleteReq = async (path: string, config?: AxiosRequestConfig<any>) => {
  const response: AxiosResponse = await request().delete(path, config);
  return response.data;
};

export default request;
