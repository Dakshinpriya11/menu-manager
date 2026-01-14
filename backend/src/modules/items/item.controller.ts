import { Request, Response } from 'express';
import * as service from './item.service';
import { AppError } from '../../errors/appError';
import { HTTP_STATUS } from '../../errors/httpStatus';
import { ERROR_CODES } from '../../errors/errorCodes';
import { ERROR_MESSAGES } from '../../errors/errorMessages';

/**
 * Add a new menu item
 * Mandatory: name, base_price, menu_id
 * Optional: is_available (default true)
 */
export const addItem = async (req: Request, res: Response) => {
  const { name, base_price, menu_id, is_available } = req.body;

  // Mandatory fields missing
  if (!name || base_price === undefined || menu_id === undefined) {
    throw new AppError(
      ERROR_CODES.INVALID_PAYLOAD,      
      ERROR_MESSAGES.ITEM_INVALID_PAYLOAD, 
      HTTP_STATUS.BAD_REQUEST           
    );
  }

  // Prepare item object with default availability
  const newItem = {
    name,
    base_price,
    menu_id,
    is_available: typeof is_available === 'boolean' ? is_available : true
  };

  await service.create(newItem);

  res.status(HTTP_STATUS.CREATED).json({
    message: 'Item added successfully',
    item: newItem
  });
};

/**
 * Update item details
 * Validates item ID is numeric
 */
export const updateItem = async (req: Request, res: Response) => {
  const itemId = Number(req.params.id);

  // Invalid item ID
  if (isNaN(itemId)) {
    throw new AppError(
      ERROR_CODES.INVALID_ID,          
      ERROR_MESSAGES.ITEM_NOT_FOUND,   
      HTTP_STATUS.BAD_REQUEST          
    );
  }

  await service.update(itemId, req.body);

  res.json({
    message: 'Item updated successfully',
  });
};

/**
 * Update item availability
 * Validates item ID and ensures boolean availability
 */
export const updateAvailability = async (req: Request, res: Response) => {
  const itemId = Number(req.params.id);
  const isAvailable = req.body.is_available ?? req.body.is_availability;

  // Invalid item ID
  if (isNaN(itemId)) {
    throw new AppError(
      ERROR_CODES.INVALID_ID,          
      ERROR_MESSAGES.ITEM_NOT_FOUND,   
      HTTP_STATUS.BAD_REQUEST          
    );
  }

  // Availability must be boolean
  if (typeof isAvailable !== 'boolean') {
    throw new AppError(
      ERROR_CODES.INVALID_AVAILABILITY,      
      ERROR_MESSAGES.ITEM_INVALID_AVAILABILITY, 
      HTTP_STATUS.BAD_REQUEST               
    );
  }

  await service.updateAvailability(itemId, isAvailable);

  res.json({
    message: 'Item availability updated successfully',
  });
};

/**
 * Get all active items
 */
export const getActiveItems = async (_: Request, res: Response) => {
  const items = await service.getActiveItems();
  res.json(items);
};
