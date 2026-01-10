import { Request, Response } from 'express';
import * as service from './orderType.service';

interface OrderTypeUpdate {
  id: number;
  price_modifier: number;
}

export const update = async (req: Request, res: Response) => {
  const updates: OrderTypeUpdate[] = req.body;

  if (!Array.isArray(updates) || updates.length === 0) {
    return res.status(400).json({ message: 'Invalid body, expected array of {id, price_modifier}' });
  }

  for (const item of updates) {
    const id = Number(item.id);
    const modifier = Number(item.price_modifier);

    if (isNaN(id) || isNaN(modifier)) {
      return res.status(400).json({ message: 'id and price_modifier must be numbers' });
    }

    await service.updateModifier(id, modifier);
  }

  res.json({ message: 'Order types updated successfully' });
};

export const getAll = async (_: Request, res: Response) => {
  const types = await service.getAll();
  res.json(types);
};
