'use client';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation'; 
import withAuth from '@/app/withAuth';


function Page() {
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      router.push('/dashboard')
    }
    else{
    dispatch({ type: 'auth/loginRequest' });
    router.push('/signup'); 
    }
  }, [dispatch, router]);

  return null;
}

export default withAuth(Page);
