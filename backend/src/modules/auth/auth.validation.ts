// src/modules/auth/auth.validation.ts
import { z } from 'zod';

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email({ message: 'Invalid email format' }),
    password: z.string().min(6, 'Password must be at least 6 characters'),
  }),
});
