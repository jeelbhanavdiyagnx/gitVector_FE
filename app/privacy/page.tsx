'use client';
import React from 'react';
import Privacy from '@/components/footer/privacy';
import withAuth from '@/app/withAuth';

function Page() {
  return (
    <div>
      <Privacy />
    </div>
  );
}

export default withAuth(Page);