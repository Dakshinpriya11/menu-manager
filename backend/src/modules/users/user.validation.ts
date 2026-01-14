// src/modules/users/user.validation.ts
import { z } from 'zod';

// Add Staff Validation
export const addStaffSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email({ message: 'Invalid email format' }),
    password: z.string().min(6, 'Password must be at least 6 characters'),
  }),
});
