'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectValue
} from '@/components/ui/select';

function PaymentForm() {
  const form = useForm({
    defaultValues: {
      name: '',
      creditCard: '',
      expirationMonth: '',
      expirationYear: '',
      cvv: ''
    }
  });

  const [cardNumber, setCardNumber] = useState(''); // Store formatted card number

  const handleCardNumberChange = (value) => {
    // Remove all non-numeric characters
    const numericValue = value.replace(/\D/g, '');

    // Format the number in groups of 4
    const formattedNumber = numericValue
      .replace(/(\d{4})(?=\d)/g, '$1 ') // Adds a space every 4 digits
      .trim();

    // Limit to 16 digits
    const trimmedValue = formattedNumber.slice(0, 19);

    // Update state with formatted number
    setCardNumber(trimmedValue);

    // Set only the last 4 digits for submission
    form.setValue('creditCard', numericValue.slice(-4));
  };

  const onSubmit = (data) => {
  };

  // Generate future 20 years
  const currentYear = new Date().getFullYear();
  const futureYears = Array.from({ length: 20 }, (_, i) => currentYear + i);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mr-auto w-full max-w-lg space-y-6 px-0 sm:px-0"
      >
        {/* Name Field */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="John Doe"
                  {...field}
                  className="w-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Credit Card Number (Formatted in groups of 4 digits) */}
        <FormField
          control={form.control}
          name="creditCard"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Credit Card Number</FormLabel>
              <FormControl>
                <Input
                  placeholder="**** **** **** 9654"
                  value={cardNumber}
                  onChange={(e) => handleCardNumberChange(e.target.value)}
                  className="w-full"
                  maxLength={19} // Limit input length (16 digits + 3 spaces)
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Expiration and CVV Fields (In one row) */}
        <div className="flex gap-4">
          {/* Expiration Month */}
          <FormField
            control={form.control}
            name="expirationMonth"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Month</FormLabel>
                <FormControl>
                  <Select {...field} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select month" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 12 }, (_, i) => (
                        <SelectItem
                          key={i + 1}
                          value={(i + 1).toString().padStart(2, '0')}
                        >
                          {i + 1}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Expiration Year */}
          <FormField
            control={form.control}
            name="expirationYear"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Year</FormLabel>
                <FormControl>
                  <Select {...field} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent>
                      {futureYears.map((year) => (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* CVV */}
          <FormField
            control={form.control}
            name="cvv"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>CVV</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="123"
                    {...field}
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Submit Button */}
        <Button type="submit" className="w-full">
          Continue to pay $10
        </Button>
      </form>
    </Form>
  );
}

export default PaymentForm;
