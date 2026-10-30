'use client';

import { Suspense, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useCurrentUser } from '@/features/auth/hooks';
import { useAuditLogs } from '@/features/audit/hooks';

function AuditLogsContent() {
  const { data: me, isPending: mePending } = useCurrentUser();
  const searchParams = useSearchParams();

  const [entityType, setEntityType] = useState(searchParams.get('entityType') || '');
  const [entityId] = useState(searchParams.get('entityId') || '');
  const [actionFilter, setActionFilter] = useState('');
  const [page, setPage] = useState(1);

  const { data: auditData, isPending: auditPending } = useAuditLogs({
    entityType: entityType || undefined,
    entityId: entityId || undefined,
    action: actionFilter || undefined,
    page,
    limit: 15,
  });

  if (!mePending && me && me.role !== 'admin') {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="size-12 rounded-full bg-rose-50 grid place-items-center text-rose-600 mb-4">
          <svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
          </svg>
        </div>
        <h1 className="text-xl font-semibold text-ink">Admins Only</h1>
        <p className="mt-1 text-sm text-muted max-w-sm">
          Audit logs are restricted to system administrators.
        </p>
        <Link
          href="/dashboard"
          className="mt-4 inline-flex h-9 items-center rounded-lg bg-brand-600 px-4 text-sm font-semibold text-white hover:bg-brand-700"
        >
          Return to Dashboard
        </Link>
      </div>
    );
  }

  const logs = auditData?.data ?? [];
  const totalPages = auditData?.meta?.totalPages ?? 1;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-ink">Audit Logs</h1>
        <p className="mt-1 text-sm text-muted">
          Chronological audit trail of clinical activities, user authentications, and record modifications.
        </p>
        {entityId && (
          <div className="mt-2 inline-flex items-center gap-2 rounded-lg bg-brand-50 px-3 py-1 text-xs text-brand-700">
            <span>Filtered for entity ID: <code className="font-mono font-medium">{entityId}</code></span>
            <Link href="/audit-logs" className="font-semibold underline ml-1">
              Clear Filter
            </Link>
          </div>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 rounded-2xl border border-line bg-white p-4 shadow-[0_1px_2px_rgba(16,24,22,0.04)]">
        <select
          value={entityType}
          onChange={(e) => setEntityType(e.target.value)}
          className="h-9 rounded-lg border border-line bg-white px-3 text-sm text-ink focus:border-brand-500 focus:outline-none"
        >
          <option value="">All Entities</option>
          <option value="patient">Patient</option>
          <option value="doctor">Doctor</option>
          <option value="user">User</option>
          <option value="auth">Auth</option>
        </select>
        <input
          type="text"
          value={actionFilter}
          onChange={(e) => setActionFilter(e.target.value)}
          placeholder="Filter by action (e.g. update, create, delete)..."
          className="block h-9 flex-1 rounded-lg border border-line bg-white px-3 text-sm text-ink placeholder:text-muted/80 focus:border-brand-500 focus:outline-none"
        />
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-[0_1px_2px_rgba(16,24,22,0.04)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-ink">
            <thead className="border-b border-line bg-canvas/60 text-xs font-medium text-muted uppercase">
              <tr>
                <th className="px-6 py-3">Timestamp</th>
                <th className="px-6 py-3">Actor</th>
                <th className="px-6 py-3">Action</th>
                <th className="px-6 py-3">Entity</th>
                <th className="px-6 py-3">Changed Fields</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {auditPending ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-muted">
                    Loading audit trail...
                  </td>
                </tr>
              ) : logs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-muted">
                    No audit records found matching criteria.
                  </td>
                </tr>
              ) : (
                logs.map((log) => (
                  <tr key={log.id} className="hover:bg-canvas/50 transition-colors">
                    <td className="px-6 py-4 text-xs font-mono text-muted whitespace-nowrap">
                      {new Date(log.at).toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-semibold text-ink">{log.actor.name}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-mono font-medium text-zinc-700">
                        {log.action}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs">
                      <span className="font-medium uppercase text-muted mr-1.5">{log.entityType}:</span>
                      {log.entityType === 'doctor' ? (
                        <Link
                          href={`/doctors/${log.entityId}`}
                          className="font-mono text-brand-600 hover:underline"
                        >
                          {log.entityId}
                        </Link>
                      ) : (
                        <code className="font-mono text-ink">{log.entityId}</code>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {log.fields && log.fields.length > 0 ? (
                          log.fields.map((field) => (
                            <span
                              key={field}
                              className="rounded bg-canvas px-1.5 py-0.5 text-[11px] font-mono border border-line text-muted"
                            >
                              {field}
                            </span>
                          ))
                        ) : (
                          <span className="text-xs text-muted/60">—</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-line px-6 py-3 text-xs text-muted">
            <span>Page {page} of {totalPages}</span>
            <div className="flex gap-1">
              <button
                type="button"
                disabled={page <= 1}
                onClick={() => setPage(page - 1)}
                className="rounded px-2.5 py-1 border border-line hover:bg-canvas disabled:opacity-40"
              >
                Previous
              </button>
              <button
                type="button"
                disabled={page >= totalPages}
                onClick={() => setPage(page + 1)}
                className="rounded px-2.5 py-1 border border-line hover:bg-canvas disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AuditLogsPage() {
  return (
    <Suspense fallback={<div className="h-64 animate-pulse bg-muted/10 rounded-2xl" />}>
      <AuditLogsContent />
    </Suspense>
  );
}

