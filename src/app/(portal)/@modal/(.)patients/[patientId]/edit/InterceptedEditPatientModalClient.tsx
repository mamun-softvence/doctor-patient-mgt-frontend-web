'use client';

import { useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useMockStore } from '@/lib/mock/store';
import { PatientForm } from '@/features/patients/PatientForm';

export function InterceptedEditPatientModalClient({
  patientId,
}: {
  patientId: string;
}) {
  const router = useRouter();
  const patients = useMockStore((state) => state.patients);
  const patient = patients.find((p) => p.id === patientId);

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

  if (!patient) return null;

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
        aria-labelledby="intercepted-edit-patient-title"
        className="w-full max-w-lg rounded-2xl border border-line bg-white p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 id="intercepted-edit-patient-title" className="text-lg font-semibold text-ink">
              Edit Patient Record
            </h3>
            <p className="text-xs text-muted">Modify treatment status, diagnosis, or reassign doctor.</p>
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
          patientId={patientId}
          initialValues={{
            name: patient.name,
            age: patient.age,
            gender: patient.gender,
            doctorId: patient.doctorId,
            condition: patient.condition,
            status: patient.status,
            admitted: patient.admitted,
            phone: patient.phone || '',
          }}
          mode="edit"
          onSuccess={handleClose}
          onCancel={handleClose}
          submitLabel="Save Changes"
        />
      </div>
    </div>
  );
}

