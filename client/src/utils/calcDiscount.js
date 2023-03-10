export const calcDiscount = (price, discount) => {
  return Math.round(price - (price * discount) / 100);
};
