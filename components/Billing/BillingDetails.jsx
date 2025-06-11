import React from 'react';
import { Button } from '@/components/ui/button';

function BillingDetails() {

  return (
    <div>
      <div className="mt-4">
        <h3>Plan detail & payment details</h3>
        <p className="pb-2 text-base text-muted-foreground">
          View and upgrade your plan below
        </p>
      </div>
      <div className="mt-2 flex text-base text-muted-foreground">
        <p>Current Plan:</p>
        <p>$10 monthly</p>
      </div>
      <div>
        <p className=" text-base text-muted-foreground">
          Unlimited prompts & response generation
        </p>
        <p className=" text-base text-muted-foreground">
          Unlimited saved prompts & favorites
        </p>
      </div>
      <div className="mt-2 flex text-base text-muted-foreground">
        <p> Paid:</p>
        <p>$5 on 11/02/2024</p>
      </div>
      <div className="flex text-base text-muted-foreground">
        <p> Paid:</p>
        <p>$10 on 11/02/2024</p>
      </div>
      <p className="text-muted-foreground">Next billed on 11/04/2024</p>
      <div className="mt-4 flex gap-4">
        <Button type="submit" className="w-30">
          Update to yearly
        </Button>
        <Button type="submit" variant="secondary" className="w-30">
          Cancel Subscription
        </Button>
      </div>
    </div>
  );
}

export default BillingDetails;
