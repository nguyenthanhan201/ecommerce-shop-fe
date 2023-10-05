/* eslint-disable no-restricted-globals */
import { ProductServices } from '@/lib/repo/product.repo';

import { ProcessList } from './enums';

self.onmessage = async (e: MessageEvent<string>) => {
  if (e.data === ProcessList.getData) {
    const products = await ProductServices.getAll();
    self.postMessage(products);
  }
};
