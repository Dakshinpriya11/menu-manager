// src/modules/users/user.controller.ts
import { Request, Response } from 'express';
import * as service from './user.service';
import { AppError } from '../../errors/appError';
import { HTTP_STATUS } from '../../errors/httpStatus';
import { ERROR_CODES } from '../../errors/errorCodes';
import { ERROR_MESSAGES } from '../../errors/errorMessages';

/**
 * Add staff user
 */
export const addStaff = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  //  Missing required fields
  if (!name || !email || !password) {
    throw new AppError(
      ERROR_CODES.AUTH_MISSING_CREDENTIALS,
      ERROR_MESSAGES.AUTH_MISSING_CREDENTIALS,
      HTTP_STATUS.BAD_REQUEST
    );
  }

  const user = await service.createStaff({
    name,
    email,
    password,
  });

  res.status(HTTP_STATUS.CREATED).json({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  });
};
