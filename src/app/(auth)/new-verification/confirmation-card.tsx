'use client';
import { newVerification } from '@/actions/new-verification';
import FormError from '@/components/form-error';
import FormSuccess from '@/components/form-success';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
export default function ConfirmationCard() {
  const router = useRouter();
  const token = useSearchParams().get('token');
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const onSubmit = useCallback(async () => {
    if (success || error) {
      return;
    }

    if (!token) {
      setError('Missing token');
      return;
    }

    newVerification(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => {
        setError('Something went wrong');
      });
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <Card className="w-full max-w-sm text-center">
      <CardHeader>
        <CardTitle>Confirm email verification</CardTitle>
        <CardDescription>Confirming your verification</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        {!success && !error && (
          <>
            <div className="">
              <Loader2 className="size-6 animate-spin" />
            </div>
            <p>Please wait...</p>
          </>
        )}
        {!success && <FormError message={error} />}
        <FormSuccess message={success} />
      </CardContent>
      <CardFooter>
        <Button
          onClick={() => {
            router.push('/login');
          }}
        >
          Back to Login
        </Button>
      </CardFooter>
    </Card>
  );
}
