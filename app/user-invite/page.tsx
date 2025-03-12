'use client';

import Invitation from '@/components/Invitation/Invitation';
import React from 'react';
import withAuth from '@/app/withAuth';

const UserInvite = () => {
  return (
    <div className="flex h-full flex-col items-center sm:mt-12 py-10 px-8">
        <Invitation/>
    </div>
  );
};

export default withAuth(UserInvite);
