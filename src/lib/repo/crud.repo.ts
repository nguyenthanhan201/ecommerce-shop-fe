import { get } from '../axios/requests';

export abstract class CrudRepository<T> {
  abstract apiName: string;
  abstract displayName: string;

  async getAll(_isNotToken?: boolean): Promise<{ fromCache: boolean; data: T[] }> {
    try {
      const res = await get(`/${this.apiName}/getAll${this.displayName}/${this.apiName}s`, {
        // headers: {
        //   Authorization: isNotToken ? '' : 'Bearer ' + localStorage.getItem('token'),
        // },
      });
      // console.log("👌  res:", res);

      return res;
    } catch (err) {
      // console.log("👌  err:", err);
      console.log(`Lấy danh sách ${this.apiName} thất  bại.`);
      throw err;
    }
  }
}
