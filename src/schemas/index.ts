import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.string().email({
    message: 'Email is required',
  }),
  password: z.string(),
  code: z.string().optional(),
});

export const SignUpSchema = z
  .object({
    email: z.string().email({
      message: 'Email is required',
    }),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long' })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        {
          message:
            'Password must contain at least: 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character',
        }
      ),
    confirmPassword: z.string(),
    displayName: z.string().regex(/^[a-zA-Z0-9_]+$/, {
      message:
        'Display name can only contain letters, numbers, and underscores',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const ResetSchema = z.object({
  email: z.string().email({
    message: 'Email is required',
  }),
});

export const NewPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long' })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        {
          message:
            'Password must contain at least: 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character',
        }
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const SettingsSchema = z.object({
  name: z.optional(z.string()),
});
