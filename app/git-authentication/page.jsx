'use client';

import GithubAuthentication from '@/components/GitAuthentication/GitAuthentication';
import React from 'react';
import withAuth from '@/app/withAuth';

const Page = () => {
  return (
    <div className="flex  flex-col items-center sm:mt-10">
      <GithubAuthentication/>
    </div>
  );
};

export default withAuth(Page);
