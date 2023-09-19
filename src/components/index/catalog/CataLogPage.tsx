import { memo, useEffect, useState } from 'react';
import { useQuery } from 'react-query';

import InfinityList from '@/components/shared/InfinityList';
import Loading from '@/components/shared/Loading/Loading';
import { ProductServices } from '@/lib/repo/product.repo';
import { productData } from '@/utils/index';

import CatalogFilter from './components/CatalogFilter';

export type FilterType = {
  category: string[];
  color: string[];
  size: string[];
  prices: number[][];
};

const initFilter = {
  category: [],
  color: [],
  size: [],
  prices: [],
};

const CatalogPage = () => {
  const { isLoading } = useQuery({
    queryKey: 'products',
    queryFn: async () =>
      await ProductServices.getAll().then((res: any) => {
        setProductList([...res, ...productList]);
      }),
  });

  const [productList, setProductList] = useState(productData.getAllProducts());
  const [products, setProducts] = useState(productList);
  const [filter, setFilter] = useState<FilterType>(initFilter);

  useEffect(() => {
    (function updateProducts() {
      let temp = productList;

      if (filter.category.length > 0) {
        temp = temp.filter((e) => {
          const check = filter.category.find((category) => e.categorySlug === category);
          return check !== undefined;
        });
      }

      if (filter.color.length > 0) {
        temp = temp.filter((e) => {
          const check = e.colors.find((color) => filter.color.includes(color));
          return check !== undefined;
        });
      }

      if (filter.size.length > 0) {
        temp = temp.filter((e) => {
          const check = e.size.find((size) => filter.size.includes(size));
          return check !== undefined;
        });
      }

      if (filter.prices.length > 0) {
        temp = temp.filter((e) => {
          const check = filter.prices.find((price) => {
            return Number(e.price) >= price[0] && Number(e.price) <= price[1];
          });
          return check !== undefined;
        });
      }
      setProducts(temp);
    })();
  }, [filter, productList]);

  return (
    <>
      <div className='catalog'>
        <CatalogFilter filter={filter} setFilter={setFilter} />
        <div className='catalog_content'>
          {isLoading ? <Loading /> : <InfinityList data={products as any} />}
        </div>
      </div>
    </>
  );
};

export default memo(CatalogPage);
