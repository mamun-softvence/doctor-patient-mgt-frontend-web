'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { patientFormSchema, PatientFormData } from '@/lib/validation/schemas';
import { useMockStore } from '@/lib/mock/store';
import { useUIStore } from '@/lib/store/uiStore';
import { Patient } from '@/types';

interface EditPatientModalProps {
  isOpen: boolean;
  onClose: () => void;
  patient: Patient | null;
}

export function EditPatientModal({ isOpen, onClose, patient }: EditPatientModalProps) {
  const doctors = useMockStore((state) => state.doctors);
  const updatePatient = useMockStore((state) => state.updatePatient);
  const showToast = useUIStore((state) => state.showToast);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PatientFormData>({
    resolver: zodResolver(patientFormSchema),
    defaultValues: {
      name: '',
      age: 30,
      gender: 'male',
      doctorId: '',
      condition: '',
      status: 'Active',
      admitted: '',
      phone: '',
    },
  });

  useEffect(() => {
    if (patient) {
      reset({
        name: patient.name,
        age: patient.age,
        gender: patient.gender,
        doctorId: patient.doctorId,
        condition: patient.condition,
        status: patient.status,
        admitted: patient.admitted,
        phone: patient.phone ?? '',
      });
    }
  }, [patient, reset]);

  if (!isOpen || !patient) return null;

  const onSubmit = (data: PatientFormData) => {
    try {
      const updated = updatePatient(patient.id, data);
      if (updated) {
        showToast(`Patient ${updated.name} updated successfully.`);
      }
      onClose();
    } catch (err) {
      console.error('Failed to update patient', err);
    }
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-patient-title"
        className="w-full max-w-lg rounded-2xl border border-line bg-white p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-start justify-between">
          <div>
            <h3 id="edit-patient-title" className="text-lg font-semibold text-ink">
              Edit Patient Record
            </h3>
            <p className="text-xs text-muted">Update clinical information or reassign to another physician.</p>
          </div>
          <button
            type="button"
            onClick={handleCancel}
            className="rounded-lg p-1 text-muted hover:bg-canvas hover:text-ink transition-colors"
            aria-label="Close dialog"
          >
            <span className="text-xs font-mono bg-canvas px-2 py-0.5 rounded border border-line">esc</span>
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-5 space-y-4">
          <div>
            <label className="block text-xs font-medium text-ink mb-1">
              Full Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              {...register('name')}
              className="w-full h-9 rounded-lg border border-line px-3 text-sm text-ink focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            />
            {errors.name && <p className="mt-1 text-xs text-rose-600">{errors.name.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-ink mb-1">
                Age <span className="text-rose-500">*</span>
              </label>
              <input
                type="number"
                {...register('age', { valueAsNumber: true })}
                className="w-full h-9 rounded-lg border border-line px-3 text-sm text-ink focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              />
              {errors.age && <p className="mt-1 text-xs text-rose-600">{errors.age.message}</p>}
            </div>
            <div>
              <label className="block text-xs font-medium text-ink mb-1">
                Gender <span className="text-rose-500">*</span>
              </label>
              <select
                {...register('gender')}
                className="w-full h-9 rounded-lg border border-line bg-white px-3 text-sm text-ink focus:border-brand-500 focus:outline-none"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {errors.gender && <p className="mt-1 text-xs text-rose-600">{errors.gender.message}</p>}
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-ink mb-1">
              Assigned Doctor (Reassignment) <span className="text-rose-500">*</span>
            </label>
            <select
              {...register('doctorId')}
              className="w-full h-9 rounded-lg border border-line bg-white px-3 text-sm text-ink focus:border-brand-500 focus:outline-none"
            >
              {doctors.map((doc) => (
                <option key={doc.id} value={doc.id}>
                  {doc.name} — {doc.specialty} ({doc.department})
                </option>
              ))}
            </select>
            {errors.doctorId && <p className="mt-1 text-xs text-rose-600">{errors.doctorId.message}</p>}
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-medium text-ink mb-1">
                Medical Condition <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                {...register('condition')}
                className="w-full h-9 rounded-lg border border-line px-3 text-sm text-ink focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              />
              {errors.condition && <p className="mt-1 text-xs text-rose-600">{errors.condition.message}</p>}
            </div>
            <div>
              <label className="block text-xs font-medium text-ink mb-1">
                Status <span className="text-rose-500">*</span>
              </label>
              <select
                {...register('status')}
                className="w-full h-9 rounded-lg border border-line bg-white px-3 text-sm text-ink focus:border-brand-500 focus:outline-none"
              >
                <option value="Active">Active</option>
                <option value="Critical">Critical</option>
                <option value="Recovered">Recovered</option>
              </select>
              {errors.status && <p className="mt-1 text-xs text-rose-600">{errors.status.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-medium text-ink mb-1">
                Admission Date <span className="text-rose-500">*</span>
              </label>
              <input
                type="date"
                {...register('admitted')}
                className="w-full h-9 rounded-lg border border-line px-3 text-sm text-ink focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              />
              {errors.admitted && <p className="mt-1 text-xs text-rose-600">{errors.admitted.message}</p>}
            </div>
            <div>
              <label className="block text-xs font-medium text-ink mb-1">Contact Phone</label>
              <input
                type="text"
                {...register('phone')}
                className="w-full h-9 rounded-lg border border-line px-3 text-sm text-ink focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-line">
            <button
              type="button"
              onClick={handleCancel}
              className="h-9 px-4 rounded-lg border border-line text-xs font-medium text-ink hover:bg-canvas transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center h-9 px-4 rounded-lg bg-brand-600 text-xs font-semibold text-white hover:bg-brand-700 disabled:opacity-50 transition-colors"
            >
              {isSubmitting ? 'Updating...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
