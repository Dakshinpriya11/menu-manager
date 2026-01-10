// src/modules/menus/menu.controller.ts
import { Request, Response } from 'express';
import { db } from '../../config/db';
import * as service from './menu.service';
import { calculatePrice } from '../../utils/price.utils';

// Type for item
type Item = {
  id: number;
  name: string;
  base_price: number;
  is_available: boolean;
  menu_id: number;
};

export const createMenu = async (req: Request, res: Response) => {
  await service.create(req.body);
  res.json({ message: 'Menu created' });
};

export const updateMenu = async (req: Request, res: Response) => {
  await service.update(Number(req.params.id), req.body);
  res.json({ message: 'Menu updated' });
};

export const deleteMenu = async (req: Request, res: Response) => {
  await service.remove(Number(req.params.id));
  res.json({ message: 'Menu deleted' });
};

export const getActiveMenu = async (_: Request, res: Response) => {
  const menu = await service.getActive();
  res.json(menu || null);
};

export const getCustomerMenu = async (req: Request, res: Response) => {
    const orderType = (req.query.order_type as string)?.toUpperCase();
    if (!orderType) {
      return res.status(400).json({ message: 'order_type query param is required' });
    }
  
    // Get active menu
    const menu = await service.getActive();
    if (!menu) return res.status(404).json({ message: 'No active menu found' });
  
    // Get items for this menu
    const items = await service.getItemsByMenuId(menu.id);
  
    // Get price modifier for the order type
    const [rows]: any = await db.query('SELECT price_modifier FROM order_types WHERE name=?', [orderType]);
    if (!rows || rows.length === 0) {
      return res.status(400).json({ message: 'Invalid order type' });
    }
  
    const modifier = Number(rows[0].price_modifier);
  
    // Build response with calculated prices
    const response = items.map((item: any) => ({
      id: item.id,
      name: item.name,
      price: calculatePrice(item.base_price, orderType, modifier),
      menu_name: menu.name,
      is_available: !!item.is_available,
    }));
  
    res.json(response);
  };
  