'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useMockStore, computeDashboardStats } from '@/lib/mock/store';
import { useDashboardSummary, useBreakdown, useAdmissions, useTopDoctors } from './hooks';

export function DashboardView() {
  // TanStack Query API hooks
  useDashboardSummary({ range: '30d' });
  const { data: breakdownData } = useBreakdown();
  const { data: admissionsData } = useAdmissions({ range: '30d' });
  const { data: topDoctorsData } = useTopDoctors(5);

  // Authoritative fallback mock store
  const doctors = useMockStore((state) => state.doctors);
  const patients = useMockStore((state) => state.patients);
  const localStats = useMemo(() => computeDashboardStats(doctors, patients), [doctors, patients]);

  // Authoritative metrics derived from the single source of truth (Rule 7)
  const totalDoctors = localStats.totalDoctors;
  const activeDoctors = localStats.activeDoctors;
  const totalPatients = localStats.totalPatients;
  const criticalPatients = localStats.criticalPatients;
  const recoveredPatients = localStats.recoveredPatients;
  const avgPatientsPerDoctor =
    totalDoctors > 0 ? (totalPatients / totalDoctors).toFixed(1) : '0';

  const currentAdmissions = admissionsData?.current;
  const previousAdmissions = admissionsData?.previous;
  const trend = localStats.admissionsTrend;

  // Format admissions trend for chart
  const chartData = useMemo(() => {
    if (currentAdmissions && currentAdmissions.length > 0) {
      return currentAdmissions.map((item, idx) => ({
        date: item.date.slice(5), // MM-DD
        admissions: item.count,
        previous: previousAdmissions?.[idx]?.count ?? 0,
      }));
    }
    return trend.map((item) => ({
      date: item.date.slice(5),
      admissions: item.count,
      previous: Math.max(0, item.count - 1),
    }));
  }, [currentAdmissions, previousAdmissions, trend]);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-ink">Dashboard</h1>
          <p className="mt-1 text-sm text-muted">
            Overview of clinical operations, patient intake, and staff distribution.
          </p>
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
            <span className="text-2xl font-semibold text-ink" data-testid="kpi-total-doctors">
              {totalDoctors}
            </span>
            <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
              {activeDoctors} Active
            </span>
          </div>
          <p className="mt-1 text-xs text-muted">Active healthcare specialists</p>
        </div>

        <div className="rounded-2xl border border-line bg-white p-5 shadow-[0_1px_2px_rgba(16,24,22,0.04)]">
          <p className="text-xs font-medium uppercase tracking-wider text-muted">Total Patients</p>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-semibold text-ink" data-testid="kpi-total-patients">
              {totalPatients}
            </span>
            <span className="inline-flex items-center rounded-full bg-sky-50 px-2 py-0.5 text-xs font-medium text-sky-800 ring-1 ring-inset ring-sky-600/20">
              Assigned
            </span>
          </div>
          <p className="mt-1 text-xs text-muted">Avg {avgPatientsPerDoctor} patients / doctor</p>
        </div>

        <div className="rounded-2xl border border-line bg-white p-5 shadow-[0_1px_2px_rgba(16,24,22,0.04)]">
          <p className="text-xs font-medium uppercase tracking-wider text-muted">Critical Cases</p>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-semibold text-rose-600" data-testid="kpi-critical-patients">
              {criticalPatients}
            </span>
            <span className="inline-flex items-center rounded-full bg-rose-50 px-2 py-0.5 text-xs font-medium text-rose-700 ring-1 ring-inset ring-rose-600/20">
              High Priority
            </span>
          </div>
          <p className="mt-1 text-xs text-muted">Immediate care required</p>
        </div>

        <div className="rounded-2xl border border-line bg-white p-5 shadow-[0_1px_2px_rgba(16,24,22,0.04)]">
          <p className="text-xs font-medium uppercase tracking-wider text-muted">Recovered Cases</p>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-semibold text-ink" data-testid="kpi-recovered-patients">
              {recoveredPatients}
            </span>
            <span className="inline-flex items-center rounded-full bg-brand-50 px-2 py-0.5 text-xs font-medium text-brand-700 ring-1 ring-inset ring-brand-200">
              Discharged
            </span>
          </div>
          <p className="mt-1 text-xs text-muted">Discharged or completed cycle</p>
        </div>
      </div>

      {/* Admissions Trend Chart */}
      <div className="rounded-2xl border border-line bg-white p-6 shadow-[0_1px_2px_rgba(16,24,22,0.04)]">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-ink">Admissions Trend</h2>
            <p className="mt-0.5 text-xs text-muted">Daily patient intake across the last 30 days.</p>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="size-2.5 rounded-full bg-brand-600" />
              <span className="text-muted">Current Period</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="size-2.5 rounded-full bg-line" />
              <span className="text-muted">Previous Period</span>
            </div>
          </div>
        </div>
        <div className="mt-6 h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="admissionsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#14897E" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#14897E" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E1E7E4" />
              <XAxis dataKey="date" stroke="#5E6C67" fontSize={11} tickLine={false} />
              <YAxis stroke="#5E6C67" fontSize={11} tickLine={false} allowDecimals={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#ffffff',
                  borderColor: '#E1E7E4',
                  borderRadius: '0.75rem',
                  fontSize: '0.75rem',
                }}
              />
              <Area
                type="monotone"
                dataKey="admissions"
                stroke="#14897E"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#admissionsGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Analytics Section Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Specialty Distribution */}
        <div className="rounded-2xl border border-line bg-white p-6 shadow-[0_1px_2px_rgba(16,24,22,0.04)]">
          <h2 className="text-base font-semibold text-ink">Specialty Distribution</h2>
          <p className="mt-0.5 text-xs text-muted">Distribution of active medical specialists.</p>
          <div className="mt-6 space-y-3">
            {breakdownData?.bySpecialization && breakdownData.bySpecialization.length > 0
              ? breakdownData.bySpecialization.map((s) => {
                  const pct = totalDoctors > 0 ? Math.round((s.doctors / totalDoctors) * 100) : 0;
                  return (
                    <div key={s.specialization}>
                      <div className="flex justify-between text-xs text-ink mb-1">
                        <span className="font-medium">{s.specialization}</span>
                        <span className="text-muted">
                          {s.doctors} doctors ({pct}%) &bull; {s.patients} patients
                        </span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-canvas overflow-hidden">
                        <div
                          className="h-full bg-brand-600 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min(100, Math.max(4, pct))}%` }}
                        />
                      </div>
                    </div>
                  );
                })
              : localStats.specialtyBreakdown.map((s) => {
                  const pct =
                    localStats.totalDoctors > 0
                      ? Math.round((s.doctorCount / localStats.totalDoctors) * 100)
                      : 0;
                  return (
                    <div key={s.specialty}>
                      <div className="flex justify-between text-xs text-ink mb-1">
                        <span className="font-medium">{s.specialty}</span>
                        <span className="text-muted">
                          {s.doctorCount} doctors ({pct}%) &bull; {s.patientCount} patients
                        </span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-canvas overflow-hidden">
                        <div
                          className="h-full bg-brand-600 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min(100, Math.max(4, pct))}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
          </div>
        </div>

        {/* Top Doctors / Caseload Status */}
        <div className="rounded-2xl border border-line bg-white p-6 shadow-[0_1px_2px_rgba(16,24,22,0.04)]">
          <h2 className="text-base font-semibold text-ink">Top Doctor Caseloads</h2>
          <p className="mt-0.5 text-xs text-muted">Doctors handling active inpatient caseloads.</p>
          <div className="mt-6 space-y-3">
            {topDoctorsData && topDoctorsData.length > 0 ? (
              topDoctorsData.map((doc) => (
                <div
                  key={doc.doctorId}
                  className="flex items-center justify-between rounded-xl border border-line p-3"
                >
                  <div>
                    <Link
                      href={`/doctors/${doc.doctorId}`}
                      className="font-medium text-sm text-ink hover:text-brand-600 transition-colors"
                    >
                      {doc.name}
                    </Link>
                    <p className="text-xs text-muted">{doc.specialization}</p>
                  </div>
                  <span className="inline-flex items-center rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-semibold text-brand-700">
                    {doc.count} patients
                  </span>
                </div>
              ))
            ) : (
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="rounded-xl border border-line p-4">
                  <span className="block text-2xl font-bold text-ink">{localStats.activePatients}</span>
                  <span className="text-xs text-muted">Active Treatment</span>
                </div>
                <div className="rounded-xl border border-line p-4">
                  <span className="block text-2xl font-bold text-emerald-700">
                    {localStats.recoveredPatients}
                  </span>
                  <span className="text-xs text-muted">Recovered</span>
                </div>
                <div className="rounded-xl border border-line p-4">
                  <span className="block text-2xl font-bold text-rose-600">
                    {localStats.criticalPatients}
                  </span>
                  <span className="text-xs text-muted">Critical</span>
                </div>
              </div>
            )}
          </div>
          <div className="mt-6 rounded-xl border border-dashed border-line p-4 text-xs text-muted">
            <p className="font-medium text-ink mb-1">Clinic Summary</p>
            All {totalPatients} patients are registered in active clinical management.
          </div>
        </div>
      </div>
    </div>
  );
}
