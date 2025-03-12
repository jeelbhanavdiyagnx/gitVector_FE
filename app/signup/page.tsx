'use client';

import UserRegistrationForm from '@/components/forms/user-registration-form';
import SuccessModal from '@/components/modal/success-modal';
import React, { Suspense, useState } from 'react';

function SignupPage() {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="flex h-full flex-col gap-3 mt-10  items-center">
      {showModal &&
        <div>
          <SuccessModal setShowModal={setShowModal} title={"Account created successfully"} subtitle={"Next: Check your inbox to confirm your email address"} />
        </div>}
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
          <UserRegistrationForm setShowModal={setShowModal} />
        </div>
      </div>
    </div>
  );
}

export default function PageWrapper() {
  return (

    <Suspense >
      <SignupPage />
    </Suspense>

  );
}
