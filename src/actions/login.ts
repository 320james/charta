'use server';

import { LoginSchema } from '@/schemas';
import { z } from 'zod';

export async function login(values: z.infer<typeof LoginSchema>) {
  const validatedFields = LoginSchema.safeParse(values);

  await new Promise((resolve) => setTimeout(resolve, 1000));
  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }

  return { success: 'Email sent' };
}
