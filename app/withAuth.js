'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import * as jwtDecode from 'jwt-decode';
import _ from 'lodash';

const withAuth = (Component) => {
  const AuthenticatedComponent = (props) => {
    const router = useRouter();
    const { user } = useSelector((state) => state.auth);
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
      const checkAuth = async () => {
        try {
          if (_.isEmpty(user)) {
            const token = localStorage.getItem('token');
            
            if (!token) {
              await router.replace('/login');
              return;
            }

            try {
              const decodedToken = jwtDecode(token);
              const currentTime = Date.now() / 1000;

              if (decodedToken.exp < currentTime) {
                localStorage.removeItem('token');
                await router.replace('/login');
                return;
              }
              
              setIsAuthenticated(true);
            } catch (error) {
              console.error('Token validation error:', error);
              localStorage.removeItem('token');
              await router.replace('/login');
              return;
            }
          } else {
            setIsAuthenticated(true);
          }
        } finally {
          setIsLoading(false);
        }
      };

      checkAuth();
    }, [user, router]);

    // Show loading state
    if (isLoading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
        </div>
      );
    }

    // Only render the component if authenticated
    return isAuthenticated ? <Component {...props} /> : null;
  };

  // Copy static methods
  if (Component.getInitialProps) {
    AuthenticatedComponent.getInitialProps = Component.getInitialProps;
  }

  return AuthenticatedComponent;
};

export default withAuth;