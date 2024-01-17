import { useRouter } from 'next/router';
import { Fragment, useEffect } from 'react';

import useAuth from '@/lib/hooks/useAuth';

const RequiredAuth = ({ ...props }: any): JSX.Element => {
  const router = useRouter();
  const { isLogined } = useAuth();
  const layoutProps = props ? props : {};
  const { ChildLayout, ...restProps } = layoutProps;
  const Layout = ChildLayout ? ChildLayout : Fragment;

  useEffect(() => {
    if (!isLogined) {
      router.replace('/login');
    }
  }, [isLogined]);

  return <Layout {...restProps}>{props.children}</Layout>;
};

export default RequiredAuth;
