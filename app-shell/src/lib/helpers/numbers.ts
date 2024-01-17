export const numberWithCommans = (num: number) =>
  num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '₫';

export const getSalePrice = (basePrice: number | string, discount: number) => {
  return Number(basePrice) - (Number(basePrice) * discount) / 100;
};
