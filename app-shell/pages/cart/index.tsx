import { useSEO } from 'my-package';

import CartPage from '@/components/index/cart/CartPage';
import DefaultLayout from '@/layouts/default-layout/DefaultLayout';

const Page = () => {
  return <CartPage />;
};

export default Page;
Page.Layout = DefaultLayout;

export const getServerSideProps = async () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const seo = useSEO('Giỏ hàng');

  return {
    props: JSON.parse(
      JSON.stringify({
        seo
      })
    )
  };
};
