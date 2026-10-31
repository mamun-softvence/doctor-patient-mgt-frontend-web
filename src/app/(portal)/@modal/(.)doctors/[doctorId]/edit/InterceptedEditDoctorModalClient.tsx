'use client';

import { useMockStore } from '@/lib/mock/store';
import { DoctorForm } from '@/features/doctors/DoctorForm';
import { useRouteOverlay } from '@/hooks/useRouteOverlay';

export function InterceptedEditDoctorModalClient({
  doctorId,
}: {
  doctorId: string;
}) {
  const doctors = useMockStore((state) => state.doctors);
  const doctor = doctors.find((d) => d.id === doctorId);
  const { isOpen, isClosing, handleClose } = useRouteOverlay({ exitDuration: 150 });

  if (!doctor) return null;

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
      className={`fixed inset-0 z-50 flex justify-end bg-ink/40 backdrop-blur-xs transition-opacity duration-200 ease-out ${
        isOpen && !isClosing ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-doctor-d-title"
        data-testid="edit-doctor-drawer"
        className={`relative ml-auto flex h-full w-full max-w-md sm:max-w-lg flex-col bg-white shadow-2xl shadow-black/20 will-change-transform ${
          isOpen && !isClosing
            ? 'translate-x-0 transition-transform duration-200 ease-out'
            : 'translate-x-full transition-transform duration-150 ease-in'
        }`}
      >
        <div className="flex items-start justify-between gap-4 border-b border-line px-6 py-5">
          <div>
            <h3 id="edit-doctor-d-title" className="text-lg font-semibold tracking-tight text-ink">
              Edit doctor
            </h3>
            <p className="mt-1 text-sm text-muted">
              Changes show everywhere this doctor appears.
            </p>
          </div>
          <button
            type="button"
            aria-label="Close dialog"
            onClick={handleClose}
            className="inline-grid size-9 shrink-0 place-items-center rounded-lg text-muted transition-colors hover:bg-canvas hover:text-ink -mr-2 -mt-1 cursor-pointer"
          >
            <svg
              className="size-[18px] shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        <DoctorForm
          mode="edit"
          layout="drawer"
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
          onSuccess={handleClose}
          onCancel={handleClose}
          submitLabel="Save changes"
        />
      </div>
    </div>
  );
}
