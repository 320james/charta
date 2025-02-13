import { auth, signOut } from '@/auth';

import { Separator } from '@/components/ui/separator';
import { ProfileForm } from './profile-form';

export default async function SettingsProfilePage() {
  const session = await auth();
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">
          This is how others will see you on the site.
        </p>
      </div>
      <div>
        {JSON.stringify(session)}
        <form
          action={async () => {
            'use server';
            await signOut();
          }}
        >
          <button type="submit">Sign out</button>
        </form>
      </div>
      <Separator />
      <ProfileForm />
    </div>
  );
}
