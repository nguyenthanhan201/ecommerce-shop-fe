import { useSEO } from 'my-package';
import { NextPageContext } from 'next';

import ProductDetailPage from '@/components/index/product-detail/ProductDetailPage';
import DefaultLayout from '@/layouts/default-layout/DefaultLayout';

const Page = ({ query }: any) => {
  return <ProductDetailPage product={query} />;
};

export default Page;
Page.Layout = DefaultLayout;

export const getServerSideProps = async (context: NextPageContext) => {
  const { query } = context;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const seo = useSEO(String(query.title), {
    description: String(query.description),
    image: String(query.image01),
    keyword: 'yolo'
  });

  return {
    props: JSON.parse(
      JSON.stringify({
        seo,
        query
      })
    )
  };
};
