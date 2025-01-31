'use client';

import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

interface LoginButtonProps {
  children: React.ReactNode;
  mode?: 'toast' | 'redirect';
  asChiid?: boolean;
}

export default function LoginButton({
  children,
  mode = 'toast',
  asChiid = false,
}: LoginButtonProps) {
  const { toast } = useToast();
  const router = useRouter();

  const onClick = () => {
    if (mode === 'toast') {
    } else {
      router.push('/auth/login');
    }
  };

  return <span onClick={onClick}>{children}</span>;
}
