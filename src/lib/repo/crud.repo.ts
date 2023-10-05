import { AxiosRequestConfig } from 'axios';

import { get } from '../axios/requests';

export abstract class CrudRepository<T> {
  abstract apiName: string;
  abstract displayName: string;

  async getAll(
    config?: AxiosRequestConfig<any> | undefined,
  ): Promise<{ fromCache: boolean; data: T[] }> {
    try {
      const res = await get(`/${this.apiName}/getAll${this.displayName}/${this.apiName}s`, config);
      // console.log('👌  res:', res);

      if (res.fromCache) return res.data;

      return res;
    } catch (err) {
      // console.log("👌  err:", err);
      console.log(`Lấy danh sách ${this.apiName} thất  bại.`);
      throw err;
    }
  }
}
