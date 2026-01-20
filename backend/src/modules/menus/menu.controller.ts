// src/modules/menus/menu.controller.ts
import { Request, Response } from 'express';
import * as service from './menu.service';
import { calculatePrice } from '../../utils/price.utils';
import { AppError } from '../../errors/appError';
import { HTTP_STATUS } from '../../errors/httpStatus';
import { ERROR_CODES } from '../../errors/errorCodes';
import { ERROR_MESSAGES } from '../../errors/errorMessages';

// Type for menu item
type Item = {
  id: number;
  name: string;
  base_price: number;
  is_available: boolean;
  menu_id: number;
};

/**
 * Create a new menu
 */
export const createMenu = async (req: Request, res: Response) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    throw new AppError(
      ERROR_CODES.MENU_INVALID_PAYLOAD,
      ERROR_MESSAGES.MENU_INVALID_PAYLOAD,
      HTTP_STATUS.BAD_REQUEST
    );
  }

  await service.create(req.body);

  res.status(HTTP_STATUS.CREATED).json({
    message: 'Menu created successfully',
  });
};

/**
 * Update menu
 */
export const updateMenu = async (req: Request, res: Response) => {
  const menuId = Number(req.params.id);

  if (isNaN(menuId)) {
    throw new AppError(
      ERROR_CODES.MENU_NOT_FOUND,
      ERROR_MESSAGES.MENU_NOT_FOUND,
      HTTP_STATUS.BAD_REQUEST
    );
  }

  await service.update(menuId, req.body);

  res.json({
    message: 'Menu updated successfully',
  });
};

/**
 * Delete menu
 */
export const deleteMenu = async (req: Request, res: Response) => {
  const menuId = Number(req.params.id);

  if (isNaN(menuId)) {
    throw new AppError(
      ERROR_CODES.MENU_NOT_FOUND,
      ERROR_MESSAGES.MENU_NOT_FOUND,
      HTTP_STATUS.BAD_REQUEST
    );
  }

  await service.remove(menuId);

  res.json({
    message: 'Menu deleted successfully',
  });
};

/**
 * NEW: Get all menus (OWNER)
 * Adds derived `is_active`
 */
export const getAllMenus = async (_req: Request, res: Response) => {
  const menus = await service.getAll();
  res.json(menus);
}

/**
 * Get active menu
 */
export const getActiveMenu = async (_: Request, res: Response) => {
  const menu = await service.getActive();

  if (!menu) {
    throw new AppError(
      ERROR_CODES.MENU_NOT_ACTIVE,
      ERROR_MESSAGES.MENU_NOT_ACTIVE,
      HTTP_STATUS.NOT_FOUND
    );
  }

  res.json(menu);
};

/**
 * Get customer menu with price modifier
 */
export const getCustomerMenu = async (req: Request, res: Response) => {
  //  Safe type check for query param
  const orderTypeRaw = req.query.orderType;
  const orderType =
    typeof orderTypeRaw === 'string' ? orderTypeRaw.toUpperCase() : null;

  //  order_type missing
  if (!orderType) {
    throw new AppError(
      ERROR_CODES.ORDER_TYPE_REQUIRED,
      ERROR_MESSAGES.ORDER_TYPE_REQUIRED,
      HTTP_STATUS.BAD_REQUEST
    );
  }


  const menu = await service.getActive();

  if (!menu) {
    throw new AppError(
      ERROR_CODES.MENU_NOT_ACTIVE,
      ERROR_MESSAGES.MENU_NOT_ACTIVE,
      HTTP_STATUS.NOT_FOUND
    );
  }

  const items = await service.getItemsByMenuId(menu.id);
  const priceModifier = await service.getPriceModifier(orderType);

  // invalid order type
  if (priceModifier === null) {
    throw new AppError(
      ERROR_CODES.ORDER_TYPE_INVALID,
      ERROR_MESSAGES.ORDER_TYPE_INVALID,
      HTTP_STATUS.BAD_REQUEST
    );
  }

  const response = items.map((item: Item) => ({
    id: item.id,
    name: item.name,
    price: calculatePrice(item.base_price, orderType, priceModifier),
    menu_name: menu.name,
    is_available: !!item.is_available,
  }));

  res.json(response);
};
