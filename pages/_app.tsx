import Loading from "@/components/shared/Loading/Loading";
import { usePageLoading } from "@/lib/hooks/usePageLoading";
import { ToastProvider } from "@/lib/providers/toast-provider";
import store from "@/lib/redux/store";
import { ColorModeContext, useMode } from "@/lib/theme/theme";
import { ThemeProvider } from "@mui/material";
import { useNetWork } from "my-package";
import { DefaultSeo, NextSeo } from "next-seo";
import { Roboto } from "next/font/google";
import { useRouter } from "next/router";
import { Fragment, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import "../src/i18n/i18n";
import "../src/sass/index.scss";
import Page404 from "./404";

type Props = {
  Component: any;
  pageProps: any;
};

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["vietnamese"],
});

// Create a client
const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: Props) {
  const { isPageLoading } = usePageLoading();
  const Layout = Component.Layout ? Component.Layout : Fragment;
  const layoutProps = Component.LayoutProps ? Component.LayoutProps : {};
  const [theme, colorMode] = useMode();
  const { online } = useNetWork();
  const router = useRouter();
  const { locale } = router;
  const { i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(locale);
  }, [locale]);

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
            rel: "shortcut icon",
            href: "/images/favicon.png",
          },
        ]}
      />
      {pageProps.seo && <NextSeo {...pageProps.seo} />}
      <ColorModeContext.Provider value={colorMode as any}>
        <ThemeProvider theme={theme as any}>
          <ToastProvider>
            <QueryClientProvider client={queryClient}>
              <Provider store={store}>
                <main className={roboto.className}>
                  <Layout {...layoutProps}>
                    {isPageLoading ? <Loading /> : <Component {...pageProps} />}
                  </Layout>
                </main>
              </Provider>
            </QueryClientProvider>
          </ToastProvider>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  );
}
export default MyApp;
