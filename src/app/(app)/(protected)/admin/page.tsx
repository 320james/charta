'use client';

import useCurrentRole from '@/hooks/use-current-role';

export default function AdminPage() {
  const role = useCurrentRole();
  return (
    <>
      <div>Current role = {role}</div>
    </>
  );
}
