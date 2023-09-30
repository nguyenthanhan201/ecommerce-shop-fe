import { Box, Button, useTheme } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Header from 'components/index/admin/components/Header';
import { useAppDispatch } from 'lib/hooks/useAppDispatch';
import { useAppSelector } from 'lib/hooks/useAppSelector';
import { useToast } from 'lib/providers/toast-provider';
import { GET_HIDE_PRODUCTS } from 'lib/redux/types';
import { tokens } from 'lib/theme/theme';
import { useEffect } from 'react';

import AdminLayout from '@/layouts/admin-layout/AdminLayout';
import useCookie from '@/lib/hooks/useCookie';
import { AuthServices } from '@/lib/repo/auth.repo';
import { ProductServices } from '@/lib/repo/product.repo';

const Page = () => {
  // useAuth();
  const toast = useToast();
  const dispatch = useAppDispatch();
  const { set } = useCookie('token');
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const products = useAppSelector((state) => state.products.products);
  console.log('👌  products:', products);
  const errProducts: string | null = useAppSelector((state) => state.products.err);
  const auth = useAppSelector((state) => state.auth.auth);

  const columns: any = [
    {
      field: 'title',
      headerName: 'Title',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      cellClassName: 'name-column--cell',
    },
    {
      field: 'price',
      headerName: 'Price',
      type: 'number',
      headerAlign: 'center',
      align: 'center',
      cellClassName: 'name-column--cell',
    },
    {
      field: 'slug',
      headerName: 'slug',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      cellClassName: 'name-column--cell',
    },
    {
      field: 'categorySlug',
      headerName: 'categorySlug',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      cellClassName: 'name-column--cell',
    },
    {
      field: 'description',
      headerName: 'description',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      cellClassName: 'name-column--cell',
    },
    {
      field: 'size',
      headerName: 'size',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      cellClassName: 'name-column--cell',
    },
    {
      field: 'colors',
      headerName: 'colors',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      cellClassName: 'name-column--cell',
    },
    {
      field: 'actions',
      headerName: 'Hoạt động',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (row: any) => {
        return (
          <Box display='flex' justifyContent='center'>
            <Button
              variant='contained'
              style={{ backgroundColor: '#70d8bd' }}
              onClick={() => {
                handleShowProduct(row.row._id);
              }}
            >
              Hiện
            </Button>
            <Button
              variant='contained'
              style={{ backgroundColor: '#70d8bd' }}
              onClick={() => {
                ProductServices.deleteProduct(row.row._id).then(() => {
                  dispatch({ type: GET_HIDE_PRODUCTS });
                });
              }}
            >
              Xóa
            </Button>
          </Box>
        );
      },
    },
  ];

  useEffect(() => {
    dispatch({ type: GET_HIDE_PRODUCTS });
  }, [dispatch]);

  useEffect(() => {
    if (errProducts === 'TokenExpiredError' && auth) {
      toast.promise(
        'Làm mới access token thành công. Làm mới trang để tiếp tục',
        AuthServices.token(auth?.email)
          .then((res) => {
            // localStorage.setItem('token', res.accessToken);
            set(res.accessToken);
          })
          .catch((err) => {
            Promise.reject(err);
          }),
        'Làm mới access token thất bại',
      );
    }
  }, [errProducts, auth]);

  const handleShowProduct = (id: string) => {
    toast.promise(
      'Hiện sản phẩm thành công',
      ProductServices.unhideProduct(id).then(() => dispatch({ type: GET_HIDE_PRODUCTS })),
      'Hiện sản phẩm thất bại',
    );
  };

  return (
    <Box m='20px'>
      <Box
        sx={{
          justifyContent: 'space-between',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Header subtitle='Chào mừng tới quản lí sản phẩm ẩn' title='Sản phẩm ẩn' />
      </Box>
      <Box
        height='75vh'
        m='40px 0 0 0'
        sx={{
          '& .MuiDataGrid-root': {
            border: 'none',
          },
          '& .MuiDataGrid-cell': {
            borderBottom: 'none',
          },
          '& .name-column--cell': {
            color: colors.greenAccent[300],
            textAlign: 'center',
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: colors.blueAccent[700],
            borderBottom: 'none',
          },
          '& .MuiDataGrid-virtualScroller': {
            backgroundColor: colors.primary[400],
          },
          '& .MuiDataGrid-footerContainer': {
            borderTop: 'none',
            backgroundColor: colors.blueAccent[700],
          },
          '& .MuiCheckbox-root': {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid checkboxSelection columns={columns} getRowId={(row) => row._id} rows={products} />
      </Box>
    </Box>
  );
};

export default Page;
Page.Layout = AdminLayout;
