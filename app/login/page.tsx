'use client';

import React, { Suspense } from 'react';
import UserAuthForm from '@/components/forms/user-auth-form';
function LoginPage() {

  return (
    <div className="flex h-full flex-col gap-3 items-center">
      <div className="flex h-full flex-1 items-center p-4 lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-4 sm:w-[350px]">
          <div className="mb-6 flex flex-col text-center">
            <h1 className="text-3xl font-semibold tracking-tight">
              Welcome to Git Analysis
            </h1>
            <h4 className="p-2 text-xl font-normal tracking-tight">
              Where the code is analyzed
            </h4>
          </div>
          <UserAuthForm />
        </div>
      </div>
    </div>
  );
}


export default function PageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginPage />
    </Suspense>
  );
}
