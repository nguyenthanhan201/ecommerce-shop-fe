export type LanguageTypes = keyof typeof contentHeader.mainNavs;
export type MainNavTypes = keyof (typeof contentHeader.mainNavs)[LanguageTypes];

export const contentHeader = {
  mainNavs: {
    vi: {
      home: 'Trang chủ',
      products: 'Sản phẩm'
    },
    en: {
      home: 'Home',
      products: 'Products'
    }
  }
};
