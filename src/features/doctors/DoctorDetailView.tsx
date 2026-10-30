'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useMockStore } from '@/lib/mock/store';
import { DeletePatientModal } from '@/components/modals/DeletePatientModal';
import { Patient } from '@/types';

interface DoctorDetailViewProps {
  doctorId: string;
}

export function DoctorDetailView({ doctorId }: DoctorDetailViewProps) {
  const doctors = useMockStore((state) => state.doctors);
  const patients = useMockStore((state) => state.patients);

  const [deletingPatient, setDeletingPatient] = useState<Patient | null>(null);

  const doctor = doctors.find((d) => d.id === doctorId);
  const assignedPatients = patients.filter((p) => p.doctorId === doctorId);

  if (!doctor) {
    return (
      <div className="space-y-4 py-12 text-center">
        <h2 className="text-xl font-semibold text-ink">Doctor Not Found</h2>
        <p className="text-sm text-muted">The requested physician profile could not be located.</p>
        <div>
          <Link
            href="/doctors"
            className="inline-flex h-9 items-center justify-center rounded-lg bg-brand-600 px-4 text-xs font-semibold text-white hover:bg-brand-700"
          >
            &larr; Return to Doctors Directory
          </Link>
        </div>
      </div>
    );
  }

  const initials = doctor.name
    .replace('Dr. ', '')
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div className="space-y-6">
      {/* Back link */}
      <div>
        <Link href="/doctors" className="inline-flex items-center gap-1.5 text-xs font-medium text-muted hover:text-ink">
          &larr; Back to Doctors Directory
        </Link>
      </div>

      {/* Doctor Header Card */}
      <div className="rounded-2xl border border-line bg-white p-6 shadow-[0_1px_2px_rgba(16,24,22,0.04)] sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="grid size-14 place-items-center rounded-2xl bg-brand-50 text-brand-700 font-bold text-xl border border-brand-200">
              {initials}
            </span>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-ink" data-testid="doctor-name-heading">
                {doctor.name}
              </h1>
              <p className="text-sm text-muted">
                {doctor.specialty} &bull; {doctor.department} Department
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href={`/doctors/${doctor.id}/patients/new`}
              data-testid="btn-assign-patient"
              className="inline-flex h-9 items-center justify-center rounded-lg bg-brand-600 px-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700 cursor-pointer"
            >
              + Assign Patient
            </Link>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4 border-t border-line pt-6 sm:grid-cols-4 text-sm">
          <div>
            <span className="block text-xs text-muted">ID Reference</span>
            <span className="font-mono text-xs font-semibold text-ink">{doctor.id}</span>
          </div>
          <div>
            <span className="block text-xs text-muted">Email</span>
            <span className="text-xs text-ink">{doctor.email}</span>
          </div>
          <div>
            <span className="block text-xs text-muted">Phone</span>
            <span className="text-xs text-ink">{doctor.phone}</span>
          </div>
          <div>
            <span className="block text-xs text-muted">Caseload</span>
            <span className="text-xs font-semibold text-brand-700" data-testid="doctor-caseload-count">
              {assignedPatients.length} active patients
            </span>
          </div>
        </div>
      </div>

      {/* Assigned Patients Table */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-ink">
            Assigned Patients ({assignedPatients.length})
          </h2>
          <span className="text-xs text-muted">Managing treatment & clinical updates</span>
        </div>

        <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-[0_1px_2px_rgba(16,24,22,0.04)]">
          <table className="w-full text-left text-sm text-ink">
            <thead className="border-b border-line bg-canvas/60 text-xs font-medium text-muted uppercase">
              <tr>
                <th className="px-6 py-3">Patient</th>
                <th className="px-6 py-3">Age / Gender</th>
                <th className="px-6 py-3">Diagnosed Condition</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Admitted Date</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line" data-testid="assigned-patients-body">
              {assignedPatients.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-muted">
                    No patients currently assigned to this doctor. Click &quot;+ Assign Patient&quot; above to register one.
                  </td>
                </tr>
              ) : (
                assignedPatients.map((pat) => (
                  <tr key={pat.id} className="hover:bg-canvas/50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-ink">{pat.name}</td>
                    <td className="px-6 py-4 capitalize">
                      {pat.age} &bull; {pat.gender}
                    </td>
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
      </div>

      {/* Modals */}
      <DeletePatientModal
        isOpen={!!deletingPatient}
        onClose={() => setDeletingPatient(null)}
        patient={deletingPatient}
      />
    </div>
  );
}

