import { Request, Response, NextFunction } from 'express';
import { ZodError, ZodType } from 'zod';

export const validate = (schema: ZodType<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (err: unknown) {
      if (err instanceof ZodError) {
        return res.status(400).json({
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Invalid request data',
            details: err.issues.map(issue => ({
              field: issue.path.join('.'),
              message: issue.message,
            })),
          },
        });
      }

      next(err);
    }
  };
};
