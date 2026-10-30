import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import { LoginForm } from '@/features/auth/LoginForm';

export const metadata: Metadata = {
  title: 'Sign in | Doctor Tracker',
};

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-[400px]">
        {/* Logo */}
        <div className="flex justify-center">
          <Link href="/login" className="flex items-center gap-2.5 rounded-lg">
            <span className="grid size-8 place-items-center rounded-lg bg-brand-600 text-white">
              <svg
                className="size-[18px] shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.25"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </span>
            <span className="text-[15px] font-semibold tracking-tight text-ink">Doctor Tracker</span>
          </Link>
        </div>

        {/* Card */}
        <div className="mt-8">
          <div className="rounded-2xl border border-line bg-white p-6 shadow-[0_1px_2px_rgba(16,24,22,0.04)] sm:p-8">
            <h1 className="text-xl font-semibold tracking-tight text-ink">Sign in</h1>
            <p className="mt-1 text-sm text-muted">Use the account your administrator set up for you.</p>

            <Suspense fallback={<div className="h-48 animate-pulse bg-muted/10 rounded-lg mt-6" />}>
              <LoginForm />
            </Suspense>
          </div>
        </div>

        {/* Demo Credentials Box */}
        <div className="mt-4 rounded-xl border border-dashed border-line px-4 py-3 text-sm">
          <p className="font-medium text-ink">Demo accounts</p>
          <dl className="mt-1.5 grid grid-cols-[auto_1fr] gap-x-4 gap-y-0.5 text-muted">
            <dt>Admin</dt>
            <dd className="text-ink">admin@doctortracker.dev</dd>
            <dt>Staff</dt>
            <dd className="text-ink">staff@doctortracker.dev</dd>
            <dt>Password</dt>
            <dd className="text-ink">ChangeMe123!</dd>
          </dl>
        </div>

        <p className="mt-8 text-center text-xs text-muted">Access is limited to authorized hospital staff.</p>
      </div>
    </main>
  );
}
