import { db } from '../../config/db';
import { User } from '../../types';
import bcrypt from 'bcrypt';
import jwt, { SignOptions }  from 'jsonwebtoken';

const JWT_SECRET: string  = process.env.JWT_SECRET || 'your_jwt_secret';
const JWT_EXPIRES_IN: SignOptions['expiresIn'] =
  (process.env.JWT_EXPIRES_IN as SignOptions['expiresIn']) || '1d';

export const login = async (
  email: string,
  password: string
): Promise<User | null> => {
  // 1️⃣ fetch user by email
  const [rows]: any = await db.query(
    'SELECT * FROM users WHERE email = ?',
    [email]
  );

  const user: User = rows[0];
  if (!user) return null;

  // 2️⃣ compare password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return null;

  return user;
};

export const generateToken = (user: User): string => {
  return jwt.sign(
    {
      id: user.id,
      role: user.role,
      name: user.name,
    },
    JWT_SECRET,
    {
      expiresIn: JWT_EXPIRES_IN, 
    }
  );
};
