import { Request, Response } from 'express';
import * as service from './auth.service';
import { AppError } from '../../errors/appError';
import { ERROR_CODES } from '../../errors/errorCodes';
import { ERROR_MESSAGES } from '../../errors/errorMessages';
import { HTTP_STATUS } from '../../errors/httpStatus';

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  //  Validation error
  if (!email || !password) {
    throw new AppError(
      ERROR_CODES.AUTH_MISSING_CREDENTIALS,
      ERROR_MESSAGES.AUTH_MISSING_CREDENTIALS,
      HTTP_STATUS.BAD_REQUEST
    );
  }

  const user = await service.login(email, password);

  //  Invalid credentials
  if (!user) {
    throw new AppError(
      ERROR_CODES.AUTH_INVALID_CREDENTIALS,
      ERROR_MESSAGES.AUTH_INVALID_CREDENTIALS,
      HTTP_STATUS.UNAUTHORIZED
    );
  }

  // Generate JWT token
  const token = service.generateToken(user);

  // Success response
  res.json({
    id: user.id,
    name: user.name,
    role: user.role,
    token,
  });
};
