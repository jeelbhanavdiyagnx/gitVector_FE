'use client';
import BillingForm from '@/components/forms/billing-form';
import React from 'react';
import { Separator } from '@/components/ui/separator';
import BillingDetails from '@/components/Billing/BillingDetails';
import { ScrollArea } from '@/components/ui/scroll-area';
import withAuth from '@/app/withAuth';

function Page() {
  return (
    <ScrollArea className="h-full rounded-md">
      <div className="mb-12 px-4 pt-6">
        <h3 className="text-3xl font-semibold tracking-normal sm:text-2xl">
          Billing details
        </h3>
        <p className="pb-2 text-base text-muted-foreground">
          You can update you billing details below.
        </p>
        <Separator />
        <BillingForm />
        <BillingDetails />
      </div>
    </ScrollArea>
  );
}

export default withAuth(Page);