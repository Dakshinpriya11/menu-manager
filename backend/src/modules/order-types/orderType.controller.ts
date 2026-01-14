// src/modules/orderType/orderType.controller.ts
import { Request, Response } from 'express';
import * as service from './orderType.service';
import { AppError } from '../../errors/appError';
import { HTTP_STATUS } from '../../errors/httpStatus';
import { ERROR_CODES } from '../../errors/errorCodes';
import { ERROR_MESSAGES } from '../../errors/errorMessages';

interface OrderTypeUpdate {
  id: number;
  price_modifier: number;
}

// Update multiple order types
 
export const update = async (req: Request, res: Response) => {
  const updates: OrderTypeUpdate[] = req.body;

  // Body is not an array or empty
  if (!Array.isArray(updates) || updates.length === 0) {
    throw new AppError(
      ERROR_CODES.VALIDATION_ERROR,
      ERROR_MESSAGES.VALIDATION_ERROR, // "Request validation failed due to invalid data."
      HTTP_STATUS.BAD_REQUEST
    );
  }

  for (const item of updates) {
    const id = Number(item.id);
    const modifier = Number(item.price_modifier);

    // id or price_modifier is invalid
    if (isNaN(id) || isNaN(modifier)) {
      throw new AppError(
        ERROR_CODES.VALIDATION_ERROR,
        'Order type ID and price modifier must be numbers.', // new message, you can add to ERROR_MESSAGES if you want
        HTTP_STATUS.BAD_REQUEST
      );
    }

    await service.updateModifier(id, modifier);
  }

  res.json({ message: 'Order types updated successfully' });
};

/**
 * Get all order types
 */
export const getAll = async (_: Request, res: Response) => {
  const types = await service.getAll();
  res.json(types);
};
