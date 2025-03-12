'use client';

import React, { Suspense, useEffect, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { githubLogin } from '@/redux/actions/authAction';

export const dynamic = 'force-dynamic';

const TokenHandler = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const connect = useMemo(() => searchParams.get('code'), [searchParams]);
  const { user, isLoggedIn } = useSelector((state: any) => state.auth);



  useEffect(() => {
    const handleRedirect = () => {
      if (connect) {
        localStorage.setItem('code', connect);
        if(!user.githubProfileUrl)
        {
          dispatch(githubLogin());
        }
        // Wait until user state is updated
        if (user && user.githubProfileUrl) {
          localStorage.setItem('userInfo', JSON.stringify(user));
          router.push('/dashboard');
        }
      } else {
        router.push('/login');
      }
    };
    handleRedirect();
  }, [connect, router, dispatch, user]);

  return null;
};

const GitHubCallbackHandler = () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <TokenHandler />
      <p>Redirecting...</p>
    </Suspense>
  );
};

export default GitHubCallbackHandler;
