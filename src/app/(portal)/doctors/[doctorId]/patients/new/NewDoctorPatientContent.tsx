'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { PatientForm } from '@/features/patients/PatientForm';

export function NewDoctorPatientContent({ doctorId }: { doctorId: string }) {
  const router = useRouter();

  return (
    <div className="mx-auto max-w-2xl py-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-ink">Register Patient</h1>
          <p className="mt-1 text-sm text-muted">Register a new patient assigned to this doctor.</p>
        </div>
        <Link
          href={`/doctors/${doctorId}`}
          className="text-xs font-medium text-muted hover:text-ink hover:underline"
        >
          &larr; Back to Doctor Profile
        </Link>
      </div>

      <div className="rounded-2xl border border-line bg-white p-6 shadow-[0_1px_2px_rgba(16,24,22,0.04)] sm:p-8">
        <PatientForm
          initialDoctorId={doctorId}
          mode="create"
          onSuccess={() => router.push(`/doctors/${doctorId}`)}
          onCancel={() => router.push(`/doctors/${doctorId}`)}
          submitLabel="Register Patient"
        />
      </div>
    </div>
  );
}

