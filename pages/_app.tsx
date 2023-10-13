// eslint-disable-next-line simple-import-sort/imports
import '../src/i18n/i18n';
import '../src/sass/index.scss';

import { ThemeProvider } from '@mui/material';
import { useNetWork } from 'my-package';
import { DefaultSeo, NextSeo } from 'next-seo';
import { Roboto } from 'next/font/google';
import { useRouter } from 'next/router';
import { Fragment, useEffect } from 'react';
import { Hydrate } from 'react-query';
import { Provider } from 'react-redux';

import { ToastProvider } from '@/lib/providers/toast-provider';
import { queryClient, QueryClientProvider } from '@/lib/react-query/queryClient';
import store from '@/lib/redux/store';
import { ColorModeContext, useMode } from '@/lib/theme/theme';

import { getCookie } from '@/lib/hooks/useCookie';
import Page404 from './404';

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['vietnamese'],
});

const defaultLocale = getCookie('i18next') || 'vi';

const MyApp = ({ Component, pageProps }: any) => {
  const Layout = Component.Layout ? Component.Layout : Fragment;
  const layoutProps = Component.LayoutProps ? Component.LayoutProps : {};
  const [theme, colorMode] = useMode();
  const { online } = useNetWork();
  const router = useRouter();

  // const channel = new BroadcastChannel("notifications");

  useEffect(() => {
    router.replace(router.asPath, router.asPath, { locale: defaultLocale });
  }, []);

  // useEffect(() => {
  //   channel.addEventListener("message", (event) => {
  //     console.log("Receive background: ", event.data);
  //   });

  //   getMessagingToken();
  // }, []);

  // useEffect(() => {
  //   if ("serviceWorker" in navigator) {
  //     window.addEventListener("load", function () {
  //       navigator.serviceWorker.register("/sw.js").then(
  //         function (registration) {
  //           console.log(
  //             "Service Worker registration successful with scope: ",
  //             registration.scope
  //           );
  //         },
  //         function (err) {
  //           console.log("Service Worker registration failed: ", err);
  //         }
  //       );
  //     });
  //   }
  // }, []);

  if (!online) return <Page404 />;
  return (
    <>
      <DefaultSeo
        additionalLinkTags={[
          {
            rel: 'shortcut icon',
            href: '/images/favicon.png',
          },
        ]}
      />
      {pageProps.seo ? <NextSeo {...pageProps.seo} /> : null}
      <ColorModeContext.Provider value={colorMode as any}>
        <ThemeProvider theme={theme as any}>
          <ToastProvider>
            <Provider store={store}>
              <QueryClientProvider client={queryClient}>
                {/* Hydrate query cache */}
                <Hydrate state={pageProps.dehydratedState}>
                  <main className={roboto.className}>
                    <Layout {...layoutProps}>
                      <Component {...pageProps} />
                    </Layout>
                  </main>
                </Hydrate>
              </QueryClientProvider>
            </Provider>
          </ToastProvider>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  );
};
export default MyApp;
