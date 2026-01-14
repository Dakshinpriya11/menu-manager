import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from '../errors/appError';
import { HTTP_STATUS } from '../errors/httpStatus';
import { ERROR_CODES } from '../errors/errorCodes';
import { ERROR_MESSAGES } from '../errors/errorMessages';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export const authMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  //  Token missing
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new AppError(
      ERROR_CODES.AUTH_TOKEN_MISSING,
      ERROR_MESSAGES.AUTH_TOKEN_MISSING,
      HTTP_STATUS.UNAUTHORIZED
    );
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      id: number;
      role: string;
      name: string;
    };

    // Attach user info to request
    (req as any).user = {
      id: decoded.id,
      role: decoded.role,
      name: decoded.name,
    };

    next();
  } catch (error) {
    // Invalid or expired token
    throw new AppError(
      ERROR_CODES.AUTH_TOKEN_INVALID,
      ERROR_MESSAGES.AUTH_TOKEN_INVALID,
      HTTP_STATUS.UNAUTHORIZED
    );
  }
};
