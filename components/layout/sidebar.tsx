'use client';
import React, { useState } from 'react';
import { DashboardNav } from '@/components/dashboard-nav';
import { navItems } from '@/constants/data';
import { cn } from '@/lib/utils';
import { useSidebar } from '@/hooks/useSidebar';

type SidebarProps = {
  className?: string;
};

export default function Sidebar({ className }: SidebarProps) {
  const [status, setStatus] = useState(false);

  return (
    <nav
      className={cn(
        `relative z-10 hidden h-screen flex-none overflow-auto border-r pl-2 pr-2 pt-10 md:block`,
        status && 'duration-500',
        'w-52',
        className
      )}
      style={{
        boxShadow: '-1px 0px 0px 0px #CBD5E1 inset'
      }}
    >
      <div className="space-y-4 py-4">
        <div className="mt-3 space-y-1">
          <DashboardNav items={navItems} />
        </div>
      </div>
    </nav>
  );
}
