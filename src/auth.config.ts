import Credentials from 'next-auth/providers/credentials';
import type { NextAuthConfig } from 'next-auth';
import Google from 'next-auth/providers/google';
import { LoginSchema } from '@/schemas';
import { getUserByEmail } from './data/users';
import bcrypt from 'bcryptjs';
import GitHub from 'next-auth/providers/github';

// While Auth.js strictly uses standard Web APIs (and thus can run in any environment that supports them), some libraries or ORMs (Object-Relational Mapping) packages that you rely on might not be ready yet. In this case, you can split the auth configuration into multiple files.
// Auth.js supports two session strategies. When you are using an adapter, it will default to the database strategy. Unless your database and its adapter is compatible with the Edge runtime/infrastructure, you will not be able to use the "database" session strategy.
// So for example, if you are using an adapter that relies on an ORM/library that is not yet compatible with Edge runtime(s) below is an example where we force the jwt strategy and split up the configuration so the library doesn’t attempt to access the database in edge environments, like in the middleware.

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);
        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUserByEmail(email);

          // Social providers do not have passwords
          if (!user || !user.password) return null;

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) return user;
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
