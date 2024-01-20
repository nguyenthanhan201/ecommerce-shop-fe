import DefaultLayout from '@/layouts/default-layout/DefaultLayout';

const Error = ({ statusCode }: any) => {
  console.log('👌  statusCode:', statusCode);
  return (
    <p>
      {statusCode ? `An error ${statusCode} occurred on server` : 'An error occurred on client'}
    </p>
  );
};

Error.Layout = DefaultLayout;

Error.getInitialProps = ({ res, err }: any) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
