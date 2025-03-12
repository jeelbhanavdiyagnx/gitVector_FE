'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '@/redux/actions/authAction';
import { useRouter } from 'next/navigation';
import * as z from 'zod';
import { FaGithub } from 'react-icons/fa';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

const formSchema = z.object({
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters.' })
    .max(50, { message: 'Password must not exceed 50 characters.' }),
  username: z.string().email({
    message: 'Invalid email address.'
  })
});

type UserFormValue = z.infer<typeof formSchema>;

export default function UserAuthForm() {
  const dispatch = useDispatch();
  const { user,loading, jwt } = useSelector((state: any) => state.auth);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: { username: '', password: '' }
  });
  useEffect(() => {
    if (user?.githubProfileUrl) {
      router.push('/dashboard')
    }
    else if (jwt) {
      router.push('/git-authentication')
    }
  }, [user, router]);
  const onSubmit = async (data: UserFormValue) => {
    dispatch(login(data.username, data.password));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div
                  className="flex items-center rounded-lg border focus-within:border-black focus-within:ring-2 focus-within:ring-black"
                  style={{ boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)' }}
                >
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    className="flex-grow border-none focus-visible:outline-none focus-visible:ring-transparent"
                    {...field}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="p-2 focus:outline-none"
                  >
                    {showPassword ? (
                      <EyeIcon className="h-5 w-5 text-gray-500" />
                    ) : (
                      <EyeOffIcon className="h-5 w-5 text-gray-500" />
                    )}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="ml-auto w-full" type="submit">
          Sign In
        </Button>
        <div className="flex justify-between text-sm">
          <Link href="/privacy" className="underline underline-offset-4">
            Forgot Password?
          </Link>
        </div>
      </form>
    </Form>
  );
}
