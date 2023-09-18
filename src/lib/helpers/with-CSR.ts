// https://dev.to/arianhamdi/react-query-v4-ssr-in-next-js-2ojj
export const withCSR = (next: any) => async (ctx: any) => {
  // check is it a client side navigation
  const isCSR = ctx.req.url?.startsWith("/_next");

  if (isCSR) {
    return {
      props: {},
    };
  }

  return next?.(ctx);
};
