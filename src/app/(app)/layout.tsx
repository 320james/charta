import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { SessionProvider } from 'next-auth/react';
import { auth } from '@/auth';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    // TODO: Determine where to put session provider
    <SessionProvider session={session}>
      <div className="border-grid flex flex-1 flex-col">
        <SiteHeader />
        <div>{children}</div>
        <SiteFooter />
      </div>
    </SessionProvider>
  );
}
