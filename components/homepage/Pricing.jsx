'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

const Pricing = () => {
  return (
    <div className="container px-6 py-6">
      <h1 className="mb-6 text-center text-4xl font-bold">Pricing</h1>
      <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {/* Free Plan Card */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="text-3xl">Free</CardTitle>
            <CardDescription>
              For individuals just getting started with ChatGPT
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc space-y-2 pl-4">
              <li>Assistance with writing, problem solving, and more</li>
              <li>Access to GPT-4o mini</li>
              <li>Limited access to GPT-4o</li>
              <li>
                Limited access to data analysis, file uploads, vision, web
                browsing, and custom GPTs
              </li>
            </ul>
            <div className="mt-4 text-3xl font-bold">
              $0 <span className="text-base">/month</span>
            </div>
          </CardContent>
          <CardFooter className="flex">
            <Button>Start now</Button>
          </CardFooter>
        </Card>

        {/* Plus Plan Card */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="text-3xl">Plus</CardTitle>
            <CardDescription>
              For individuals looking to amplify their productivity
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc space-y-2 pl-4">
              <li>Early access to new features</li>
              <li>Access to GPT-4, GPT-4o, GPT-4o mini</li>
              <li>Up to 5x more messages for GPT-4o</li>
              <li>
                Access to data analysis, file uploads, vision, and web browsing
              </li>
              <li>DALL·E image generation</li>
              <li>Create and use custom GPTs</li>
            </ul>
            <div className="mt-4 text-3xl font-bold">
              $20 <span className="text-base">/month</span>
            </div>
          </CardContent>
          <CardFooter className="flex">
            <Button>Start now</Button>
          </CardFooter>
        </Card>

        {/* Team Plan Card */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="text-3xl">Team</CardTitle>
            <CardDescription>
              For fast-moving teams and organizations ready to supercharge work
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc space-y-2 pl-4">
              <li>Everything included in Plus</li>
              <li>
                Unlimited access to GPT-4o mini and higher message limits on
                GPT-4, GPT-4o, and tools like DALL·E, web browsing, data
                analysis, and more
              </li>
              <li>Create and share GPTs with your workspace</li>
              <li>Admin console for workspace management</li>
              <li>Team data excluded from training by default. Learn more</li>
            </ul>
            <div className="mt-4 text-3xl font-bold">
              $50 <span className="text-base">/month</span>
            </div>
          </CardContent>
          <CardFooter className="flex">
            <Button>Start now</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Pricing;
