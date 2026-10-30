'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useCurrentUser, useLogout } from '@/features/auth/hooks';
import { clearSessionCookie } from '@/lib/auth/cookies';

export function Sidebar() {
  const pathname = usePathname();
  const { data: me } = useCurrentUser();
  const isAdmin = me?.role ? me.role === 'admin' : true;

  const navItems = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: (
        <svg className="size-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <rect width="7" height="9" x="3" y="3" rx="1" />
          <rect width="7" height="5" x="14" y="3" rx="1" />
          <rect width="7" height="9" x="14" y="12" rx="1" />
          <rect width="7" height="5" x="3" y="16" rx="1" />
        </svg>
      ),
    },
    {
      name: 'Doctors',
      href: '/doctors',
      icon: (
        <svg className="size-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
    {
      name: 'Patients',
      href: '/patients',
      icon: (
        <svg className="size-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
    },
    {
      name: 'Dialogs & States',
      href: '/overlays',
      icon: (
        <svg className="size-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <rect width="18" height="18" x="3" y="3" rx="2" />
          <path d="M3 9h18" />
          <path d="M9 21V9" />
        </svg>
      ),
    },
  ];

  const adminItems = [
    {
      name: 'Users',
      href: '/users',
      icon: (
        <svg className="size-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 21a6 6 0 0 0-12 0" />
          <circle cx="12" cy="11" r="4" />
          <rect width="18" height="18" x="3" y="3" rx="2" />
        </svg>
      ),
    },
    {
      name: 'Audit Logs',
      href: '/audit-logs',
      icon: (
        <svg className="size-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      ),
    },
  ];

  return (
    <aside className="hidden w-[248px] shrink-0 border-r border-line bg-white lg:block">
      <div className="flex h-16 items-center gap-2.5 px-6 border-b border-line">
        <Link href="/dashboard" className="flex items-center gap-2.5 rounded-lg">
          <span className="grid size-8 place-items-center rounded-lg bg-brand-600 text-white">
            <svg className="size-[18px] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </span>
          <span className="text-[15px] font-semibold tracking-tight text-ink">Doctor Tracker</span>
        </Link>
      </div>

      <nav className="p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                isActive ? 'bg-brand-50 text-brand-700' : 'text-ink hover:bg-canvas text-muted hover:text-ink'
              }`}
            >
              <span className={isActive ? 'text-brand-600' : 'text-muted'}>{item.icon}</span>
              {item.name}
            </Link>
          );
        })}

        {isAdmin && (
          <>
            <div className="pt-4 pb-1 px-3">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">Admin</p>
            </div>
            {adminItems.map((item) => {
              const isActive = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    isActive ? 'bg-brand-50 text-brand-700' : 'text-muted hover:bg-canvas hover:text-ink'
                  }`}
                >
                  <span className={isActive ? 'text-brand-600' : 'text-muted'}>{item.icon}</span>
                  {item.name}
                </Link>
              );
            })}
          </>
        )}
      </nav>
    </aside>
  );
}

export function Header() {
  const router = useRouter();
  const { data: me } = useCurrentUser();
  const logout = useLogout();

  const displayName = me?.name || 'Admin User';
  const displayRole = me?.role ? me.role.toUpperCase() : 'ADMIN';
  const initials = displayName
    .split(' ')
    .map((n) => n[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const handleSignOut = async () => {
    clearSessionCookie();
    try {
      await logout.mutateAsync();
    } catch {
      router.push('/login');
    }
  };

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-line bg-white px-4 sm:px-6 lg:px-8">
      <div className="flex items-center gap-3 lg:hidden">
        <Link href="/dashboard" className="flex items-center gap-2">
          <span className="grid size-7 place-items-center rounded-lg bg-brand-600 text-white">
            <svg className="size-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </span>
          <span className="text-sm font-semibold text-ink">Doctor Tracker</span>
        </Link>
      </div>

      <div className="hidden lg:block">
        <span className="text-xs font-medium uppercase tracking-wider text-muted">
          Hospital Administration Portal
        </span>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 text-sm">
          <span className="size-7 grid place-items-center rounded-full bg-brand-50 text-brand-700 font-semibold text-xs border border-brand-200">
            {initials}
          </span>
          <div className="hidden sm:block text-left">
            <div className="font-medium text-xs text-ink leading-tight">{displayName}</div>
            <div className="text-[10px] text-muted uppercase tracking-wider leading-tight">{displayRole}</div>
          </div>
        </div>

        <Link
          href="/set-password"
          className="hidden md:inline-flex h-8 items-center justify-center rounded-lg border border-line px-2.5 text-xs font-medium text-muted transition-colors hover:bg-canvas hover:text-ink"
        >
          Password
        </Link>

        <button
          type="button"
          onClick={handleSignOut}
          disabled={logout.isPending}
          className="inline-flex h-8 items-center justify-center rounded-lg border border-line px-3 text-xs font-medium text-muted transition-colors hover:bg-canvas hover:text-ink cursor-pointer"
        >
          {logout.isPending ? 'Signing out...' : 'Sign out'}
        </button>
      </div>
    </header>
  );
}
