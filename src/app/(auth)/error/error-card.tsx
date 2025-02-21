'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { TriangleAlert } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ErrorCard() {
  const router = useRouter();
  return (
    <Card className="w-full max-w-sm text-center">
      <CardHeader>
        <CardTitle>Oops... Something went wrong</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        <div className="">
          <TriangleAlert className="size-6" />
        </div>
        <p>Card Content</p>
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
