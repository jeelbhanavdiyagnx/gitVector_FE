'use client';

import React from 'react';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';

export default function Contact() {
  const router = useRouter();
  return (
    <div className="container py-6">
      <div className="max-w-2xl text-center">
        <h2 className="mb-4 text-3xl font-bold">Contact Us</h2>
        <h3 className="mb-2 text-xl font-semibold">
          Need help getting started? We’ve got your back
        </h3>
        <p className="mb-6 ">
          Our team is just a message away. We’ll get back to you faster than you
          can brainstorm your next idea!
        </p>
        <Button
          onClick={() => router.push('/contact-us')}
          className="px-6 py-3"
        >
          Contact now
        </Button>
      </div>
    </div>
  );
}
