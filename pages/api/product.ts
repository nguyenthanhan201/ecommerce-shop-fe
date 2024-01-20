import type { NextApiRequest, NextApiResponse } from 'next';

import { Product } from '@/lib/redux/types/product.type';
import { productData } from '@/utils/index';

type ResponseData = {
  data: Array<Product>;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  res.status(200).json({ data: productData.getAllProducts() as Product[] });
}
