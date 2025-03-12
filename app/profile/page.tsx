'use client';
import React from 'react';
import ProfileForm from '@/components/forms/profile-form';
import { Separator } from '@/components/ui/separator';
import withAuth from '@/app/withAuth';
import ReAuthentication from '@/components/forms/re-authentication';


function page() {
  return (
    <div className="space-y-2 w-full  h-full overflow-auto max-h-[88vh] py-5">
      <div className='w-full lg:w-3/5 h-full'>
      <div className="px-4 pt-6">
        <h3 className="text-3xl font-semibold tracking-normal sm:text-2xl">
          Edit Profile
        </h3>
        <p className="pb-4 text-base text-muted-foreground">
          Using the form below you can update your profile.
        </p>
        <Separator />
      </div>
      <div className=' w-full p-4 py-8'>
        <ProfileForm />
      </div>
      <ReAuthentication />
    </div>
    </div>
  );
}

export default withAuth(page);