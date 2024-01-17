import { AxiosRequestConfig } from 'axios';

import { deleteReq, get, post, put } from '../axios/requests';
import { Product } from '../redux/types/product.type';
import { CrudRepository } from './crud.repo';

export class ProductRepository extends CrudRepository<Product> {
  apiName = 'product';
  displayName = 'Products';

  async createProduct(product: Product) {
    const res = await post('/product/store', product);
    return res;
  }

  async updateProduct(product: Product) {
    const res = await put(`/product/${product._id}`, product);
    return res;
  }

  async hideProduct(id: string) {
    const res = await put(`/product/hide/${id}`);
    return res;
  }

  async unhideProduct(id: string) {
    const res = await put(`/product/unhide/${id}`);
    return res;
  }

  async deleteProduct(id: string) {
    const res = await deleteReq(`/product/${id}`);
    return res;
  }

  async getHideProducts(config?: AxiosRequestConfig<any> | undefined) {
    const res = await get(`/product/hide`, config);
    // console.log('👌  res:', res);
    return res;
  }

  async getMostViewedProducts() {
    const res = await get<any>(`/product/most-viewed`, {});
    return res;
  }

  async updateViewsProduct(idProduct: string) {
    const res = await put(`/product/most-viewed/${idProduct}`);
    return res;
  }
}
export const ProductServices = new ProductRepository();
