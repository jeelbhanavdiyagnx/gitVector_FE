import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'GNX Prompt Maker',
  description: 'Prompt Maker'
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className="flex h-screen overflow-hidden">
        <main className="flex-1 overflow-auto pt-12">{children}<Footer /></main>
      </div>
    </>
  );
}
