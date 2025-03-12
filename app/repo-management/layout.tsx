import Header from '@/components/layout/header';

import type { Metadata } from 'next';
import Sidebar from '@/app/profile/components/profile-sidebar';
import Footer from '@/components/layout/footer';

export const metadata: Metadata = {
  title: 'Repository Management',
  description: 'Git Vector'
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className="flex h-screen">
        <Sidebar />
        <main className="flex-1 justify-between flex flex-col  h-screen overflow-y-auto pt-12">{children}<Footer /></main>
      </div>
    </>
  );
}
