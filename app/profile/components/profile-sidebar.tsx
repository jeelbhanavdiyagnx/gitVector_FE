'use client';
import React, { useState } from 'react';
import { DashboardNav } from '@/components/dashboard-nav';
import { profileSidebar } from '@/constants/data';
import { cn } from '@/lib/utils';
import { useSidebar } from '@/hooks/useSidebar';

type SidebarProps = {
  className?: string;
};

export default function Sidebar({ className }: SidebarProps) {
  const { toggle } = useSidebar();
  const [status, setStatus] = useState(false);

  return (
    <nav
      className={cn(
        `relative z-10 hidden h-screen flex-none border-[1.6px] overflow-auto  pt-10 md:block`,
        status && 'duration-500',
        'w-62',
        className
      )}
      // style={{
      //   boxShadow: '-1px 0px 0px 0px #CBD5E1 inset'
      // }}
    >
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="mt-3 space-y-1">
            <DashboardNav items={profileSidebar} />
          </div>
        </div>
      </div>
    </nav>
  );
}
