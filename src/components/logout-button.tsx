'use client';

import { logout } from '@/actions/logout';
import { useRouter } from 'next/navigation';

interface LogoutButtonProps {
  children?: React.ReactNode;
}

export default function LogoutButton({ children }: LogoutButtonProps) {
  const router = useRouter();
  return (
    <span
      onClick={() => {
        logout();
        router.push('/');
      }}
    >
      {children || 'Log out'}
    </span>
  );
}
