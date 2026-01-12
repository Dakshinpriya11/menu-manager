import { Request, Response } from 'express';
import * as service from './user.service';

export const addStaff = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' });
    }

    const user = await service.createStaff({ name, email, password });
    res.status(201).json({ id: user.id, name: user.name, email: user.email, role: user.role });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
