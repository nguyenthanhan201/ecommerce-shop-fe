import { ComponentPropsWithRef } from 'react';

export type InfinityListProps = ComponentPropsWithRef<'div'> & {
  dataLength: number;
  hasMore: boolean;
  loader: JSX.Element;
  // eslint-disable-next-line @typescript-eslint/ban-types
  next: Function;
};
