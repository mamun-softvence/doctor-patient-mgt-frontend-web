'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { doctorFormSchema, DoctorFormData } from '@/lib/validation/schemas';
import { useCreateDoctor } from './hooks';
import { useMockStore } from '@/lib/mock/store';
import { useUIStore } from '@/lib/store/uiStore';

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
  submitLabel = 'Save Doctor',
}: DoctorFormProps) {
  const addDoctor = useMockStore((state) => state.addDoctor);
  const showToast = useUIStore((state) => state.showToast);
  const createDoctorMutation = useCreateDoctor();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<DoctorFormData>({
    resolver: zodResolver(doctorFormSchema),
    defaultValues: {
      name: initialValues?.name || '',
      specialty: initialValues?.specialty || '',
      department: initialValues?.department || '',
      email: initialValues?.email || '',
      phone: initialValues?.phone || '',
      status: initialValues?.status || 'Active',
    },
  });

  const onSubmit = async (data: DoctorFormData) => {
    try {
      await createDoctorMutation.mutateAsync({
        name: data.name,
        specialization: data.specialty,
        hospital: data.department || 'Central Hospital',
        phone: data.phone,
        email: data.email,
      }).catch(() => {
        // Fallback for mock mode if API offline
      });

      const created = addDoctor(data);
      showToast(`Doctor ${created.name} successfully registered.`);
      reset();
      onSuccess?.();
    } catch (err) {
      console.error('Failed to save doctor', err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-xs font-medium text-ink mb-1">
          Full Name <span className="text-rose-500">*</span>
        </label>
        <input
          type="text"
          placeholder="e.g. Dr. Alex Mercer"
          {...register('name')}
          className="w-full h-9 rounded-lg border border-line bg-white px-3 text-sm text-ink placeholder:text-muted/70 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
        />
        {errors.name && <p className="mt-1 text-xs text-rose-600">{errors.name.message}</p>}
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <label className="block text-xs font-medium text-ink mb-1">
            Specialty <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Cardiology"
            {...register('specialty')}
            className="w-full h-9 rounded-lg border border-line bg-white px-3 text-sm text-ink placeholder:text-muted/70 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
          />
          {errors.specialty && <p className="mt-1 text-xs text-rose-600">{errors.specialty.message}</p>}
        </div>

        <div>
          <label className="block text-xs font-medium text-ink mb-1">
            Department <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Cardiovascular"
            {...register('department')}
            className="w-full h-9 rounded-lg border border-line bg-white px-3 text-sm text-ink placeholder:text-muted/70 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
          />
          {errors.department && <p className="mt-1 text-xs text-rose-600">{errors.department.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <label className="block text-xs font-medium text-ink mb-1">
            Email Address <span className="text-rose-500">*</span>
          </label>
          <input
            type="email"
            placeholder="alex.mercer@hospital.org"
            {...register('email')}
            className="w-full h-9 rounded-lg border border-line bg-white px-3 text-sm text-ink placeholder:text-muted/70 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
          />
          {errors.email && <p className="mt-1 text-xs text-rose-600">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-xs font-medium text-ink mb-1">
            Phone Number <span className="text-rose-500">*</span>
          </label>
          <input
            type="tel"
            placeholder="+1-555-0199"
            {...register('phone')}
            className="w-full h-9 rounded-lg border border-line bg-white px-3 text-sm text-ink placeholder:text-muted/70 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
          />
          {errors.phone && <p className="mt-1 text-xs text-rose-600">{errors.phone.message}</p>}
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-ink mb-1">Status</label>
        <select
          {...register('status')}
          className="w-full h-9 rounded-lg border border-line bg-white px-3 text-sm text-ink focus:border-brand-500 focus:outline-none"
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
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
          disabled={isSubmitting || createDoctorMutation.isPending}
          data-testid="btn-submit-doctor"
          className="inline-flex items-center justify-center h-9 px-4 rounded-lg bg-brand-600 text-xs font-semibold text-white hover:bg-brand-700 disabled:opacity-50 transition-colors"
        >
          {isSubmitting || createDoctorMutation.isPending ? 'Saving...' : submitLabel}
        </button>
      </div>
    </form>
  );
}

