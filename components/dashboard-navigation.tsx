'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icons } from '@/components/icons';
import { cn } from '@/lib/utils';
import { NavItem } from '@/types';
import { Dispatch, SetStateAction } from 'react';
import { useSidebar } from '@/hooks/useSidebar';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from './ui/tooltip';
import { LuGitBranch } from 'react-icons/lu';
import { LuLayoutDashboard } from 'react-icons/lu';
import { Bell } from 'lucide-react';

interface DashboardNavProps {
  items: NavItem[];
  setOpen?: Dispatch<SetStateAction<boolean>>;
  isMobileNav?: boolean;
}

export function DashboardNavigation({
  items,
  setOpen,
  isMobileNav = false
}: DashboardNavProps) {
  const path = usePathname();
  const { isMinimized } = useSidebar();

  if (!items?.length) {
    return null;
  }
  return (
    <nav className="grid items-start gap-2">
      <TooltipProvider>
        {items.map((item, index) => {
          return (
            item.href && (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  <Link
                    href={item.disabled ? '/' : item.href}
                    className={cn(
                      'flex w-full items-center  justify-center overflow-hidden py-2 pl-3 pr-2 text-sm font-medium visited:bg-white hover:bg-white hover:text-accent-foreground dark:visited:bg-gray-500 dark:hover:bg-gray-400',
                      path === item.href ? 'bg-accent' : 'transparent',
                      item.disabled && 'cursor-not-allowed opacity-80'
                    )}
                    onClick={() => {
                      if (setOpen) setOpen(false);
                    }}
                  >
                    {isMobileNav || (!isMinimized && !isMobileNav) ? (
                      <span className="mr-2 truncate">
                        {item.title === 'Commits' ? (
                          <LuGitBranch
                            className="size-[20px] "
                            strokeWidth={1.5}
                          />
                        ) : item.title === 'Notifications' ? (
                          <div className="relative">
                            <Bell className="size-[20px] " strokeWidth={1.5} />
                            <div className="absolute right-0 top-0 h-2 w-2 rounded-full bg-[#FF0101]"></div>
                          </div>
                        ) : (
                          <LuLayoutDashboard
                            className="size-[20px] "
                            strokeWidth={1.5}
                          />
                        )}
                      </span>
                    ) : (
                      ''
                    )}
                  </Link>
                </TooltipTrigger>
                <TooltipContent align="center" side="right" sideOffset={8}>
                  {item.title}
                </TooltipContent>
              </Tooltip>
            )
          );
        })}
      </TooltipProvider>
    </nav>
  );
}
