import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="border-grid flex flex-1 flex-col">
      <SiteHeader />
      <div>{children}</div>;
      <SiteFooter />
    </div>
  );
}
