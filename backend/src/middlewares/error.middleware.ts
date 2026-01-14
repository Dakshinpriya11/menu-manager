import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/appError';
import { HTTP_STATUS } from '../errors/httpStatus';
import { ERROR_CODES } from '../errors/errorCodes';
import { ERROR_MESSAGES } from '../errors/errorMessages';

export const errorMiddleware = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  // Known (AppError)
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      error: {
        code: err.code,
        message: err.message,
      },
    });
  }

  // Unknown / programming error
  console.error('Unexpected Error:', err);

  return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    success: false,
    error: {
      code: ERROR_CODES.INTERNAL_ERROR,
      message: ERROR_MESSAGES.INTERNAL_ERROR,
    },
  });
};
