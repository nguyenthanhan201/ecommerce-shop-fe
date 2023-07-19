import { get, post, put } from "../axios/requests";
import { Product } from "../redux/types/product.type";
import { CrudRepository } from "./crud.repo";

export class ProductRepository extends CrudRepository<Product> {
  apiName = "product";
  displayName = "Products";

  async createProduct(product: Product) {
    const res = await post("/product/store", product);
    return res;
  }

  async updateProduct(product: Product) {
    const res = await post(`/product/${product._id}?_method=PUT`, product);
    return res;
  }

  async hideProduct(id: string) {
    const res = await post(`/product/hide/${id}?_method=PUT`);
    return res;
  }

  async unhideProduct(id: string) {
    const res = await post(`/product/unhide/${id}?_method=PUT`);
    return res;
  }

  async deleteProduct(id: string) {
    const res = await post(`/product/${id}?_method=DELETE`);
    return res;
  }

  async getHideProducts() {
    const res = await get(`/product/hide`, {
      headers: {
        authentication: "Bearer " + localStorage.getItem("token"),
      },
    });
    return res;
  }

  async getMostViewedProducts() {
    const res = await get(`/product/most-viewed`);
    return res;
  }

  async updateViewsProduct(idProduct: string) {
    const res = await put(`/product/most-viewed/${idProduct}?_method=PUT`);
    return res;
  }
}
export const ProductServices = new ProductRepository();
