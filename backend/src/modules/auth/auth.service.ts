import { db } from '../../config/db';
import { User } from '../../types';

export const login = async (email: string, password: string): Promise<User | null> => {
  const [rows]: any = await db.query('SELECT * FROM users WHERE email=? AND password=?', [email, password]);
  return rows[0] || null;
};
