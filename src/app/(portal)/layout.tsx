import { Suspense } from 'react';
import { Sidebar, Header } from '@/components/layout/Shell';
import { Toast } from '@/components/layout/Toast';

export default function PortalLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal?: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-canvas">
      <Suspense fallback={<aside className="hidden lg:flex w-64 flex-col border-r border-line bg-white shrink-0" />}>
        <Sidebar />
      </Suspense>
      <div className="flex flex-1 flex-col min-w-0">
        <Suspense fallback={<header className="h-16 border-b border-line bg-white shrink-0" />}>
          <Header />
        </Suspense>
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
      {modal}
      <Toast />
    </div>
  );
}

