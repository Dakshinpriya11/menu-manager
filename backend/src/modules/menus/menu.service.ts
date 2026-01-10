import { db } from '../../config/db';
import { Menu } from '../../types';

export const create = (data: Partial<Menu>) => db.query('INSERT INTO menus SET ?', data);

export const update = (id: number, data: Partial<Menu>) => db.query('UPDATE menus SET ? WHERE id=?', [data, id]);

export const remove = (id: number) => db.query('DELETE FROM menus WHERE id=?', [id]);

export const getActive = async () => {
    const [rows] = await db.query(
      `
      SELECT *
      FROM menus
      WHERE start_time <= CURRENT_TIME()
        AND end_time >= CURRENT_TIME()
      ORDER BY start_time
      LIMIT 1
      `
    );
  
    return (rows as any[])[0] || null;
  };
  
