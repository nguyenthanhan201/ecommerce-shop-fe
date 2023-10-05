/* eslint-disable no-restricted-globals */
import { ProductServices } from '@/lib/repo/product.repo';

import { ProcessList } from './enums';

self.onmessage = async (e: MessageEvent<string>) => {
  if (e.data === ProcessList.getDataMostViewedProducts) {
    const products = await ProductServices.getMostViewedProducts().then((res) => {
      return res;
    });
    // console.log("👌 ~ products", products.data)
    self.postMessage(products);
  }
};
