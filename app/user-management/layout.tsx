import Header from '@/components/layout/header';

import type { Metadata } from 'next';
import Sidebar from '@/app/profile/components/profile-sidebar';
import Footer from '@/components/layout/footer';

export const metadata: Metadata = {
  title: 'User management',
  description: 'Git Vector'
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className="flex h-screen overflow-hidden">
        <Sidebar/>
      <main className="flex-1 justify-between flex flex-col   flex-grow h-full  overflow-auto pt-12">{children}<Footer /></main>
      </div>
    </>
  );
}
