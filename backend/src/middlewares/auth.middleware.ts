import { Request, Response, NextFunction } from 'express';

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.headers['x-user-id'];
  const roleHeader = req.headers['x-user-role'];

  if (!userId || !roleHeader) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  (req as any).user = {
    id: Number(userId),
    role: String(roleHeader).toUpperCase().trim()
  };

  next();
};
