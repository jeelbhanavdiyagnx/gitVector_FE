import DashboardSidebar from '@/components/layout/dashboard-sidebar';
import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Notification',
  description: 'Git vector, gives analytics of Github organizations, repositories and users'
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header/>
      <div className="flex h-screen overflow-auto">
        <DashboardSidebar/>
        <main className="flex-1  overflow-auto pt-12">{children} <Footer/></main>
      </div>
    </>
  );
}
