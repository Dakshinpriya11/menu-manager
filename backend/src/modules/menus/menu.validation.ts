// src/modules/menus/menu.validation.ts
import { z } from 'zod';

// Create Menu Validation
export const createMenuSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Menu name is required'),
    start_time: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Start time must be in HH:MM format'),
    end_time: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'End time must be in HH:MM format'),
    active: z.boolean().optional(),
  }),
});

// Update Menu Validation
export const updateMenuSchema = z.object({
  params: z.object({
    id: z.string().regex(/^\d+$/, 'Menu ID must be a valid number'),
  }),
  body: z.object({
    name: z.string().min(1).optional(),
    start_time: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Start time must be in HH:MM format').optional(),
    end_time: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'End time must be in HH:MM format').optional(),
    active: z.boolean().optional(),
  }).refine(data => Object.keys(data).length > 0, { message: 'At least one field must be provided for update' }),
});
// Delete Menu Validation
export const deleteMenuSchema = z.object({
  params: z.object({
    id: z.string().regex(/^\d+$/, 'Menu ID must be a valid number'),
  }),
});

// Get Menu Items Validation
export const getMenuItemsSchema = z.object({
  params: z.object({
    id: z.string().regex(/^\d+$/, 'Menu ID must be a valid number'),
  }),
});

// Get Price Modifier Validation
export const getPriceModifierSchema = z.object({
  query: z.object({
    orderType: z.string().min(1, 'Order type is required'),
  }),
}); 

