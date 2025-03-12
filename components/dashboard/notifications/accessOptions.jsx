import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import React from 'react';

export default function AccessOptions() {
  return (
    <div>
      <h1 className="text-sm font-medium dark:text-white text-black">
        Notify me about low scores...
      </h1>
      <RadioGroup className='mt-3' >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="once a week" id="once a week" />
          <Label htmlFor="once a week">Once a week</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="Once every 2 week" id="Once every 2 week" />
          <Label htmlFor="Once every 2 week">Once every 2 week</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="Do not notify me" id="Do not notify me" />
          <Label htmlFor="Do not notify me">Do not notify me</Label>
        </div>
      </RadioGroup>
    </div>
  );
}
