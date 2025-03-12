'use client';
import React from 'react';
import Dashboard from '@/components/dashboard/dashboard';
import withAuth from '@/app/withAuth';

function Page() {
  return (
    <div>
      <Dashboard />
      
    </div>
  );
}

export default withAuth(Page);
