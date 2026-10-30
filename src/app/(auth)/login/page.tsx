import type { Metadata } from 'next';
import Link from 'next/link';

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
              <svg className="size-[18px] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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

            <form action="/dashboard" className="mt-6 space-y-5">
              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  defaultValue="admin@doctortracker.dev"
                  placeholder="you@hospital.com"
                  className="block h-10 w-full rounded-lg border border-line bg-white px-3 text-sm text-ink placeholder:text-muted/80 focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-500/15"
                />
              </div>

              <div>
                <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-ink">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    defaultValue="ChangeMe123!"
                    placeholder="Your password"
                    className="block h-10 w-full rounded-lg border border-line bg-white px-3 pr-11 text-sm text-ink placeholder:text-muted/80 focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-500/15"
                  />
                  <button
                    type="button"
                    aria-label="Show password"
                    className="absolute inset-y-0 right-1 my-auto inline-grid size-8 shrink-0 place-items-center rounded-lg text-muted transition-colors hover:bg-canvas hover:text-ink"
                  >
                    <svg className="size-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  </button>
                </div>
                <p className="mt-1.5 text-xs text-muted">Forgot it? Ask an admin to reset your password.</p>
              </div>

              <button
                type="submit"
                className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-brand-600 px-4 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
              >
                Sign in
              </button>
            </form>
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

