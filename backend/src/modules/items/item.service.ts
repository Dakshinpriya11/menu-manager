import { db } from '../../config/db';
import { Item } from '../../types';

export const create = (data: Partial<Item>) => db.query('INSERT INTO items SET ?', data);

export const update = (id: number, data: Partial<Item>) => db.query('UPDATE items SET ? WHERE id=?', [data, id]);

export const updateAvailability = (id: number, isAvailable: boolean) =>
  db.query('UPDATE items SET is_available=? WHERE id=?', [isAvailable, id]);

export const getActiveItems = async (): Promise<Item[]> => {
  const [rows]: any = await db.query(
    `SELECT * FROM items WHERE is_available = true AND menu_id = (SELECT id FROM menus WHERE CURRENT_TIME BETWEEN start_time AND end_time LIMIT 1)`
  );
  return rows;
};
