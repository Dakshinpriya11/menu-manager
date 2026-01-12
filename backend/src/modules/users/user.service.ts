import { db } from '../../config/db';
import bcrypt from 'bcrypt';

export const createStaff = async ({ name, email, password }: { name: string; email: string; password: string }) => {
  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  const [result]: any = await db.query(
    'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
    [name, email, hashedPassword, 'STAFF']
  );

  return { id: result.insertId, name, email, role: 'STAFF' };
};
