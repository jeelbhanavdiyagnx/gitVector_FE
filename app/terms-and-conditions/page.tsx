'use client';
import React from 'react';
import TermsAndConditions from '@/components/footer/terms-and-conditions';
import withAuth from '@/app/withAuth';

function Page() {
  return (
    <div>
      <TermsAndConditions />
    </div>
  );
}


export default withAuth(Page);