'use client';
import React from 'react';
import CookiesPolicy from '@/components/footer/cookies-policy';
import withAuth from '@/app/withAuth';

function Page() {
  return (
    <div>
      <CookiesPolicy />
    </div>
  );
}


export default withAuth(Page);