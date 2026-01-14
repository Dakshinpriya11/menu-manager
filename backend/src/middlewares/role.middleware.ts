import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/appError';
import { HTTP_STATUS } from '../errors/httpStatus';
import { ERROR_CODES } from '../errors/errorCodes';
import { ERROR_MESSAGES } from '../errors/errorMessages';

export const allowRoles = (...roles: string[]) => {
  const allowedRoles = roles.map(role => role.toUpperCase().trim());

  return (req: Request, _res: Response, next: NextFunction) => {
    const user = (req as any).user;

    //  User not attached by auth middleware
    if (!user || !user.role) {
      throw new AppError(
        ERROR_CODES.AUTH_TOKEN_INVALID,
        ERROR_MESSAGES.AUTH_TOKEN_INVALID,
        HTTP_STATUS.UNAUTHORIZED
      );
    }

    const userRole = String(user.role).toUpperCase().trim();

    // User role not allowed
    if (!allowedRoles.includes(userRole)) {
      throw new AppError(
        ERROR_CODES.USER_FORBIDDEN,
        ERROR_MESSAGES.USER_FORBIDDEN,
        HTTP_STATUS.FORBIDDEN
      );
    }

    next();
  };
};
