'use client';
import React from 'react';
import Resources from '@/app/resources/components/resources';
import withAuth from '@/app/withAuth';

function Page() {
  return (
    <div>
      <Resources />
    </div>
  );
}

export default withAuth(Page);