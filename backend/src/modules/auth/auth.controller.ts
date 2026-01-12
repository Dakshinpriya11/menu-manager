import { Request, Response } from 'express';
import * as service from './auth.service';

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await service.login(email, password);

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // ✅ Generate JWT token
    const token = service.generateToken(user);

    // ✅ Return full user info + token
    res.json({
      id: user.id,
      name: user.name,
      role: user.role,
      token, // this is the JWT to use in headers for protected routes
    });
  } catch (err: any) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
