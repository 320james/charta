import { SignUpForm } from './signup-form';
import { Webhook } from 'lucide-react';

export default function SignUpPage() {
  return (
    <div className="relative flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div
        className="absolute inset-0 h-full w-full bg-cover bg-center blur-sm"
        style={{ backgroundImage: "url('/dark.jpeg')" }}
      ></div>
      <div className="absolute inset-0 h-full w-full bg-black opacity-50 z-0"></div>
      <div className="relative z-10 flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="flex h-6 w-6 items-center justify-center rounded-md">
            <Webhook className="size-6" />
          </div>
          Charta
        </a>
        <SignUpForm />
      </div>
    </div>
  );
}
