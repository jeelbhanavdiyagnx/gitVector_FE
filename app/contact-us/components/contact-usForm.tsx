'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

const profileFormSchema = z.object({
  name: z.string().min(1, {
    message: 'First name is required.'
  }),
  email: z.string().email({
    message: 'Invalid email address.'
  }),
  reason: z.string().min(1, {
    message: 'Please select an reason for contact.'
  }),
  message: z.string().min(4, {
    message: 'Tell us the problem.'
  }),
  file: z
    .any()
    .optional()
    .refine((val) => typeof window !== 'undefined' && val instanceof FileList, {
      message: 'File must be a valid FileList',
      path: ['file']
    })
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export default function ContactForm() {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: '',
      email: '',
      reason: '',
      message: ''
    },
    mode: 'onChange'
  });
  

  const fileRef = form.register('file');

  function onSubmit(data: ProfileFormValues) {
    toast({
      title: 'Submitted',
      description: 'Our team will get back to you at the earliest'
    });
  }

  return (
    <div className="space-y-6 sm:space-x-14" style={{ marginBottom: '60px' }}>
      <div className="pt-6 sm:space-x-10 ml-3 sm:ml-10">
        <p className="text-3xl font-semibold sm:ml-10 sm:text-2xl">
          Contact Us
        </p>
        <p className="pb-2 text-muted-foreground">
          Using the form and our team will get back to you at the earliest
        </p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mr-auto w-full max-w-lg space-y-6 px-4 sm:px-6"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name *</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email *</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    {...field}
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="reason"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Reason for contact *</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your issue" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="General Inquiry">
                      General Inquiry
                    </SelectItem>
                    <SelectItem value="Technical Support">
                      Technical Support
                    </SelectItem>
                    <SelectItem value="Feedback/Suggestions">
                      Feedback/Suggestions
                    </SelectItem>
                    <SelectItem value="Billing/Subscription">
                      Billing/Subscription
                    </SelectItem>
                    <SelectItem value="Business Inquiry">
                      Business Inquiry
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message *</FormLabel>
                <FormControl>
                  <Textarea className="resize-none" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="file"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>File upload</FormLabel>
                  <FormControl>
                    <Input type="file" placeholder="shadcn" {...fileRef} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <Button type="submit">Send message</Button>
        </form>
      </Form>
    </div>
  );
}
