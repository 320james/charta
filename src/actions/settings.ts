'use server';

import * as z from 'zod';

import { db } from '@/lib/db';
import { SettingsSchema } from '@/schemas';
import { getUserById } from '@/data/users';
import { currentUser } from '@/lib/auth';

export async function settings(values: z.infer<typeof SettingsSchema>) {
  const user = await currentUser();

  if (!user) {
    return { error: 'Unauthorized' };
  }

  const dbUser = await getUserById(user.id as string);

  if (!dbUser) {
    return { error: 'Unauthorized' };
  }

  await db.user.update({
    where: {
      id: dbUser.id,
    },
    data: {
      ...values,
    },
  });

  return { success: 'Settings updated' };
}
