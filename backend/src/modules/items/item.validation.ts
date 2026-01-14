// src/modules/items/item.validation.ts
import { z } from 'zod';

/**
 * Add Item
 * POST /items
 */
export const addItemSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Item name is required'),

    base_price: z
      .number()
      .positive('Base price must be greater than 0'),

    menu_id: z
      .number()
      .int('Menu ID must be an integer')
      .positive('Menu ID must be greater than 0'),

    is_available: z.boolean().optional(),
  }),
});

/**
 * Update Item
 * PUT /items/:id
 */
export const updateItemSchema = z.object({
  params: z.object({
    id: z.string().regex(/^\d+$/, 'Item ID must be a valid number'),
  }),

  body: z
    .object({
      name: z.string().min(1).optional(),

      base_price: z
        .number()
        .positive()
        .optional(),

      menu_id: z
        .number()
        .int()
        .positive()
        .optional(),

      is_available: z.boolean().optional(),
    })
    .refine(data => Object.keys(data).length > 0, {
      message: 'At least one field must be provided for update',
    }),
});

/**
 * Update Item Availability
 * PATCH /items/:id/availability
 */
export const updateAvailabilitySchema = z.object({
  params: z.object({
    id: z.string().regex(/^\d+$/, 'Item ID must be a valid number'),
  }),

  body: z.object({
    is_available: z.boolean(),
  }),
});
