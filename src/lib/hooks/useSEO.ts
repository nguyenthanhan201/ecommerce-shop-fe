export type SEO = {
  titleTemplate: string;
  defaultTitle: string;
  title: string;
  description?: string;
  image?: string;
  openGraph: {
    type: string;
    locale: string;
    site_name: string;
    title: string;
    description?: string;
    images: {
      url: string;
      alt: string;
    }[];
  };
  additionalMetaTags: {
    property: string;
    content: string;
  }[];
};

export function useSEO(
  title: string,
  data: {
    description?: string;
    image?: string;
    keyword?: string;
    shopName?: string;
  } = {}
): SEO {
  return {
    titleTemplate: data.shopName ? `%s | ${data.shopName}` : `%s`,
    defaultTitle: `${data.shopName}`,
    title,
    description: data.description,
    image: data.image,
    openGraph: {
      type: 'website',
      locale: 'vi_VN',
      site_name: 'Shop',
      title,
      description: data.description,
      images: [
        {
          url: data.image || '',
          alt: data.shopName || ''
        }
      ]
    },
    additionalMetaTags: [
      {
        property: 'keywords',
        content: data.keyword || ''
      }
    ]
  };
}
