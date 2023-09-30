import LoginPage from '@/components/index/login/LoginPage';
import DefaultLayout from '@/layouts/default-layout/DefaultLayout';
import RetrictedAuth from '@/layouts/retricted-auth/RetrictedAuth';

const Page = () => {
  return <LoginPage />;
};

export default Page;
Page.Layout = RetrictedAuth;
Page.LayoutProps = {
  ChildLayout: DefaultLayout,
};
