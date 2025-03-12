'use client';
import React from 'react';
import { Separator } from '@/components/ui/separator';
import RepoManagement from '@/components/RepoManagement/RepoManagement';
import withAuth from '@/app/withAuth';
import ManagementHeader from '@/components/Management Components/managementHeader';

function Page() {
  return (
    <div className="space-y-6 overflow-auto px-4 ">
      <div className="lg:w-3/4 pt-6">
      <ManagementHeader title="Repositories management" description="You can add remove your repositories below"/>
        <h3 className="text-base font-medium tracking-normal pt-3">
        Repositories & organizations associated with your GitHub account
        </h3>
      </div>
      <RepoManagement/>
    </div>
  );
}



export default withAuth(Page);

