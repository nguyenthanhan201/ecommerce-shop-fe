import Image from 'next/legacy/image';
import { ComponentPropsWithoutRef } from 'react';

declare const VALID_LAYOUT_VALUES: readonly ['fill', 'fixed', 'intrinsic', 'responsive', undefined];
declare type LayoutValue = (typeof VALID_LAYOUT_VALUES)[number];
// declare type ImgElementStyle = NonNullable<
//   JSX.IntrinsicElements["img"]["style"]
// >;
export interface ImgProps extends ComponentPropsWithoutRef<'img'> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  contain?: boolean;
  avatar?: boolean;
  rounded?: boolean;
  ratio169?: boolean;
  percent?: number;
  once?: boolean;
  checkerboard?: boolean;
  showImageOnClick?: boolean;
  imageClassName?: string;
  default?: string;
  compress?: number;
  border?: boolean;
  lazyload?: boolean;
  overflow?: boolean;
  noImage?: boolean;
  scrollContainer?: any;
  objectPosition?: string;
  layout?: LayoutValue;
  unoptimized?: boolean;
  hasNotplaceholder?: boolean;
  priority?: boolean;
}

const myLoader = ({ src, width, quality }: any) => {
  return `${src}?w=${width}&q=${quality}`;
};

const Img = ({
  id,
  src,
  alt,
  width,
  height,
  className,
  objectPosition,
  layout,
  sizes,
  unoptimized,
  compress,
  hasNotplaceholder,
  priority,
  loading,
  onClick,
  ...props
}: ImgProps) => {
  return (
    <Image
      {...props}
      alt={alt}
      blurDataURL='/images/favicon.png'
      className={className}
      height={height}
      id={id}
      layout={layout ? layout : undefined}
      loader={myLoader}
      loading={loading || 'lazy'}
      objectPosition={objectPosition}
      onClick={onClick}
      placeholder={hasNotplaceholder ? undefined : 'blur'}
      priority={priority}
      quality={70}
      sizes={sizes || undefined}
      src={
        compress ? `https://images.weserv.nl/?url=${src}${compress ? `&w=${compress}` : ''}` : src
      }
      style={props.style}
      unoptimized={unoptimized || false}
      width={width}
    />
  );
};

export default Img;
