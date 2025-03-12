import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { useSidebar } from '@/hooks/useSidebar';
import { usePathname } from 'next/navigation';

function EditorHistory({ isMobileNav = false }) {
  const items = [
    {
      href: 'AI Suggestions',
      title: 'AI Suggestions'
    },
    {
      href: 'AI Suggestions',
      title: 'AI Suggestions'
    },
    {
      href: 'AI Suggestions',
      title: 'AI Suggestions'
    },
    {
      href: 'AI Suggestions',
      title: 'AI Suggestions'
    }
  ];
  const path = usePathname();
  const { isMinimized } = useSidebar();
  return (
    <nav className="grid items-start gap-2">
      <h2 className="mt-2 pl-3 font-medium">History</h2>
      <TooltipProvider>
        {items.map((item, index) => {
          return (
            item.href && (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  <Link
                    href={item.disabled ? '/' : item.href}
                    className={cn(
                      'flex items-center gap-2 overflow-hidden rounded-md py-2 pl-3 text-xs font-medium hover:bg-accent hover:text-accent-foreground',
                      path === item.href ? 'bg-accent' : 'transparent',
                      item.disabled && 'cursor-not-allowed opacity-80'
                    )}
                    //   onClick={() => {
                    //     if (setOpen) setOpen(false);
                    //   }}
                  >
                    {isMobileNav || (!isMinimized && !isMobileNav) ? (
                      <span className="mr-2 truncate">{item.title}</span>
                    ) : (
                      ''
                    )}
                  </Link>
                </TooltipTrigger>
                <TooltipContent
                  align="center"
                  side="right"
                  sideOffset={8}
                  className={!isMinimized ? 'hidden' : 'inline-block'}
                >
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

export default EditorHistory;
