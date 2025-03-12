'use client';
import ThemeToggle from '@/components/layout/ThemeToggle/theme-toggle';
import { cn } from '@/lib/utils';
import { MobileSidebar } from './mobile-sidebar';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '../ui/button';
import Image from 'next/image';
import Logo from '@/components/assets/1.svg'

interface AuthHeaderProps {
  data: boolean;
}

export default function AuthHeader({ data }: AuthHeaderProps) {
  const router = useRouter();
  return (
    <div className="fixed left-0 right-0 top-0 z-50 dark:bg-black bg-white">
      <nav className="flex h-14 items-center justify-between pr-4 pl-1">
        <div className="hidden lg:block">
          <Link href={'/dashboard'}>
          <Image alt={"Logo"} src={Logo} height={72} width={72}/>
          </Link>
        </div>
        <div className={cn('block lg:!hidden')}>
          <MobileSidebar />
        </div>
        <div className="flex items-center gap-2">
          {data ? (
            <Button onClick={() => router.push('/signup')}>Signup</Button>
          ) : (
            <Button onClick={() => router.push('/login')}>Login</Button>
          )}
          <ThemeToggle />
        </div>
      </nav>
    </div>
  );
}
