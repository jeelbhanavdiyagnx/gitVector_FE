import AuthHeader from '@/components/layout/autHeader';
import Footer from '@/components/layout/footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SignUp',
  description: 'Git Vector'
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AuthHeader data={false} />
      <div className="flex h-screen overflow-hidden">
        <main className="flex-1 flex-grow h-auto overflow-auto pt-0">
          {children}<Footer /></main>
      </div>
    </>
  );
}
