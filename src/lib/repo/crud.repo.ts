import { AxiosRequestConfig } from 'axios';

import { get } from '../axios/requests';

export abstract class CrudRepository<T> {
  abstract apiName: string;
  abstract displayName: string;

  async getAll(config?: AxiosRequestConfig) {
    const res = await get<{ fromCache: boolean; data: T[] }>(
      `/${this.apiName}/getAll${this.displayName}/${this.apiName}s`,
      config
    );

    if (res.code === 'ERROR') {
      console.log(`Lấy danh sách ${this.apiName} thất  bại.`);
      throw new Error(res.error.message);
    }

    if (res.data.fromCache) return res.data.data;
    return res.data;
  }
}
