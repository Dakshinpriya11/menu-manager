import { Request, Response } from 'express';
import * as service from './orderType.service';

export const update = async (req: Request, res: Response) => {
  await service.updateModifier(Number(req.params.id), req.body.priceModifier);
  res.json({ message: 'Order type updated' });
};

export const getAll = async (_: Request, res: Response) => {
  const types = await service.getAll();
  res.json(types);
};
