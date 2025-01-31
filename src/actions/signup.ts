'use server';

import { SignUpSchema } from '@/schemas';
import { z } from 'zod';

export async function signUp(values: z.infer<typeof SignUpSchema>) {
  const validatedFields = SignUpSchema.safeParse(values);

  await new Promise((resolve) => setTimeout(resolve, 1000));
  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }

  return { success: 'Email sent' };
}
