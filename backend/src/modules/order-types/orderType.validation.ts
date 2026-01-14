// src/modules/order-types/orderType.validation.ts
import { z } from 'zod';

export const updateOrderTypeSchema = z.object({
  body: z.array(
    z.object({
      id: z.number().int().positive(),
      name: z.string().min(1, 'Order type name is required'),
      price_modifier: z.number().nonnegative(),
    })
  ).nonempty('At least one order type must be provided'),
});
