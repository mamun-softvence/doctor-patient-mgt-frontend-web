'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMockStore } from '@/lib/mock/store';
import { parseDoctorFilters, buildQueryString, getDatePresetRange } from '@/lib/url/filters';
import { AddDoctorModal } from '@/components/modals/AddDoctorModal';

export function DoctorsView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Read URL filters
  const filters = parseDoctorFilters(searchParams);

  // Active date preset state
  const [datePreset, setDatePreset] = useState<string>(() => {
    if (filters.from || filters.to) return 'custom';
    return 'all';
  });
  const [fromDate, setFromDate] = useState(filters.from);
  const [toDate, setToDate] = useState(filters.to);

  // Read authoritative data from store
  const allDoctors = useMockStore((state) => state.doctors);
  const allPatients = useMockStore((state) => state.patients);

  // Extract unique specialties and departments for dropdowns
  const specialties = Array.from(new Set(allDoctors.map((d) => d.specialty))).sort();
  const departments = Array.from(new Set(allDoctors.map((d) => d.department))).sort();

  // URL update helper
  const updateUrl = (updates: Record<string, string | number | null | undefined>) => {
    startTransition(() => {
      const current = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : searchParams;
      const newQuery = buildQueryString(current, updates);
      router.replace(`/doctors${newQuery}`);
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

  // Filter doctors based on URL parameters
  const filteredDoctors = allDoctors.filter((doc) => {
    if (filters.search) {
      const q = filters.search.toLowerCase();
      const matchName = doc.name.toLowerCase().includes(q);
      const matchEmail = doc.email.toLowerCase().includes(q);
      const matchSpecialty = doc.specialty.toLowerCase().includes(q);
      if (!matchName && !matchEmail && !matchSpecialty) return false;
    }
    if (filters.specialty && doc.specialty !== filters.specialty) {
      return false;
    }
    if (filters.department && doc.department !== filters.department) {
      return false;
    }
    if (filters.from) {
      const docDate = doc.createdAt ? doc.createdAt.split('T')[0] : '2024-01-01';
      if (docDate < filters.from) return false;
    }
    if (filters.to) {
      const docDate = doc.createdAt ? doc.createdAt.split('T')[0] : '2024-01-01';
      if (docDate > filters.to) return false;
    }
    return true;
  });

  // Pagination
  const totalCount = filteredDoctors.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / filters.limit));
  const currentPage = Math.min(filters.page, totalPages);
  const startIndex = (currentPage - 1) * filters.limit;
  const paginatedDoctors = filteredDoctors.slice(startIndex, startIndex + filters.limit);

  const hasActiveFilters = Boolean(
    filters.search || filters.specialty || filters.department || filters.from || filters.to
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-ink">Doctors Directory</h1>
          <p className="mt-1 text-sm text-muted">
            Manage hospital doctors, specialties, departments, and caseloads.
          </p>
        </div>
        <div>
          <Link
            href="/doctors/new"
            data-testid="btn-add-doctor"
            className="inline-flex h-9 items-center justify-center rounded-lg bg-brand-600 px-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700 cursor-pointer"
          >
            + Add Doctor
          </Link>
        </div>
      </div>

      {/* Filter / Search Bar (stored in URL) */}
      <div className="rounded-2xl border border-line bg-white p-4 shadow-[0_1px_2px_rgba(16,24,22,0.04)] space-y-3">
        <div className="flex flex-col sm:flex-row flex-wrap gap-3">
          <input
            type="text"
            value={filters.search}
            onChange={(e) => updateUrl({ search: e.target.value })}
            placeholder="Search by doctor name, specialty, or email..."
            data-testid="doctor-search-input"
            className="block h-9 min-w-[220px] flex-1 rounded-lg border border-line bg-white px-3 text-sm text-ink placeholder:text-muted/80 focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-500/15"
          />
          <select
            value={filters.specialty}
            onChange={(e) => updateUrl({ specialty: e.target.value })}
            data-testid="doctor-specialty-select"
            className="h-9 rounded-lg border border-line bg-white px-3 text-sm text-ink focus:border-brand-500 focus:outline-none"
          >
            <option value="">All Specialties</option>
            {specialties.map((spec) => (
              <option key={spec} value={spec}>
                {spec}
              </option>
            ))}
          </select>
          <select
            value={filters.department}
            onChange={(e) => updateUrl({ department: e.target.value })}
            data-testid="doctor-department-select"
            className="h-9 rounded-lg border border-line bg-white px-3 text-sm text-ink focus:border-brand-500 focus:outline-none"
          >
            <option value="">All Departments</option>
            {departments.map((dep) => (
              <option key={dep} value={dep}>
                {dep}
              </option>
            ))}
          </select>

          {/* Date Filter Dropdown */}
          <select
            value={datePreset}
            onChange={(e) => handleDatePresetChange(e.target.value)}
            data-testid="doctor-date-preset-select"
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
                updateUrl({ search: '', specialty: '', department: '', from: '', to: '' });
              }}
              data-testid="doctor-reset-filters"
              className="h-9 px-3 text-xs font-medium text-muted hover:text-ink border border-line rounded-lg hover:bg-canvas transition-colors"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Custom Date Range Row */}
        {(datePreset === 'custom' || filters.from || filters.to) && (
          <div className="flex items-center gap-2 pt-2 border-t border-line/60 text-xs text-muted" data-testid="doctor-custom-date-row">
            <span className="font-medium text-ink">From:</span>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => {
                const val = e.target.value;
                setFromDate(val);
                updateUrl({ from: val, to: toDate });
              }}
              data-testid="doctor-date-from"
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
              data-testid="doctor-date-to"
              className="h-8 rounded-md border border-line bg-white px-2 text-xs text-ink focus:border-brand-500 focus:outline-none"
            />
          </div>
        )}
      </div>

      {/* Doctors Table */}
      <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-[0_1px_2px_rgba(16,24,22,0.04)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-ink">
            <thead className="border-b border-line bg-canvas/60 text-xs font-medium text-muted uppercase">
              <tr>
                <th className="px-6 py-3">Doctor</th>
                <th className="px-6 py-3">Specialty</th>
                <th className="px-6 py-3">Department</th>
                <th className="px-6 py-3">Patients</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line" data-testid="doctors-table-body">
              {paginatedDoctors.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-muted">
                    No doctors found matching the search criteria.
                  </td>
                </tr>
              ) : (
                paginatedDoctors.map((doc) => {
                  const patientCount = allPatients.filter((p) => p.doctorId === doc.id).length;
                  return (
                    <tr key={doc.id} className="hover:bg-canvas/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-semibold text-ink">{doc.name}</div>
                        <div className="text-xs text-muted">{doc.email}</div>
                      </td>
                      <td className="px-6 py-4">{doc.specialty}</td>
                      <td className="px-6 py-4">{doc.department}</td>
                      <td className="px-6 py-4">
                        <span className="font-medium text-brand-700 bg-brand-50 px-2 py-0.5 rounded-full text-xs">
                          {patientCount} active
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${
                            doc.status === 'Active'
                              ? 'bg-emerald-50 text-emerald-700 ring-emerald-600/20'
                              : 'bg-zinc-50 text-zinc-600 ring-zinc-500/20'
                          }`}
                        >
                          {doc.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link
                          href={`/doctors/${doc.id}`}
                          className="font-medium text-brand-600 hover:text-brand-700 hover:underline"
                        >
                          View Details &rarr;
                        </Link>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-line px-6 py-3 text-xs text-muted">
            <span>
              Showing {startIndex + 1}–{Math.min(startIndex + filters.limit, totalCount)} of {totalCount} doctors
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

      {/* Add Doctor Modal */}
      <AddDoctorModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
    </div>
  );
}
