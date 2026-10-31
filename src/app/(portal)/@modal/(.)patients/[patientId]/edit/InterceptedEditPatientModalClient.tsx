'use client';

import { useMockStore } from '@/lib/mock/store';
import { PatientForm } from '@/features/patients/PatientForm';
import { useRouteOverlay } from '@/hooks/useRouteOverlay';

export function InterceptedEditPatientModalClient({
  patientId,
}: {
  patientId: string;
}) {
  const patients = useMockStore((state) => state.patients);
  const patient = patients.find((p) => p.id === patientId);
  const { isOpen, isClosing, handleClose } = useRouteOverlay({ exitDuration: 150 });

  if (!patient) return null;

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs transition-opacity duration-200 ease-out ${
        isOpen && !isClosing ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="intercepted-edit-patient-title"
        className={`w-full max-w-lg rounded-2xl border border-line bg-white p-6 shadow-2xl max-h-[90vh] overflow-y-auto will-change-transform will-change-[opacity] ${
          isOpen && !isClosing
            ? 'scale-100 opacity-100 transition-all duration-200 ease-out'
            : 'scale-95 opacity-0 transition-all duration-150 ease-in'
        }`}
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
            className="rounded-lg p-1 text-muted hover:bg-canvas hover:text-ink transition-colors cursor-pointer"
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
