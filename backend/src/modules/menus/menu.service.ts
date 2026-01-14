import { db } from '../../config/db';
import { Menu } from '../../types';

export const  create = (data: Partial<Menu>) =>
  db.query('INSERT INTO menus SET ?', data);

export const update = (id: number, data: Partial<Menu>) =>
  db.query('UPDATE menus SET ? WHERE id=?', [data, id]);

export const remove = (id: number) =>
  db.query('DELETE FROM menus WHERE id=?', [id]);

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

export const getItemsByMenuId = async (menuId: number) => {
  const [rows]: any = await db.query(
    'SELECT * FROM items WHERE menu_id=? AND is_available=1',
    [menuId]
  );
  return rows;
};


export const getPriceModifier = async (
  orderType: string
): Promise<number | null> => {
  const [rows]: any = await db.query(
    'SELECT price_modifier FROM order_types WHERE name=?',
    [orderType]
  );

  if (!rows || rows.length === 0) {
    return null;
  }

  return rows[0].price_modifier;
};  