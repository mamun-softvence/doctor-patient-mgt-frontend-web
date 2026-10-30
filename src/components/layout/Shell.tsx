import Link from 'next/link';

export function Sidebar() {
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
        <Link
          href="/dashboard"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-ink transition-colors hover:bg-canvas"
        >
          <svg className="size-5 text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
            <rect width="7" height="9" x="3" y="3" rx="1" />
            <rect width="7" height="5" x="14" y="3" rx="1" />
            <rect width="7" height="9" x="14" y="12" rx="1" />
            <rect width="7" height="5" x="3" y="16" rx="1" />
          </svg>
          Dashboard
        </Link>

        <Link
          href="/doctors"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-ink transition-colors hover:bg-canvas"
        >
          <svg className="size-5 text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
          Doctors
        </Link>

        <Link
          href="/patients"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-ink transition-colors hover:bg-canvas"
        >
          <svg className="size-5 text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          Patients
        </Link>

        <Link
          href="/overlays"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-canvas hover:text-ink"
        >
          <svg className="size-5 text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="M3 9h18" />
            <path d="M9 21V9" />
          </svg>
          Dialogs & States
        </Link>
      </nav>
    </aside>
  );
}

export function Header() {
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
        <span className="text-xs font-medium uppercase tracking-wider text-muted">Hospital Administration Portal</span>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 text-sm">
          <span className="size-7 grid place-items-center rounded-full bg-brand-50 text-brand-700 font-semibold text-xs border border-brand-200">
            AD
          </span>
          <span className="hidden sm:inline font-medium text-ink">Admin User</span>
        </div>
        <Link
          href="/login"
          className="inline-flex h-8 items-center justify-center rounded-lg border border-line px-3 text-xs font-medium text-muted transition-colors hover:bg-canvas hover:text-ink"
        >
          Sign out
        </Link>
      </div>
    </header>
  );
}

