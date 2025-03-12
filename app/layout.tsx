import '@uploadthing/react/styles.css';
import type { Metadata } from 'next';
import NextTopLoader from 'nextjs-toploader';
import { Inter } from 'next/font/google';
import './globals.css';
import './home.css'
import ReduxProvider from './ReduxProvider';
import ThemeProvider from '@/components/layout/ThemeToggle/theme-provider';
const inter = Inter({ subsets: ['latin'] });
import { MetadataProvider } from '@/context/MetadataContext';

export const metadata: Metadata = {
  title: 'Git Vector',
  description: 'Git vector, gives analytics of Github organizations, repositories and users'
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} overflow-hidden`}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <NextTopLoader />
        <MetadataProvider>
        <ReduxProvider>
          {children}
        </ReduxProvider>
        </MetadataProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
