import { NextPageContext } from 'next';
import { dehydrate } from 'react-query';

import HomePage from '@/components/index/home/HomePage';
import DefaultLayout from '@/layouts/default-layout/DefaultLayout';
import { useSEO } from '@/lib/hooks/useSEO';
import { queryClient } from '@/lib/react-query/queryClient';
import { Product } from '@/lib/redux/types/product.type';
import { ProductServices } from '@/lib/repo/product.repo';

// eslint-disable-next-line react/function-component-definition
export default function Page(pageProps: PageProps<{ products: Product[] }>) {
  const { dehydratedState } = pageProps;

  return <HomePage products={dehydratedState.queries.at(0)?.state.data} />;
}
Page.Layout = DefaultLayout;

export async function getServerSideProps(_ctx: NextPageContext) {
  await queryClient.prefetchQuery('productsQuery', async () => await ProductServices.getAll());

  // const products = await ProductServices.getAll(true)
  //   .then((res) => {
  //     // console.log("👌 ~ res", res);
  //     return res;
  //   })
  //   .catch((err) => {
  //     // console.log("🚀 ~ err", err);
  //     return [];
  //   });

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const seo = useSEO('Dịch vụ đặt sản phẩm trực tuyến và giao hàng tận nơi', {
    description: 'Dịch vụ đặt sản phẩm trực tuyến và giao hàng tận nơi',
    image: '/images/Logo-2.png',
    keyword: 'yolo'
  });

  return {
    props: JSON.parse(
      JSON.stringify({
        seo,
        dehydratedState: dehydrate(queryClient)
        // pageData: {
        //   products,
        // },
      })
    ) as PageProps<{ products: Product[] }>
  };
}

// return {
//   redirect: {
//     permanent: false,
//     destination: "/login",
//   },
//   props:{},
// };

// <!-- HTML Meta Tags -->
// <title>undefined</title>
// <meta name="description" content="undefined">

// <!-- Facebook Meta Tags -->
// <meta property="og:url" content="https://ecommerce-shop-fe.vercel.app/">
// <meta property="og:type" content="website">
// <meta property="og:title" content="undefined">
// <meta property="og:description" content="undefined">
// <meta property="og:image" content="">

// <!-- Twitter Meta Tags -->
// <meta name="twitter:card" content="summary_large_image">
// <meta property="twitter:domain" content="ecommerce-shop-fe.vercel.app">
// <meta property="twitter:url" content="https://ecommerce-shop-fe.vercel.app/">
// <meta name="twitter:title" content="undefined">
// <meta name="twitter:description" content="undefined">
// <meta name="twitter:image" content="">

// <!-- Meta Tags Generated via https://www.opengraph.xyz -->
