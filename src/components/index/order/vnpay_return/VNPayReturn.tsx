import Button from 'components/shared/Button';
import { useAppDispatch } from 'lib/hooks/useAppDispatch';
import { useAppSelector } from 'lib/hooks/useAppSelector';
import { useToast } from 'lib/providers/toast-provider';
import { GET_CART_ITEMS } from 'lib/redux/types';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { OrderServices } from '@/lib/repo/order.repo';

const VNPayReturnPage = () => {
  const toast = useToast();
  const auth = useAppSelector((state) => state.auth.auth);
  const [responseCode, setResponseCode] = useState<string>('');
  const dispatch = useAppDispatch();

  useEffect(() => {
    const query = window.location.search;
    const tempParams = JSON.parse(
      '{"' + query.replace(/&/g, '","').replace(/=/g, '":"') + '"}',
      function (key, value) {
        return key === '' ? value : decodeURIComponent(value);
      },
    );
    setResponseCode(tempParams.vnp_ResponseCode);
  }, []);

  useEffect(() => {
    if (!auth || responseCode !== '00') return;
    toast.promise(
      'Xử lí đơn hàng thành công',
      OrderServices.addOrder(auth._id)
        .then((res) => {
          console.log('👌 ~ res', res);
          dispatch({ type: GET_CART_ITEMS, payload: auth._id });
        })
        .catch((err) => {
          console.log('🚀 ~ file: VNPayReturn.tsx ~ line 43 ~ err', err);
        }),
      'Xử lí đơn hàng thất bại',
    );
  }, [auth?._id]);

  return (
    <div className='vnpay-return'>
      {responseCode === '00' ? (
        <p className='vnpay-return__text--success'>Thanh toán thành công</p>
      ) : (
        <p className='vnpay-return__text--error'>Thanh toán thất bại</p>
      )}
      <Button>
        <Link href='/'>Quay lại trang chủ</Link>
      </Button>
    </div>
  );
};

export default VNPayReturnPage;
