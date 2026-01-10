import { db } from '../../config/db';
import { OrderType } from '../../types';

export const updateModifier = (id: number, modifier: number) =>
  db.query('UPDATE order_types SET price_modifier=? WHERE id=?', [modifier, id]);

export const getAll = async (): Promise<OrderType[]> => {
  const [rows]: any = await db.query('SELECT * FROM order_types');
  return rows;
};
