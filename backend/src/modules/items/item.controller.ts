import { Request, Response } from 'express';
import * as service from './item.service';

export const addItem = async (req: Request, res: Response) => {
  await service.create(req.body);
  res.json({ message: 'Item added' });
};

export const updateItem = async (req: Request, res: Response) => {
  await service.update(Number(req.params.id), req.body);
  res.json({ message: 'Item updated' });
};

export const updateAvailability = async (req: Request, res: Response) => {
  await service.updateAvailability(Number(req.params.id), req.body.isAvailable);
  res.json({ message: 'Availability updated' });
};

export const getActiveItems = async (_: Request, res: Response) => {
  const items = await service.getActiveItems();
  res.json(items);
};
