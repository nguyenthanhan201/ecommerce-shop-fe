import CatalogPage from "@/components/index/catalog/CataLogPage";
import DefaultLayout from "@/layouts/default-layout/DefaultLayout";
import { queryClient } from "@/lib/react-query/queryClient";
import { ProductServices } from "@/lib/repo/product.repo";
import { useSEO } from "my-package";

export default function Page() {
  return <CatalogPage />;
}

Page.Layout = DefaultLayout;
export const getServerSideProps = async () => {
  await queryClient.prefetchQuery(
    "productsCatalogQuery",
    async () => await ProductServices.getAll(true),
  );

  const seo = useSEO("Danh sách sản phẩm");

  return {
    props: JSON.parse(
      JSON.stringify({
        seo,
      }),
    ),
  };
};
