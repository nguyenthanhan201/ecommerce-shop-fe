import { Box, Button, useTheme } from '@mui/material';
import { DataGrid, GridColumns } from '@mui/x-data-grid';
import Header from 'components/index/admin/components/Header';
import Modal from 'components/shared/Modal/Modal';
import { useAppDispatch } from 'lib/hooks/useAppDispatch';
import { useToast } from 'lib/providers/toast-provider';
import { GET_PRODUCTS } from 'lib/redux/types';
import { tokens } from 'lib/theme/theme';
import { NextPageContext } from 'next';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { dehydrate } from 'react-query';

import AdminLayout from '@/layouts/admin-layout/AdminLayout';
import { useSEO } from '@/lib/hooks/useSEO';
import { queryClient } from '@/lib/react-query/queryClient';
import { Product } from '@/lib/redux/types/product.type';
import { ProductServices } from '@/lib/repo/product.repo';

const ModalAddProduct = dynamic(import('@/components/index/admin/products/ModalAddProduct'));

const Page = (pageProps: PageProps<{ products: Product[] }>) => {
  const { dehydratedState } = pageProps;
  const toast = useToast();
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const products = dehydratedState.queries.at(0)?.state.data;
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(undefined);

  const columns: GridColumns<Product> = [
    {
      field: 'title',
      headerName: 'Title',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      cellClassName: 'name-column--cell'
    },
    {
      field: 'price',
      headerName: 'Price',
      type: 'number',
      headerAlign: 'center',
      align: 'center',
      cellClassName: 'name-column--cell'
    },
    {
      field: 'slug',
      headerName: 'slug',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      cellClassName: 'name-column--cell'
    },
    {
      field: 'categorySlug',
      headerName: 'categorySlug',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      cellClassName: 'name-column--cell'
    },
    {
      field: 'description',
      headerName: 'description',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      cellClassName: 'name-column--cell'
    },
    {
      field: 'size',
      headerName: 'size',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      cellClassName: 'name-column--cell'
    },
    {
      field: 'colors',
      headerName: 'colors',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      cellClassName: 'name-column--cell'
    },
    {
      field: 'actions',
      headerName: 'Hoạt động',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (row: any) => {
        // console.log("👌 ~ row", row.row);
        return (
          <Box display='flex' justifyContent='center'>
            <Button
              onClick={() => {
                setSelectedProduct(row.row);
                setOpen(!open);
              }}
              style={{ backgroundColor: '#70d8bd' }}
              variant='contained'
            >
              sửa
            </Button>
            <Button
              onClick={() => {
                hideProduct(row.row._id);
              }}
              style={{ backgroundColor: '#70d8bd' }}
              variant='contained'
            >
              Ẩn
            </Button>
          </Box>
        );
      }
    }
  ];

  const hideProduct = (id: string) => {
    toast.promise(
      'Ẩn sản phẩm thành công',
      ProductServices.hideProduct(id).then(() => dispatch({ type: GET_PRODUCTS })),
      'Ẩn sản phẩm thất bại'
    );
  };

  return (
    <>
      <Box m='20px'>
        <Box
          sx={{
            justifyContent: 'space-between',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Header subtitle='Chào mừng tới quản lí sản phẩm' title='Sản phẩm' />
          <Box>
            <Button
              onClick={() => {
                setOpen(!open);
              }}
              sx={{
                backgroundColor: colors.blueAccent[700],
                color: colors.grey[100],
                fontSize: '14px',
                fontWeight: 'bold',
                padding: '10px 20px'
              }}
            >
              Thêm sản phẩm
            </Button>
          </Box>
        </Box>
        <Box
          height='75vh'
          m='40px 0 0 0'
          sx={{
            '& .MuiDataGrid-root': {
              border: 'none'
            },
            '& .MuiDataGrid-cell': {
              borderBottom: 'none'
            },
            '& .name-column--cell': {
              color: colors.greenAccent[300],
              textAlign: 'center'
            },
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: colors.blueAccent[700],
              borderBottom: 'none'
            },
            '& .MuiDataGrid-virtualScroller': {
              backgroundColor: colors.primary[400]
            },
            '& .MuiDataGrid-footerContainer': {
              borderTop: 'none',
              backgroundColor: colors.blueAccent[700]
            },
            '& .MuiCheckbox-root': {
              color: `${colors.greenAccent[200]} !important`
            }
          }}
        >
          <DataGrid
            checkboxSelection
            columns={columns}
            getRowId={(row) => row._id}
            rows={products}
          />
        </Box>
      </Box>
      <Modal
        handleClose={() => {
          setOpen(!open);
          setSelectedProduct(undefined);
        }}
        open={open}
      >
        {open ? <ModalAddProduct product={selectedProduct} /> : null}
      </Modal>
    </>
  );
};

export default Page;
Page.Layout = AdminLayout;

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
