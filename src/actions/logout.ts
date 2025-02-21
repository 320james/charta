'use server';

import { signOut } from '@/auth';

// Server action to log out the user.
export async function logout() {
  await signOut();
}
