'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';

import { Webhook } from 'lucide-react';
import LogoutButton from './logout-button';
import UserButton from './user-button';
import { useCurrentUser } from '@/hooks/use-current-user';
import { Button } from './ui/button';

export function MainNav() {
  const pathname = usePathname();
  const user = useCurrentUser();

  return (
    <>
      <div className="mr-4 hidden md:flex">
        <Link href="/" className="mr-4 flex items-center gap-2 lg:mr-6">
          <Webhook className="size-6" />
          <span className="hidden font-bold lg:inline-block">
            {siteConfig.name}
          </span>
        </Link>
        <nav className="flex items-center gap-4 text-sm xl:gap-6">
          <Link
            href="/settings"
            className={cn(
              'transition-colors hover:text-foreground/80',
              pathname === '/settings'
                ? 'text-foreground'
                : 'text-foreground/80'
            )}
          >
            Settings
          </Link>

          <Link
            href="/admin"
            className={cn(
              'transition-colors hover:text-foreground/80',
              pathname?.startsWith('/colors')
                ? 'text-foreground'
                : 'text-foreground/80'
            )}
          >
            Admin Dashboard
          </Link>
        </nav>
      </div>
      <div className="flex flex-1 items-center justify-between gap-2 md:justify-end">
        <div className="flex items-center gap-5">
          {user ? (
            <>
              <LogoutButton>
                <Button>Log Out</Button>
              </LogoutButton>
              <UserButton />
            </>
          ) : null}
        </div>
      </div>
    </>
  );
}
