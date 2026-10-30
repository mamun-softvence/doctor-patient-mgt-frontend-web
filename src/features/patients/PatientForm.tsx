'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { patientFormSchema, PatientFormData } from '@/lib/validation/schemas';
import { useAddPatient, useUpdatePatient } from './hooks';
import { useMockStore } from '@/lib/mock/store';
import { useUIStore } from '@/lib/store/uiStore';
import type { Condition, Gender } from '@/types/models';

interface PatientFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
  initialValues?: Partial<PatientFormData>;
  initialDoctorId?: string;
  patientId?: string;
  version?: number;
  mode?: 'create' | 'edit';
  submitLabel?: string;
}

export function PatientForm({
  onSuccess,
  onCancel,
  initialValues,
  initialDoctorId,
  patientId,
  version = 1,
  mode = 'create',
  submitLabel,
}: PatientFormProps) {
  const doctors = useMockStore((state) => state.doctors);
  const addPatient = useMockStore((state) => state.addPatient);
  const updatePatientStore = useMockStore((state) => state.updatePatient);
  const showToast = useUIStore((state) => state.showToast);

  const defaultDoctor =
    initialDoctorId || initialValues?.doctorId || (doctors.length > 0 ? doctors[0].id : '');

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<PatientFormData>({
    resolver: zodResolver(patientFormSchema),
    defaultValues: {
      name: initialValues?.name || '',
      age: initialValues?.age || 35,
      gender: initialValues?.gender || 'male',
      doctorId: defaultDoctor,
      condition: initialValues?.condition || '',
      status: initialValues?.status || 'Active',
      admitted: initialValues?.admitted || '',
      phone: initialValues?.phone || '',
    },
  });

  const addPatientMutation = useAddPatient(defaultDoctor);
  const updatePatientMutation = useUpdatePatient();

  useEffect(() => {
    if (!initialValues?.admitted) {
      setValue('admitted', new Date().toISOString().split('T')[0]);
    }
  }, [initialValues?.admitted, setValue]);

  const onSubmit = async (data: PatientFormData) => {
    try {
      if (mode === 'create') {
        await addPatientMutation.mutateAsync({
          name: data.name,
          age: data.age,
          gender: data.gender as Gender,
          phone: data.phone || '+1-555-0000',
          condition: (data.status === 'Critical' ? 'critical' : 'stable') as Condition,
          admissionDate: data.admitted,
        }).catch(() => {
          // Fallback if API offline
        });

        const created = addPatient(data);
        showToast(`Patient ${created.name} successfully registered.`);
      } else if (patientId) {
        await updatePatientMutation.mutateAsync({
          id: patientId,
          version,
          previousDoctorId: defaultDoctor,
          changes: {
            name: data.name,
            age: data.age,
            gender: data.gender as Gender,
            phone: data.phone,
            condition: (data.status === 'Critical' ? 'critical' : 'stable') as Condition,
            admissionDate: data.admitted,
            doctorId: data.doctorId,
          },
        }).catch(() => {
          // Fallback if API offline
        });

        updatePatientStore(patientId, data);
        showToast(`Patient ${data.name} updated successfully.`);
      }

      reset();
      onSuccess?.();
    } catch (err) {
      console.error('Failed to save patient', err);
    }
  };

  const buttonText =
    submitLabel || (mode === 'create' ? 'Register Patient' : 'Save Changes');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-xs font-medium text-ink mb-1">
          Full Name <span className="text-rose-500">*</span>
        </label>
        <input
          type="text"
          placeholder="e.g. Eleanor Vance"
          {...register('name')}
          className="w-full h-9 rounded-lg border border-line bg-white px-3 text-sm text-ink placeholder:text-muted/70 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
        />
        {errors.name && <p className="mt-1 text-xs text-rose-600">{errors.name.message}</p>}
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <label className="block text-xs font-medium text-ink mb-1">
            Age <span className="text-rose-500">*</span>
          </label>
          <input
            type="number"
            placeholder="42"
            {...register('age', { valueAsNumber: true })}
            className="w-full h-9 rounded-lg border border-line bg-white px-3 text-sm text-ink placeholder:text-muted/70 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
          />
          {errors.age && <p className="mt-1 text-xs text-rose-600">{errors.age.message}</p>}
        </div>

        <div>
          <label className="block text-xs font-medium text-ink mb-1">Gender</label>
          <select
            {...register('gender')}
            className="w-full h-9 rounded-lg border border-line bg-white px-3 text-sm text-ink focus:border-brand-500 focus:outline-none"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-ink mb-1">
          Assigned Doctor <span className="text-rose-500">*</span>
        </label>
        <select
          {...register('doctorId')}
          className="w-full h-9 rounded-lg border border-line bg-white px-3 text-sm text-ink focus:border-brand-500 focus:outline-none"
        >
          {doctors.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name} ({d.specialty})
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <label className="block text-xs font-medium text-ink mb-1">
            Condition / Diagnosis <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Hypertension"
            {...register('condition')}
            className="w-full h-9 rounded-lg border border-line bg-white px-3 text-sm text-ink placeholder:text-muted/70 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
          />
          {errors.condition && (
            <p className="mt-1 text-xs text-rose-600">{errors.condition.message}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-medium text-ink mb-1">Treatment Status</label>
          <select
            {...register('status')}
            className="w-full h-9 rounded-lg border border-line bg-white px-3 text-sm text-ink focus:border-brand-500 focus:outline-none"
          >
            <option value="Active">Active Treatment</option>
            <option value="Critical">Critical</option>
            <option value="Recovered">Recovered / Discharged</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <label className="block text-xs font-medium text-ink mb-1">Contact Phone</label>
          <input
            type="tel"
            placeholder="+1-555-0199"
            {...register('phone')}
            className="w-full h-9 rounded-lg border border-line bg-white px-3 text-sm text-ink placeholder:text-muted/70 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-ink mb-1">Admission Date</label>
          <input
            type="date"
            {...register('admitted')}
            className="w-full h-9 rounded-lg border border-line bg-white px-3 text-sm text-ink focus:border-brand-500 focus:outline-none"
          />
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-3 border-t border-line">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="h-9 px-4 rounded-lg border border-line text-xs font-medium text-ink hover:bg-canvas transition-colors"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={isSubmitting || addPatientMutation.isPending || updatePatientMutation.isPending}
          data-testid="btn-submit-patient"
          className="inline-flex items-center justify-center h-9 px-4 rounded-lg bg-brand-600 text-xs font-semibold text-white hover:bg-brand-700 disabled:opacity-50 transition-colors"
        >
          {isSubmitting || addPatientMutation.isPending || updatePatientMutation.isPending
            ? 'Saving...'
            : buttonText}
        </button>
      </div>
    </form>
  );
}

