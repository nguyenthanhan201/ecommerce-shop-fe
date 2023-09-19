import Image from "next/image";
import { ComponentPropsWithoutRef } from "react";

declare const VALID_LAYOUT_VALUES: readonly ["fill", "fixed", "intrinsic", "responsive", undefined];
declare type LayoutValue = (typeof VALID_LAYOUT_VALUES)[number];
// declare type ImgElementStyle = NonNullable<
//   JSX.IntrinsicElements["img"]["style"]
// >;
export interface ImgProps extends ComponentPropsWithoutRef<"img"> {
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
      id={id}
      objectPosition={objectPosition}
      layout={layout ? layout : null}
      loading={loading || "lazy"}
      placeholder={hasNotplaceholder ? undefined : "blur"}
      blurDataURL='/images/favicon.png'
      loader={myLoader}
      src={
        compress ? `https://images.weserv.nl/?url=${src}${compress ? `&w=${compress}` : ""}` : src
      }
      alt={alt}
      width={width}
      height={height}
      className={className}
      sizes={sizes || undefined}
      unoptimized={unoptimized || false}
      quality={70}
      priority={priority}
      onClick={onClick}
      style={props.style}
    />
  );
};

export default Img;
