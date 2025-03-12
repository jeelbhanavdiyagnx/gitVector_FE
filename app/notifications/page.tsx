'use client';
import React from 'react';
import Dashboard from '@/components/dashboard/dashboard';
import withAuth from '@/app/withAuth';
import Notifications from '@/components/dashboard/notifications/notification';

function Page() {
  return (
    <div className=''>
     
      <Notifications />
    </div>
  );
}

export default withAuth(Page);
