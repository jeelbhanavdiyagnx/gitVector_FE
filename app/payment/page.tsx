'use client';
import PaymentDetails from '@/components/Payment/PaymentDetails';
import { ScrollArea } from '@/components/ui/scroll-area';
import withAuth from '@/app/withAuth';

function Page() {
  return (
    <ScrollArea className="h-full rounded-md">
     <PaymentDetails/>
    </ScrollArea>
  );
}

export default withAuth(Page);