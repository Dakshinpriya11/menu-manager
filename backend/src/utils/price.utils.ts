export const calculateFinalPrice = (price: number, modifier: number) =>
    price + (price * modifier) / 100;
  