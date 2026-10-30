import Link from 'next/link';

export const metadata = {
  title: 'Dashboard | Doctor Tracker',
};

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-ink">Dashboard</h1>
          <p className="mt-1 text-sm text-muted">Overview of clinical operations, patient intake, and staff distribution.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/doctors"
            className="inline-flex h-9 items-center justify-center rounded-lg border border-line bg-white px-3.5 text-sm font-medium text-ink transition-colors hover:bg-canvas"
          >
            Manage Doctors
          </Link>
          <Link
            href="/patients"
            className="inline-flex h-9 items-center justify-center rounded-lg bg-brand-600 px-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
          >
            Manage Patients
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-line bg-white p-5 shadow-[0_1px_2px_rgba(16,24,22,0.04)]">
          <p className="text-xs font-medium uppercase tracking-wider text-muted">Total Doctors</p>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-semibold text-ink">12</span>
            <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
              Active
            </span>
          </div>
          <p className="mt-1 text-xs text-muted">Across 6 hospital departments</p>
        </div>

        <div className="rounded-2xl border border-line bg-white p-5 shadow-[0_1px_2px_rgba(16,24,22,0.04)]">
          <p className="text-xs font-medium uppercase tracking-wider text-muted">Total Patients</p>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-semibold text-ink">60</span>
            <span className="inline-flex items-center rounded-full bg-sky-50 px-2 py-0.5 text-xs font-medium text-sky-800 ring-1 ring-inset ring-sky-600/20">
              Assigned
            </span>
          </div>
          <p className="mt-1 text-xs text-muted">Avg 5.0 patients / doctor</p>
        </div>

        <div className="rounded-2xl border border-line bg-white p-5 shadow-[0_1px_2px_rgba(16,24,22,0.04)]">
          <p className="text-xs font-medium uppercase tracking-wider text-muted">Critical Cases</p>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-semibold text-rose-600">8</span>
            <span className="inline-flex items-center rounded-full bg-rose-50 px-2 py-0.5 text-xs font-medium text-rose-700 ring-1 ring-inset ring-rose-600/20">
              High Priority
            </span>
          </div>
          <p className="mt-1 text-xs text-muted">Immediate care required</p>
        </div>

        <div className="rounded-2xl border border-line bg-white p-5 shadow-[0_1px_2px_rgba(16,24,22,0.04)]">
          <p className="text-xs font-medium uppercase tracking-wider text-muted">Recovered This Month</p>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-semibold text-ink">14</span>
            <span className="inline-flex items-center rounded-full bg-brand-50 px-2 py-0.5 text-xs font-medium text-brand-700 ring-1 ring-inset ring-brand-200">
              Discharged
            </span>
          </div>
          <p className="mt-1 text-xs text-muted">+18% compared to last month</p>
        </div>
      </div>

      {/* Analytics Section Preview */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-line bg-white p-6 shadow-[0_1px_2px_rgba(16,24,22,0.04)]">
          <h2 className="text-base font-semibold text-ink">Specialty Distribution</h2>
          <p className="mt-0.5 text-xs text-muted">Distribution of active medical specialists.</p>
          <div className="mt-6 space-y-3">
            {[
              { label: 'Cardiology', count: 3, pct: '25%' },
              { label: 'Neurology', count: 2, pct: '17%' },
              { label: 'Pediatrics', count: 2, pct: '17%' },
              { label: 'Orthopedics', count: 2, pct: '17%' },
              { label: 'Oncology', count: 2, pct: '17%' },
              { label: 'Other Specialties', count: 1, pct: '8%' },
            ].map((s) => (
              <div key={s.label}>
                <div className="flex justify-between text-xs text-ink mb-1">
                  <span>{s.label}</span>
                  <span className="text-muted">{s.count} doctors ({s.pct})</span>
                </div>
                <div className="h-2 w-full rounded-full bg-canvas overflow-hidden">
                  <div className="h-full bg-brand-600 rounded-full" style={{ width: s.pct }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-line bg-white p-6 shadow-[0_1px_2px_rgba(16,24,22,0.04)]">
          <h2 className="text-base font-semibold text-ink">Patient Demographics</h2>
          <p className="mt-0.5 text-xs text-muted">Breakdown by status and gender allocation.</p>
          <div className="mt-6 grid grid-cols-3 gap-3 text-center">
            <div className="rounded-xl border border-line p-4">
              <span className="block text-2xl font-bold text-ink">38</span>
              <span className="text-xs text-muted">Active Treatment</span>
            </div>
            <div className="rounded-xl border border-line p-4">
              <span className="block text-2xl font-bold text-emerald-700">14</span>
              <span className="text-xs text-muted">Recovered</span>
            </div>
            <div className="rounded-xl border border-line p-4">
              <span className="block text-2xl font-bold text-rose-600">8</span>
              <span className="text-xs text-muted">Critical</span>
            </div>
          </div>
          <div className="mt-6 rounded-xl border border-dashed border-line p-4 text-xs text-muted">
            <p className="font-medium text-ink mb-1">Clinic Summary</p>
            All 60 patients currently linked with active doctor caseloads. No unassigned admissions pending review.
          </div>
        </div>
      </div>
    </div>
  );
}

