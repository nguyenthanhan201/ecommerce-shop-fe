import axios, { AxiosRequestConfig } from "axios";

const request = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BE,
});

export const get = async (path: string, config?: AxiosRequestConfig<any>) => {
  const response = await request.get(path, config);
  return response.data;
};

export const post = async (
  path: string,
  data: object = {},
  config?: AxiosRequestConfig<any>
) => {
  const response = await request.post(path, data, config);
  return response.data;
};

export const put = async (
  path: string,
  data: object = {},
  config?: AxiosRequestConfig<any>
) => {
  const response = await request.put(path, data, config);
  return response.data;
};

export const deleteReq = async (
  path: string,
  config?: AxiosRequestConfig<any>
) => {
  const response = await request.delete(path, config);
  return response.data;
};

export default request;
