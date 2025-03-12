'use client';
import { useEffect } from 'react';
import Header from '@/components/layout/header';
import DashboardSidebar from '@/components/layout/dashboard-sidebar';
import Footer from '@/components/layout/footer';
import { useMetadata } from '@/context/MetadataContext';
import Head from 'next/head';


export default function Layout({ children }: { children: React.ReactNode }) {
  const { title, description } = useMetadata();

  useEffect(() => {
    if (title) {
      document.title = title;
    }
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription && description) {
      metaDescription.setAttribute('content', description);
    }
  }, [title, description]);
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <Header />
      <div className="flex h-screen overflow-y-auto">
        <DashboardSidebar />
        <main className="flex-1 flex h-auto flex-col justify-between overflow-hidden pt-12">
          {children}
          <Footer />
        </main>
      </div>

    </>
  );
}
