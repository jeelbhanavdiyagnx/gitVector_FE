'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useEffect, FormEvent } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useSelector, useDispatch } from 'react-redux';
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
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import {
  profileRequest,
  updateUserProfileRequest
} from '@/redux/actions/authAction';

// Zod schema with conditional validation for confirm password
const profileFormSchema = (disablePassword: boolean) =>
  z
    .object({
      username: z.string().min(1, {
        message: 'username is required.'
      }),
      email: z.string().email({
        message: 'Invalid email address.'
      }),
      currPassword: z.string(),
      password: disablePassword
        ? z.string().optional()
        : z
            .string()
            .min(8, {
              message: 'Password must be at least 8 characters.'
            })
            .max(50, {
              message: 'Password must not exceed 50 characters.'
            })
            .regex(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              {
                message:
                  'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character.'
              }
            ),

      confirmPassword: disablePassword ? z.string().optional() : z.string()
    })
    .refine(
      (data) => {
        // Validation logic: if password is set, confirmPassword should match it
        if (data.password) {
          return data.password === data.confirmPassword;
        }
        return true;
      },
      {
        message: 'Passwords must match.',
        path: ['confirmPassword'] // Set path of error
      }
    );

// Form data types
type ProfileFormValues = z.infer<ReturnType<typeof profileFormSchema>>;

export default function ProfileForm() {
  const dispatch = useDispatch();
  const { profile ,loading} = useSelector((state: any) => state.auth);
  const [disablePassword, setDisablePassword] = useState(true);
  const [showPassword, setShowPassword] = useState({
    currPassword: false,
    password: false,
    confirmPassword: false
  });

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema(disablePassword)),
    defaultValues: {
      username: '',
      email: '',
      currPassword: '',
      password: '',
      confirmPassword: ''
    },
    mode: 'onChange'
  });
  useEffect(() => {
    dispatch(profileRequest());
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      form.setValue('username', profile?.user?.username || '');
      form.setValue('email', profile?.user?.email || '');
    }
  }, [profile, form]);

  function onSubmit(data: ProfileFormValues) {
    if (data.currPassword) {
      setDisablePassword(false);
      if ((data.password, data.confirmPassword)) {
        dispatch(
          updateUserProfileRequest(
            data.username,
            data.email,
            data.currPassword,
            data.password
          )
        );
        setTimeout(() => {
          window.location.reload();
        }, 5000);
      }
    } else {
      setDisablePassword(true);
      dispatch(
        updateUserProfileRequest(
          data.username,
          data.email,
          data.currPassword,
          data.password
        )
      );
      setTimeout(() => {
        window.location.reload();
      }, 5000);
    }
  }

  const togglePasswordVisibility = (value: string) => {
    if (value === 'password') {
      setShowPassword((prevState) => ({
        ...prevState,
        password: !prevState.password
      }));
    } else if (value === 'currPassword') {
      setShowPassword((prevState) => ({
        ...prevState,
        currPassword: !prevState.currPassword
      }));
    } else {
      setShowPassword((prevState) => ({
        ...prevState,
        confirmPassword: !prevState.confirmPassword
      }));
    }
  };

  const handleCurrPasswordChange = (e: FormEvent<HTMLInputElement>) => {
    if ((e.target as HTMLInputElement)?.value) {
      setDisablePassword(false);
    } else {
      setDisablePassword(true);
    }
  };

  return (
    <Form {...form}>
      {loading ?
        <div className="flex h-[300px] w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900" />
      </div>
      :
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 ">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex">
                Username 
              </FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} className="w-full" />
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
              <FormLabel className="flex">
                Email 
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="email@example.com"
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
          name="currPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex">
                Current Password
              </FormLabel>
              <div className="relative">
                <FormControl>
                  <Input
                    onChangeCapture={(e) => handleCurrPasswordChange(e)}
                    type={showPassword.currPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    {...field}
                  />
                </FormControl>
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('currPassword')}
                  className="absolute right-2 top-2 focus:outline-none"
                >
                  {showPassword.currPassword ? (
                    <EyeIcon className="h-5 w-5 text-gray-500" />
                  ) : (
                    <EyeOffIcon className="h-5 w-5 text-gray-500" />
                  )}
                </button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          disabled={disablePassword}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex">
              New Password
              </FormLabel>
              <div className="relative">
                <FormControl>
                  <Input
                    type={showPassword.password ? 'text' : 'password'}
                    placeholder="Enter your password"
                    {...field}
                  />
                </FormControl>
                <button
                  type="button"
                  disabled={disablePassword}
                  onClick={() => togglePasswordVisibility('password')}
                  className="absolute right-2 top-2 focus:outline-none disabled:opacity-50"
                >
                  {showPassword.password ? (
                    <EyeIcon className="h-5 w-5 text-gray-500" />
                  ) : (
                    <EyeOffIcon className="h-5 w-5 text-gray-500" />
                  )}
                </button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          disabled={disablePassword}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <div className="relative">
                <FormControl>
                  <Input
                    type={showPassword.confirmPassword ? 'text' : 'password'}
                    placeholder="Confirm your password"
                    {...field}
                  />
                </FormControl>
                <button
                  type="button"
                  disabled={disablePassword}
                  onClick={() => togglePasswordVisibility('confirmPassword')}
                  className="absolute right-2 top-2 focus:outline-none disabled:opacity-50"
                >
                  {showPassword.confirmPassword ? (
                    <EyeIcon className="h-5 w-5 text-gray-500" />
                  ) : (
                    <EyeOffIcon className="h-5 w-5 text-gray-500" />
                  )}
                </button>
              </div>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Update Profile</Button>
      </form>
}
    </Form>
  );
}
