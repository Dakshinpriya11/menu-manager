import { db } from '../../config/db';
import { Menu } from '../../types';

export const create = (data: Partial<Menu>) => db.query('INSERT INTO menus SET ?', data);

export const update = (id: number, data: Partial<Menu>) => db.query('UPDATE menus SET ? WHERE id=?', [data, id]);

export const remove = (id: number) => db.query('DELETE FROM menus WHERE id=?', [id]);

export const getActive = async (): Promise<Menu | null> => {
  const [rows]: any = await db.query(
    'SELECT * FROM menus WHERE CURRENT_TIME BETWEEN start_time AND end_time LIMIT 1'
  );
  return rows[0] || null;
};
