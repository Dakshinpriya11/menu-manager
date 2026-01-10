// src/utils/price.utils.ts
export const calculatePrice = (basePrice: number | string, orderType: string, modifier: number | string): number => {
    const priceNum = Number(basePrice);
    const mod = Number(modifier);
    return Number((priceNum + (priceNum * mod) / 100).toFixed(2));
  };
  