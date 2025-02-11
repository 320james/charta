'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { SignUpSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState, useTransition } from 'react';
import { signUp } from '@/actions/signup';
import FormError from '@/components/form-error';
import FormSuccess from '@/components/form-success';
import { Icons } from '@/components/icons';
import { signIn } from 'next-auth/react';
import { DEFAULT_LOGIN_REDIRECT } from '@/route';

export function SignUpForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      displayName: '',
    },
  });

  const onSubmit = (values: z.infer<typeof SignUpSchema>) => {
    setError('');
    setSuccess('');

    startTransition(() => {
      signUp(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
  };

  const onSocialSignUp = (provider: 'github' | 'google') => {
    setError('');
    setSuccess('');

    startTransition(() => {
      signIn(provider, {
        callbackUrl: DEFAULT_LOGIN_REDIRECT,
      });
    });
  };
  return (
    <div className={'flex flex-col gap-6'}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome</CardTitle>
          <CardDescription>Sign Up with your Email</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <div className={'flex flex-col gap-6'}>
              <div className="grid gap-6">
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="grid gap-6"
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending}
                            type="email"
                            placeholder="m@example.com"
                            required
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="displayName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Display Name</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending}
                            type="text"
                            placeholder="funnyguy247"
                            required
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending}
                            type="password"
                            placeholder="*********"
                            required
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>

                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending}
                            type="password"
                            placeholder="*********"
                            required
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormError message={error} />
                  <FormSuccess message={success} />

                  <Button type="submit" className="w-full" disabled={isPending}>
                    {isPending ?? (
                      <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Sign Up
                  </Button>
                </form>
                <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                  <span className="relative z-10 bg-background px-2 text-muted-foreground">
                    Or sign up with
                  </span>
                </div>

                <div className="flex flex-col gap-4">
                  {/* <Button variant="outline" className="w-full">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                      fill="currentColor"
                    />
                  </svg>
                  Sign Up with Apple
                </Button> */}
                  <Button
                    variant="outline"
                    className="w-full"
                    disabled={isPending}
                    onClick={() => onSocialSignUp('google')}
                  >
                    {isPending ? (
                      <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Icons.google className="mr-2 h-4 w-4" />
                    )}
                    Sign Up with Google
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    disabled={isPending}
                    onClick={() => onSocialSignUp('github')}
                  >
                    {isPending ? (
                      <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Icons.gitHub className="mr-2 h-4 w-4" />
                    )}
                    Sign Up with GitHub
                  </Button>
                </div>

                <div className="text-center text-sm">
                  Already have an account?{' '}
                  <a href="login" className="underline underline-offset-4">
                    Login
                  </a>
                </div>
              </div>
            </div>
          </Form>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{' '}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
