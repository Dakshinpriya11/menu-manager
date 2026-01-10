import { Request, Response } from 'express';
import * as service from './auth.service';

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await service.login(email, password);
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  res.json({ id: user.id, role: user.role });
};
