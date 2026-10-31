'use client';

import { useState, useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useMockStore } from '@/lib/mock/store';
import { parsePatientFilters, buildQueryString, getDatePresetRange } from '@/lib/url/filters';
import { AddPatientModal } from '@/components/modals/AddPatientModal';
import { EditPatientModal } from '@/components/modals/EditPatientModal';
import { DeletePatientModal } from '@/components/modals/DeletePatientModal';
import { Patient } from '@/types';

export function PatientsView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
  const [deletingPatient, setDeletingPatient] = useState<Patient | null>(null);

  // Read URL filters
  const filters = parsePatientFilters(searchParams);

  // Active date preset state
  const [datePreset, setDatePreset] = useState<string>(() => {
    if (filters.from || filters.to) return 'custom';
    return 'all';
  });
  const [fromDate, setFromDate] = useState(filters.from);
  const [toDate, setToDate] = useState(filters.to);

  // Authoritative data from store
  const allPatients = useMockStore((state) => state.patients);
  const allDoctors = useMockStore((state) => state.doctors);

  // URL update helper
  const updateUrl = (updates: Record<string, string | number | null | undefined>) => {
    startTransition(() => {
      const current = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : searchParams;
      const newQuery = buildQueryString(current, updates);
      router.replace(`/patients${newQuery}`);
    });
  };

  const handleDatePresetChange = (preset: string) => {
    setDatePreset(preset);
    if (preset === 'all') {
      setFromDate('');
      setToDate('');
      updateUrl({ from: '', to: '' });
    } else if (preset === '7d' || preset === '30d') {
      const range = getDatePresetRange(preset);
      setFromDate(range.from);
      setToDate(range.to);
      updateUrl({ from: range.from, to: range.to });
    }
  };

  // Filter patients based on URL search params
  const filteredPatients = allPatients.filter((pat) => {
    if (filters.search) {
      const q = filters.search.toLowerCase();
      const matchName = pat.name.toLowerCase().includes(q);
      const matchCondition = pat.condition.toLowerCase().includes(q);
      const matchDoctor = pat.doctorName.toLowerCase().includes(q);
      if (!matchName && !matchCondition && !matchDoctor) return false;
    }
    if (filters.status && pat.status !== filters.status) {
      return false;
    }
    if (filters.doctorId && pat.doctorId !== filters.doctorId) {
      return false;
    }
    if (filters.condition && !pat.condition.toLowerCase().includes(filters.condition.toLowerCase())) {
      return false;
    }

    // Dual Match date filtering: matches either admissionDate OR createdAt within range
    const admittedDate = pat.admitted ? pat.admitted.split('T')[0] : '';
    const createdDate = pat.createdAt ? pat.createdAt.split('T')[0] : '';

    if (filters.from) {
      const matchFrom = (admittedDate && admittedDate >= filters.from) || (createdDate && createdDate >= filters.from);
      if (!matchFrom) return false;
    }
    if (filters.to) {
      const matchTo = (admittedDate && admittedDate <= filters.to) || (createdDate && createdDate <= filters.to);
      if (!matchTo) return false;
    }

    return true;
  });

  // Pagination
  const totalCount = filteredPatients.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / filters.limit));
  const currentPage = Math.min(filters.page, totalPages);
  const startIndex = (currentPage - 1) * filters.limit;
  const paginatedPatients = filteredPatients.slice(startIndex, startIndex + filters.limit);

  const hasActiveFilters = Boolean(
    filters.search || filters.status || filters.doctorId || filters.condition || filters.from || filters.to
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-ink">Patients Roster</h1>
          <p className="mt-1 text-sm text-muted">
            Complete patient directory, medical conditions, and assigned doctors.
          </p>
        </div>
        <div>
          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            data-testid="btn-add-patient"
            className="inline-flex h-9 items-center justify-center rounded-lg bg-brand-600 px-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700 cursor-pointer"
          >
            + Add Patient
          </button>
        </div>
      </div>

      {/* Filter / Search Bar */}
      <div className="rounded-2xl border border-line bg-white p-4 shadow-[0_1px_2px_rgba(16,24,22,0.04)] space-y-3">
        <div className="flex flex-col sm:flex-row flex-wrap gap-3">
          <input
            type="text"
            value={filters.search}
            onChange={(e) => updateUrl({ search: e.target.value })}
            placeholder="Search by patient name, condition, or doctor..."
            data-testid="patient-search-input"
            className="block h-9 min-w-[220px] flex-1 rounded-lg border border-line bg-white px-3 text-sm text-ink placeholder:text-muted/80 focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-500/15"
          />
          <select
            value={filters.status}
            onChange={(e) => updateUrl({ status: e.target.value })}
            data-testid="patient-status-select"
            className="h-9 rounded-lg border border-line bg-white px-3 text-sm text-ink focus:border-brand-500 focus:outline-none"
          >
            <option value="">All Statuses</option>
            <option value="Active">Active Treatment</option>
            <option value="Critical">Critical</option>
            <option value="Recovered">Recovered</option>
          </select>
          <select
            value={filters.doctorId}
            onChange={(e) => updateUrl({ doctorId: e.target.value })}
            data-testid="patient-doctor-select"
            className="h-9 rounded-lg border border-line bg-white px-3 text-sm text-ink focus:border-brand-500 focus:outline-none"
          >
            <option value="">All Assigned Doctors</option>
            {allDoctors.map((doc) => (
              <option key={doc.id} value={doc.id}>
                {doc.name}
              </option>
            ))}
          </select>

          {/* Date Filter Dropdown */}
          <select
            value={datePreset}
            onChange={(e) => handleDatePresetChange(e.target.value)}
            data-testid="patient-date-preset-select"
            className="h-9 rounded-lg border border-line bg-white px-3 text-sm text-ink focus:border-brand-500 focus:outline-none"
          >
            <option value="all">All Dates</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="custom">Custom Range...</option>
          </select>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={() => {
                setDatePreset('all');
                setFromDate('');
                setToDate('');
                updateUrl({ search: '', status: '', doctorId: '', condition: '', from: '', to: '' });
              }}
              data-testid="patient-reset-filters"
              className="h-9 px-3 text-xs font-medium text-muted hover:text-ink border border-line rounded-lg hover:bg-canvas transition-colors"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Custom Date Range Row */}
        {(datePreset === 'custom' || filters.from || filters.to) && (
          <div className="flex items-center gap-2 pt-2 border-t border-line/60 text-xs text-muted" data-testid="patient-custom-date-row">
            <span className="font-medium text-ink">From:</span>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => {
                const val = e.target.value;
                setFromDate(val);
                updateUrl({ from: val, to: toDate });
              }}
              data-testid="patient-date-from"
              className="h-8 rounded-md border border-line bg-white px-2 text-xs text-ink focus:border-brand-500 focus:outline-none"
            />
            <span className="font-medium text-ink">To:</span>
            <input
              type="date"
              value={toDate}
              onChange={(e) => {
                const val = e.target.value;
                setToDate(val);
                updateUrl({ from: fromDate, to: val });
              }}
              data-testid="patient-date-to"
              className="h-8 rounded-md border border-line bg-white px-2 text-xs text-ink focus:border-brand-500 focus:outline-none"
            />
          </div>
        )}
      </div>

      {/* Patients Table */}
      <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-[0_1px_2px_rgba(16,24,22,0.04)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-ink">
            <thead className="border-b border-line bg-canvas/60 text-xs font-medium text-muted uppercase">
              <tr>
                <th className="px-6 py-3">Patient</th>
                <th className="px-6 py-3">Age / Gender</th>
                <th className="px-6 py-3">Assigned Doctor</th>
                <th className="px-6 py-3">Condition</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Admitted</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line" data-testid="patients-table-body">
              {paginatedPatients.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-muted">
                    No patients found matching the search criteria.
                  </td>
                </tr>
              ) : (
                paginatedPatients.map((pat) => (
                  <tr key={pat.id} className="hover:bg-canvas/50 transition-colors" data-testid={`patient-row-${pat.id}`}>
                    <td className="px-6 py-4 font-semibold text-ink">{pat.name}</td>
                    <td className="px-6 py-4 capitalize">
                      {pat.age} &bull; {pat.gender}
                    </td>
                    <td className="px-6 py-4 text-brand-700 font-medium">{pat.doctorName}</td>
                    <td className="px-6 py-4">{pat.condition}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${
                          pat.status === 'Critical'
                            ? 'bg-rose-50 text-rose-700 ring-rose-600/20'
                            : pat.status === 'Recovered'
                            ? 'bg-brand-50 text-brand-700 ring-brand-200'
                            : 'bg-emerald-50 text-emerald-700 ring-emerald-600/20'
                        }`}
                      >
                        {pat.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-muted">{pat.admitted}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/patients/${pat.id}/edit`}
                          role="button"
                          data-testid={`btn-edit-patient-${pat.id}`}
                          className="font-medium text-brand-600 hover:text-brand-700 text-xs hover:underline cursor-pointer"
                        >
                          Edit
                        </Link>
                        <span className="text-line">|</span>
                        <button
                          type="button"
                          onClick={() => setDeletingPatient(pat)}
                          data-testid={`btn-delete-patient-${pat.id}`}
                          className="font-medium text-rose-600 hover:text-rose-700 text-xs hover:underline cursor-pointer"
                        >
                          Delete
                        </button>
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
            <span>
              Showing {startIndex + 1}–{Math.min(startIndex + filters.limit, totalCount)} of {totalCount} patients
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                disabled={currentPage <= 1}
                onClick={() => updateUrl({ page: currentPage - 1 })}
                className="rounded px-2.5 py-1 border border-line hover:bg-canvas disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <span className="px-2 font-medium text-ink">
                Page {currentPage} of {totalPages}
              </span>
              <button
                type="button"
                disabled={currentPage >= totalPages}
                onClick={() => updateUrl({ page: currentPage + 1 })}
                className="rounded px-2.5 py-1 border border-line hover:bg-canvas disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <AddPatientModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
      <EditPatientModal
        isOpen={!!editingPatient}
        onClose={() => setEditingPatient(null)}
        patient={editingPatient}
      />
      <DeletePatientModal
        isOpen={!!deletingPatient}
        onClose={() => setDeletingPatient(null)}
        patient={deletingPatient}
      />
    </div>
  );
}
