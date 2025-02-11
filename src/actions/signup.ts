'use server';

import { SignUpSchema } from '@/schemas';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';
import { getUserByDisplayName, getUserByEmail } from '@/data/users';

export async function signUp(values: z.infer<typeof SignUpSchema>) {
  const validatedFields = SignUpSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }

  const { email, password, displayName } = validatedFields.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  const existingEmailUser = await getUserByEmail(email);

  const existingDisplayNameUser = await getUserByDisplayName(displayName);

  if (existingEmailUser) {
    return { error: 'Email already in use' };
  }

  if (existingDisplayNameUser) {
    return { error: 'Display name already in use' };
  }

  await db.user.create({
    data: {
      email,
      password: hashedPassword,
      displayName,
    },
  });

  // TODO: Send verification token email

  return { success: 'User created' };
}
