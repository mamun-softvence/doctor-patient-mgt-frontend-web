'use client';

import { useApiQuery } from '@/hooks/use-api-query';
import { keys } from '@/lib/query-keys';
import type {
  DashboardAdmissions,
  DashboardBreakdown,
  DashboardSummary,
  DoctorCaseload,
} from '@/types/models';

export type DashboardRangeParams = {
  range?: '7d' | '30d' | '90d' | '12m' | 'custom';
  from?: string;
  to?: string;
};

/** Headline metrics and period comparisons for the selected date range. */
export function useDashboardSummary(params: DashboardRangeParams = { range: '30d' }) {
  return useApiQuery<DashboardSummary>(
    keys.dashboard.summary(params.range, params.from, params.to),
    '/dashboard/summary',
    { params, staleTime: 30_000 }
  );
}

/** Admissions trend chart series for current and previous period. */
export function useAdmissions(
  params: DashboardRangeParams & { interval?: 'day' | 'week' | 'month' } = { range: '30d' }
) {
  return useApiQuery<DashboardAdmissions>(
    keys.dashboard.admissions(params.range, params.from, params.to),
    '/dashboard/admissions',
    { params, staleTime: 30_000 }
  );
}

/** Top doctors ranked by current patient caseload. */
export function useTopDoctors(limit = 10) {
  return useApiQuery<DoctorCaseload[]>(
    keys.dashboard.topDoctors(),
    '/dashboard/patients-per-doctor',
    { params: { limit }, staleTime: 30_000 }
  );
}

/** Today's patient condition mix and workload by medical specialization. */
export function useBreakdown() {
  return useApiQuery<DashboardBreakdown>(
    keys.dashboard.breakdown(),
    '/dashboard/breakdown',
    { staleTime: 60_000 }
  );
}

