import { Request, Response } from 'express';
import * as service from './menu.service';

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

export const getActiveMenu = async (req: Request, res: Response) => {
    const menu = await service.getActive();
  
    if (!menu) {
      return res.json(null);
    }
  
    res.json(menu);
  };
