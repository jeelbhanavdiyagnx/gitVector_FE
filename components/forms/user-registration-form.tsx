'use client';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dispatch, SetStateAction, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { invitedUserRequest, signup } from '@/redux/actions/authAction';

const formSchema = z.object({
  firstName: z.string().min(1, {
    message: 'First name is required.'
  }),
  lastName: z.string().min(1, {
    message: 'Last name is required.'
  }),
  email: z.string().email({
    message: 'Invalid email address.'
  }),
  password: z
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
          'Password must contain at least one lowercase letter, one uppercase letter, one number and one special character.'
      }
    ),
  confirmPassword: z
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
          'Password must contain at least one lowercase letter, one uppercase letter, one number and one special character.'
      }
    )
});

type UserFormValue = z.infer<typeof formSchema>;

interface MyComponentProps {
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

const UserRegistrationForm: React.FC<MyComponentProps> = ({ setShowModal }) => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  });
  
  const { message } = useSelector((state: any) => state.auth);
  const invitedId = searchParams.get('invited');
  useEffect(() => {
    if (invitedId) {
      console.log(invitedId, typeof invitedId);
      
      dispatch(invitedUserRequest(invitedId))
    }
  }, [invitedId])
  
  useEffect(() => {
    if (message === "User registered successfully") {
      const timer = setTimeout(() => {
        router.push('/login')
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);
  
  const onSubmit = async (data: UserFormValue) => {
    dispatch(signup(data.firstName + " " + data.lastName, data.email, data.password))
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-4"
        >
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="First Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Last Name" {...field} />
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
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Confirm Password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="ml-auto w-full" type="submit">
            Sign Up
          </Button>
        </form>
      </Form>
    </>
  );
}
export default UserRegistrationForm;