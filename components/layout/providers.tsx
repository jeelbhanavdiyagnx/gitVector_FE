'use client';
import React from 'react';
import ThemeProvider from './ThemeToggle/theme-provider';
export default function Providers({
  // session,
  children
}: {
  // session: SessionProviderProps['session'];
  children: React.ReactNode;
}) {
  return (
    <>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
        {/*<SessionProvider session={session}>{children}</SessionProvider>*/}
      </ThemeProvider>
    </>
  );
}
