'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { logOut } from '@/redux/actions/authAction';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { RxAvatar } from "react-icons/rx";

export function UserNav() {
  const dispatch = useDispatch();
  
  const onLogout = () => {
    dispatch(logOut());
    localStorage.clear();
}
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8 dark:bg-black  dark:text-white">
            <AvatarImage
            />
            <AvatarFallback className='bg-transparent dark:bg-black'>
              <RxAvatar className='text-xl'/>
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" forceMount>
        <Link href="/profile" passHref>
          <DropdownMenuItem>Account</DropdownMenuItem>
        </Link>
        <Link href="/login">
        <DropdownMenuItem onClick={onLogout}>Log out</DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
