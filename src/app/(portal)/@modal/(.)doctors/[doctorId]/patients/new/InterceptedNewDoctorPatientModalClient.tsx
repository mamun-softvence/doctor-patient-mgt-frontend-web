'use client';

import { useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { PatientForm } from '@/features/patients/PatientForm';

export function InterceptedNewDoctorPatientModalClient({
  doctorId,
}: {
  doctorId: string;
}) {
  const router = useRouter();

  const handleClose = useCallback(() => {
    router.back();
  }, [router]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleClose]);

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="intercepted-add-patient-title"
        className="w-full max-w-lg rounded-2xl border border-line bg-white p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 id="intercepted-add-patient-title" className="text-lg font-semibold text-ink">
              Add Patient
            </h3>
            <p className="text-xs text-muted">Register a new patient and assign to this doctor.</p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="rounded-lg p-1 text-muted hover:bg-canvas hover:text-ink transition-colors"
            aria-label="Close dialog"
          >
            <span className="text-xs font-mono bg-canvas px-2 py-0.5 rounded border border-line">esc</span>
          </button>
        </div>

        <PatientForm
          initialDoctorId={doctorId}
          mode="create"
          onSuccess={handleClose}
          onCancel={handleClose}
          submitLabel="Register Patient"
        />
      </div>
    </div>
  );
}

