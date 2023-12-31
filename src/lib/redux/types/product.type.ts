export interface Product {
  _id: string;
  title: string;
  image01: string;
  image02: string;
  price: string;
  slug: string;
  size: Array<string>;
  categorySlug: string;
  colors: Array<string>;
  description: string;
  views: number;
  deletedAt?: string;
  stock: number;
  discount?: number;
  sold: number;
}
