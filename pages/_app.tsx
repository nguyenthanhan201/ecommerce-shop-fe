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

import { queryClient, QueryClientProvider } from '@/lib/react-query/queryClient';
import store from '@/lib/redux/store';
import { ColorModeContext, useMode } from '@/lib/theme/theme';

import { buildProvidersTree } from '@/lib/helpers';
import { isEmpty } from '@/lib/helpers/assertion';
import { getCookie } from '@/lib/hooks/useCookie';
import { ToastProvider } from '@/lib/providers/toast-provider';
import { getMessagingToken } from 'config/firebase.config';
import Page404 from './[...404]';

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['vietnamese']
});

const defaultLocale = isEmpty(getCookie('i18next')) ? 'vi' : getCookie('i18next');

const MyApp = ({ Component, pageProps }: any) => {
  const Layout = Component.Layout ? Component.Layout : Fragment;
  const layoutProps = Component.LayoutProps ? Component.LayoutProps : {};
  const [theme, colorMode] = useMode();
  const { online } = useNetWork();
  const router = useRouter();

  useEffect(() => {
    router.replace(router.asPath, router.asPath, { locale: defaultLocale });
  }, []);

  const channel = new BroadcastChannel('notifications');

  useEffect(() => {
    getMessagingToken();
  }, []);

  useEffect(() => {
    channel.addEventListener('message', (event) => {
      console.log('Receive background: ', event.data);
    });

    // onMessage(messaging, (payload) => {
    //   console.log('Message received. ', payload);
    //   // ...
    // });
  }, []);

  // useEffect(() => {
  //   window.addEventListener('load', () => {
  //     if ('serviceWorker' in navigator) {
  //       navigator.serviceWorker
  //         .register('/sw.js')
  //         .then((registration) => console.log('scope is: ', registration.scope));
  //     }
  //   });
  // }, []);

  // useEffect(() => {
  //   if ('serviceWorker' in navigator) {
  //     window.addEventListener('load', function () {
  //       navigator.serviceWorker.register('../firebase-messaging-sw.js').then(
  //         function (registration) {
  //           console.log('Service Worker registration successful with scope: ', registration.scope);
  //         },
  //         function (err) {
  //           console.log('Service Worker registration failed: ', err);
  //         },
  //       );
  //     });
  //   }
  // }, []);

  const ProvidersTree = buildProvidersTree([
    [ColorModeContext.Provider, { value: colorMode }],
    [ThemeProvider, { theme: theme }],
    [Provider, { store }],
    [QueryClientProvider, { client: queryClient }],
    [Hydrate, { state: pageProps.dehydratedState }],
    [ToastProvider] as any
  ] as const);

  if (!online) return <Page404 />;
  return (
    <>
      <DefaultSeo
        additionalLinkTags={[
          {
            rel: 'shortcut icon',
            href: '/images/favicon.png'
          }
        ]}
      />
      {pageProps.seo ? <NextSeo {...pageProps.seo} /> : null}
      <ProvidersTree>
        <main className={roboto.className}>
          <Layout {...layoutProps}>
            <Component {...pageProps} />
          </Layout>
        </main>
      </ProvidersTree>
    </>
  );
};
export default MyApp;

//  <ColorModeContext.Provider value={colorMode as any}>
//    <ThemeProvider theme={theme as any}>
//      <ToastProvider>
//        <Provider store={store}>
//          <QueryClientProvider client={queryClient}>
//            {/* Hydrate query cache */}
//            <Hydrate state={pageProps.dehydratedState}>
//              <main className={roboto.className}>
//                <Layout {...layoutProps}>
//                  <Component {...pageProps} />
//                </Layout>
//              </main>
//            </Hydrate>
//          </QueryClientProvider>
//        </Provider>
//      </ToastProvider>
//    </ThemeProvider>
//  </ColorModeContext.Provider>;
