'use client';
import React, { useState } from 'react';
import { DashboardNavItems } from '@/constants/data';
import { cn } from '@/lib/utils';
import { DashboardNavigation } from '../dashboard-navigation';

type SidebarProps = {
  className?: string;
};

export default function DashboardSidebar({ className }: SidebarProps) {
  const [status, setStatus] = useState(false);

  return (

    <nav
      className={cn(
        `relative z-10 hidden h-screen flex-none overflow-auto  pt-10 md:block bg-accent shadow-sm shadow-slate-400`,
        status && 'duration-500',
        'w-18',
        className
      )}
    >
      <div className="space-y-4 py-4 px-1">
        <div className="mt-3 space-y-2">
          <DashboardNavigation items={DashboardNavItems} />
        </div>
      </div>
    </nav>

  );
}
