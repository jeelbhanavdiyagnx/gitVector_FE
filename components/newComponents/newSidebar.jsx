'use client';
import React, { useState } from 'react';
import { DashboardNav } from '@/components/dashboard-nav';
import { favoritePrompts } from '@/constants/data';
import { cn } from '@/lib/utils';
import { useSidebar } from '@/hooks/useSidebar';
import Image from 'next/image';

export default function NewSidebar({ className }) {
  const { toggle } = useSidebar();
  const [status, setStatus] = useState(false);

  return (
    <nav
      className={cn(
        `relative z-10 h-screen flex-none overflow-auto pl-2 pr-2 md:block`,
        status && 'duration-500',
        'w-52',
        className
      )}
      style={{
        boxShadow: '0px 0px 0px 0px #CBD5E1 inset'
      }}
    >
      <div className="space-y-4 py-4">
        <div>
          <div className="space-y-1">
            <div className="mb-4 flex items-center">
              <h2 className="mr-2 text-lg font-bold">Favorites</h2>
              <Image
                src="/icons/favorite.svg"
                width={18}
                height={18}
                alt="save"
              />
            </div>
            <DashboardNav items={favoritePrompts} />
          </div>
        </div>
      </div>
    </nav>
  );
}
