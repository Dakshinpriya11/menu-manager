import { Request, Response, NextFunction } from 'express';

export const allowRoles = (...roles: string[]) => {
  const allowedRoles = roles.map(r => r.toUpperCase().trim());

  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;

    if (!user || !user.role) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const userRole = String(user.role).toUpperCase().trim();

    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    next();
  };
};
