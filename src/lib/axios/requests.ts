import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

import { isEmptyToken } from '../helpers/assertion';
import { removeCookie, setCookie } from '../hooks/useCookie';
import { AuthServices } from '../repo/auth.repo';

type SuccessResponse<V> = {
  code: 'SUCCESS';
  data: V;
};

type ErrorResponse<E = AxiosError> = {
  code: 'ERROR';
  error: E;
};

type BaseResponse<V, E = AxiosError> = Promise<SuccessResponse<V> | ErrorResponse<E>>;

const ERROR_MAX_RETRY = 2;

const request = () => {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BE,
    withCredentials: true,
    timeout: 60000 // 60s
    // headers: {
    //   'Access-Control-Allow-Headers': '*', // allow all
    //   Cookie: `token=${getCookie('token')}`,
    // },
  });

  instance.interceptors.response.use(undefined, async (errorResponse: AxiosError) => {
    const originalRequest = errorResponse.config;

    // Create a new instance with updated headers
    const newRequestInstance = axios.create({
      ...instance.defaults,
      headers: {
        ...instance.defaults.headers
      }
    });

    // Copy headers from original request
    const request = newRequestInstance.request({
      ...originalRequest,
      headers: {
        ...originalRequest?.headers
      }
    });

    // retry if error is not expired token
    if (errorResponse.response?.status !== 401 || isEmptyToken()) {
      const fetchWithRetry = (errorCount = 0) => {
        const randomTime = Math.pow(2, errorCount) * 3000 + Math.random() * 1000;

        if (errorCount < ERROR_MAX_RETRY) {
          return setTimeout(async () => {
            await request
              .then((res) => {
                return res;
              })
              .catch(async () => {
                await fetchWithRetry(errorCount + 1);
              });
          }, randomTime);
        } else {
          console.log('🚀 ~ file: crud-axios.ts error', errorResponse);
          return Promise.reject(errorResponse);
        }
      };

      return fetchWithRetry();
    } else {
      // handle access token expired
      return await AuthServices.refreshToken().then(async (rs) => {
        if (rs.code === 'ERROR') {
          console.log('🚀 ~ file: crud-axios.ts error', rs.error);
          removeCookie('token');
          removeCookie('refreshToken');
          return Promise.reject(rs.error);
        }

        const { access_token: newToken } = rs.data;
        setCookie('token', newToken);

        // call expired api again
        return await request.then(
          (res) => {
            return res;
          },
          (error) => {
            console.log('🚀 ~ file: crud-axios.ts error', error);
            return Promise.reject(error);
          }
        );
      });
    }
  });

  return instance;
};

export const get = async <V, E = AxiosError>(
  path: string,
  config?: AxiosRequestConfig
): BaseResponse<V, E> => {
  try {
    const response = await request().get(path, config);
    return {
      code: 'SUCCESS',
      data: response.data
    };
  } catch (error) {
    return {
      code: 'ERROR',
      error: error as E
    };
  }
};

export const post = async (path: string, data: object = {}, config?: AxiosRequestConfig) => {
  const response: AxiosResponse = await request().post(path, data, config);
  return response.data;
};

export const put = async (path: string, data: object = {}, config?: AxiosRequestConfig) => {
  const response: AxiosResponse = await request().put(path, data, config);
  return response.data;
};

export const deleteReq = async (path: string, config?: AxiosRequestConfig) => {
  const response: AxiosResponse = await request().delete(path, config);
  return response.data;
};
