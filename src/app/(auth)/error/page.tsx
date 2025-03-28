import ErrorCard from './error-card';

export default function AuthErrorPage() {
  return (
    <div className="relative flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <ErrorCard />
    </div>
  );
}
