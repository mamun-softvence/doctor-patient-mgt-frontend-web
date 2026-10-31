'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMockStore } from '@/lib/mock/store';
import { DoctorForm } from '@/features/doctors/DoctorForm';

export function EditDoctorContent({ doctorId }: { doctorId: string }) {
  const router = useRouter();
  const doctors = useMockStore((state) => state.doctors);
  const doctor = doctors.find((d) => d.id === doctorId);

  if (!doctor) {
    return (
      <div className="mx-auto max-w-xl py-12 text-center">
        <h1 className="text-xl font-semibold text-ink">Doctor Not Found</h1>
        <p className="mt-1 text-sm text-muted">The requested doctor record could not be found.</p>
        <Link
          href="/doctors"
          className="mt-4 inline-flex h-9 items-center rounded-lg bg-brand-600 px-4 text-sm font-semibold text-white hover:bg-brand-700"
        >
          Return to Doctors
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl py-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-ink">Edit Doctor Profile</h1>
          <p className="mt-1 text-sm text-muted">Update contact details, hospital affiliation, or specialization.</p>
        </div>
        <Link
          href={`/doctors/${doctorId}`}
          className="text-xs font-medium text-muted hover:text-ink hover:underline"
        >
          &larr; Back to Doctor Profile
        </Link>
      </div>

      <div className="rounded-2xl border border-line bg-white shadow-[0_1px_2px_rgba(16,24,22,0.04)]">
        <DoctorForm
          mode="edit"
          layout="dialog"
          doctorId={doctorId}
          initialValues={{
            name: doctor.name,
            specialty: doctor.specialty,
            hospital: doctor.hospital,
            department: doctor.department,
            email: doctor.email,
            phone: doctor.phone,
            status: doctor.status,
          }}
          onSuccess={() => router.push(`/doctors/${doctorId}`)}
          onCancel={() => router.push(`/doctors/${doctorId}`)}
          submitLabel="Save changes"
        />
      </div>
    </div>
  );
}
