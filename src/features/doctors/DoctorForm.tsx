'use client';

import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { doctorFormSchema, DoctorFormData } from '@/lib/validation/schemas';
import { useCreateDoctor } from './hooks';
import { useMockStore } from '@/lib/mock/store';
import { useUIStore } from '@/lib/store/uiStore';
import { HospitalCombobox } from '@/components/ui/HospitalCombobox';
import { SpecializationCombobox } from '@/components/ui/SpecializationCombobox';

interface DoctorFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
  initialValues?: Partial<DoctorFormData>;
  submitLabel?: string;
}

export function DoctorForm({
  onSuccess,
  onCancel,
  initialValues,
  submitLabel = 'Add doctor',
}: DoctorFormProps) {
  const addDoctor = useMockStore((state) => state.addDoctor);
  const showToast = useUIStore((state) => state.showToast);
  const createDoctorMutation = useCreateDoctor();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(doctorFormSchema),
    defaultValues: {
      name: initialValues?.name || '',
      specialty: initialValues?.specialty || '',
      hospital: initialValues?.hospital || initialValues?.department || '',
      department: initialValues?.department || initialValues?.hospital || '',
      email: initialValues?.email || '',
      phone: initialValues?.phone || '',
      status: initialValues?.status || 'Active',
    },
  });

  const hospitalValue = useWatch({ control, name: 'hospital' });
  const specialtyValue = useWatch({ control, name: 'specialty' });

  const onSubmit = async (data: DoctorFormData) => {
    try {
      const hospitalName = data.hospital.trim();

      await createDoctorMutation
        .mutateAsync({
          name: data.name,
          specialization: data.specialty,
          hospital: hospitalName,
          phone: data.phone,
          email: data.email,
        })
        .catch(() => {
          // Fallback for mock mode if API offline
        });

      const created = addDoctor({
        ...data,
        hospital: hospitalName,
        department: data.department || hospitalName,
      });

      showToast(`Doctor ${created.name} successfully registered.`);
      reset();
      onSuccess?.();
    } catch (err) {
      console.error('Failed to save doctor', err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-0">
      <div className="px-6 pb-6 pt-5">
        <div className="grid gap-4 sm:grid-cols-2">
          {/* Full Name */}
          <div className="sm:col-span-2">
            <label htmlFor="d-name" className="mb-1.5 block text-sm font-medium text-ink">
              Full name <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input
                id="d-name"
                type="text"
                placeholder="Dr. Full name"
                {...register('name')}
                className={`block h-10 w-full rounded-lg border bg-white px-3 text-sm text-ink placeholder:text-muted/80 focus:outline-none focus:ring-4 ${
                  errors.name
                    ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500/15'
                    : 'border-line focus:border-brand-500 focus:ring-brand-500/15'
                }`}
              />
            </div>
            {errors.name && <p className="mt-1 text-xs text-rose-600">{errors.name.message}</p>}
          </div>

          {/* Specialization (Combobox with live search & inline add) */}
          <div className="">
            <label htmlFor="d-spec" className="mb-1.5 block text-sm font-medium text-ink">
              Specialization <span className="text-rose-500">*</span>
            </label>
            <SpecializationCombobox
              id="d-spec"
              value={specialtyValue}
              onChange={(val) => {
                setValue('specialty', val, { shouldValidate: true, shouldDirty: true });
              }}
              error={errors.specialty?.message}
            />
            {errors.specialty ? (
              <p className="mt-1 text-xs text-rose-600">{errors.specialty.message}</p>
            ) : (
              <p id="d-spec-msg" className="mt-1.5 text-xs text-muted">
                Pick one or type a new one.
              </p>
            )}
          </div>

          {/* Hospital (Combobox with live search & inline add) */}
          <div className="">
            <label htmlFor="d-hosp" className="mb-1.5 block text-sm font-medium text-ink">
              Hospital <span className="text-rose-500">*</span>
            </label>
            <HospitalCombobox
              id="d-hosp"
              value={hospitalValue}
              onChange={(val) => {
                setValue('hospital', val, { shouldValidate: true, shouldDirty: true });
                setValue('department', val);
              }}
              error={errors.hospital?.message}
            />
            {errors.hospital && <p className="mt-1 text-xs text-rose-600">{errors.hospital.message}</p>}
          </div>

          {/* Phone */}
          <div className="">
            <label htmlFor="d-phone" className="mb-1.5 block text-sm font-medium text-ink">
              Phone <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input
                id="d-phone"
                type="tel"
                placeholder="+880 1XXX-XXXXXX"
                {...register('phone')}
                className={`block h-10 w-full rounded-lg border bg-white px-3 text-sm text-ink placeholder:text-muted/80 focus:outline-none focus:ring-4 ${
                  errors.phone
                    ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500/15'
                    : 'border-line focus:border-brand-500 focus:ring-brand-500/15'
                }`}
              />
            </div>
            {errors.phone && <p className="mt-1 text-xs text-rose-600">{errors.phone.message}</p>}
          </div>

          {/* Email */}
          <div className="">
            <label htmlFor="d-email" className="mb-1.5 block text-sm font-medium text-ink">
              Email <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input
                id="d-email"
                type="email"
                placeholder="name@hospital.com"
                {...register('email')}
                className={`block h-10 w-full rounded-lg border bg-white px-3 text-sm text-ink placeholder:text-muted/80 focus:outline-none focus:ring-4 ${
                  errors.email
                    ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500/15'
                    : 'border-line focus:border-brand-500 focus:ring-brand-500/15'
                }`}
              />
            </div>
            {errors.email && <p className="mt-1 text-xs text-rose-600">{errors.email.message}</p>}
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex flex-col-reverse gap-2 border-t border-line bg-canvas/60 px-6 py-4 sm:flex-row sm:justify-end">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex h-10 px-4 items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm transition-colors border border-line bg-white font-medium text-ink hover:bg-canvas cursor-pointer"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={isSubmitting || createDoctorMutation.isPending}
          data-testid="btn-submit-doctor"
          className="inline-flex h-10 px-4 items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm transition-colors bg-brand-600 font-semibold text-white hover:bg-brand-700 disabled:opacity-50 cursor-pointer"
        >
          {isSubmitting || createDoctorMutation.isPending ? 'Saving...' : submitLabel}
        </button>
      </div>
    </form>
  );
}
