'use client';
import { User, LogOut } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useCurrentUser } from '@/hooks/use-current-user';
import { logout } from '@/actions/logout';

export default function UserButton() {
  const user = useCurrentUser();
  console.log(user?.image);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user?.image || ''} alt="User avatar" />
          <AvatarFallback>
            <User />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="end">
        <DropdownMenuItem href="/profile">Profile</DropdownMenuItem>
        <DropdownMenuItem href="/settings">Settings</DropdownMenuItem>
        <DropdownMenuItem>
          <span
            onClick={() => logout()}
            className="flex items-center cursor-pointer"
          >
            <LogOut className="size-4 mr-2" />
            Log out
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
