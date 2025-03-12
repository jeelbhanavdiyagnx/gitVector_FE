'use client';
import ThemeToggle from '@/components/layout/ThemeToggle/theme-toggle';
import { cn } from '@/lib/utils';
import { MobileSidebar } from './mobile-sidebar';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '../ui/button';
import { UserNav } from './user-nav';
import { useSelector } from 'react-redux';
import Logo from '@/components/assets/1.svg'
import Image from 'next/image';
import GNXLogo from '@/components/assets/logo.svg'

export default function Header() {
  const { user } = useSelector((state: any) => state.auth);
  const router = useRouter();
  return (
    <div className="fixed left-0 right-0 top-0 z-20  bg-accent  dark:bg-black shadow shadow-slate-400">
      <nav className="flex h-14 items-center justify-between pr-4 pl-4">
        <div className="hidden lg:block">
          <Link href={'/dashboard'}>
          {/* <img src={Logo}/> */}
          <Image alt={"Logo"} src={GNXLogo}/>
          </Link>
        </div>
        <div className={cn(' lg:!hidden flex gap-0 items-center pl-3')}>
          <MobileSidebar />
           <Link href={'/dashboard'}>
           <Image alt={"Logo"} src={Logo} height={60} width={60}/>
          </Link> 
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-4 text-lg font-medium lg:flex">
            <Button variant="ghost" onClick={() => router.push('/pricing')}>
              Pricing
            </Button>
            <Button onClick={() => router.push('/features')} variant="ghost">
              Features
            </Button>
            <Button onClick={() => router.push('/resources')} variant="ghost">
              Resources
            </Button>
          </div>
          {/* Show only Login and Signup buttons on mobile */}
          {user ? (
            <UserNav />
          ) : (
            <div className="flex items-center gap-6">
              <Button onClick={() => router.push('/signup')}>Signup</Button>
            </div>
          )}
          <ThemeToggle />
        </div>
      </nav>
    </div>
  );
}
