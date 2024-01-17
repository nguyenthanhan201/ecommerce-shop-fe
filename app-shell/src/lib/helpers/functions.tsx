export function getUniqueID(prefix: string) {
  return `${prefix}-${Math.floor(Math.random() * 1000000)}`;
}

/**
 * This function removes all event handlers from an object.
 */
export function removeEvents(input: { [key: string]: any }) {
  for (const key in input) {
    if (key.startsWith('on')) {
      delete input[key];
    }
  }

  return input;
}

// 3. Here we loop through the array's type and map it to make the expected array type
type ComponentsWithProps<TComponents extends readonly React.JSXElementConstructor<any>[]> = {
  [key in keyof TComponents]: keyof React.ComponentProps<TComponents[key]> extends never
    ? readonly [TComponents[key]]
    : readonly [TComponents[key], React.ComponentProps<TComponents[key]>];
} & { length: TComponents['length'] };

// 2. I added a generic type here to be able to get the entered argument's type
export const buildProvidersTree = <T extends readonly React.JSXElementConstructor<any>[]>(
  componentsWithProps: ComponentsWithProps<T>
) => {
  // 4. I also added this type to make the errors about `children` go away
  const initialComponent: React.FC<React.PropsWithChildren> = ({ children }) => <>{children}</>;

  return componentsWithProps.reduce((AccumulatedComponents, [Provider, props = {}]) => {
    // eslint-disable-next-line react/display-name
    return function ({ children }) {
      return (
        <AccumulatedComponents>
          <Provider {...props}>{children}</Provider>
        </AccumulatedComponents>
      );
    };
  }, initialComponent);
};

// https://dev.to/arianhamdi/react-query-v4-ssr-in-next-js-2ojj
export const withCSR = (next: any) => async (ctx: any) => {
  // check is it a client side navigation
  const isCSR = ctx.req.url?.startsWith('/_next');

  if (isCSR) {
    return {
      props: {}
    };
  }

  return next?.(ctx);
};
