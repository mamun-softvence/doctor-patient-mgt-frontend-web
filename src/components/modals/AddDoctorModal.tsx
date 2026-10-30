'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { doctorFormSchema, DoctorFormData } from '@/lib/validation/schemas';
import { useMockStore } from '@/lib/mock/store';
import { useUIStore } from '@/lib/store/uiStore';

interface AddDoctorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddDoctorModal({ isOpen, onClose }: AddDoctorModalProps) {
  const addDoctor = useMockStore((state) => state.addDoctor);
  const showToast = useUIStore((state) => state.showToast);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<DoctorFormData>({
    resolver: zodResolver(doctorFormSchema),
    defaultValues: {
      name: '',
      specialty: '',
      department: '',
      email: '',
      phone: '',
      status: 'Active',
    },
  });

  if (!isOpen) return null;

  const onSubmit = (data: DoctorFormData) => {
    try {
      const created = addDoctor(data);
      showToast(`Doctor ${created.name} successfully registered.`);
      reset();
      onClose();
    } catch (err) {
      console.error('Failed to add doctor', err);
    }
  };

  const handleCancel = () => {
    reset();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-doctor-title"
        className="w-full max-w-lg rounded-2xl border border-line bg-white p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-150"
      >
        <div className="flex items-start justify-between">
          <div>
            <h3 id="add-doctor-title" className="text-lg font-semibold text-ink">
              Add Doctor
            </h3>
            <p className="text-xs text-muted">Register a new medical specialist to the directory.</p>
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
              placeholder="e.g. Dr. Alex Mercer"
              {...register('name')}
              className="w-full h-9 rounded-lg border border-line px-3 text-sm text-ink placeholder:text-muted/70 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
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
                className="w-full h-9 rounded-lg border border-line px-3 text-sm text-ink placeholder:text-muted/70 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
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
                className="w-full h-9 rounded-lg border border-line px-3 text-sm text-ink placeholder:text-muted/70 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
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
                className="w-full h-9 rounded-lg border border-line px-3 text-sm text-ink placeholder:text-muted/70 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              />
              {errors.email && <p className="mt-1 text-xs text-rose-600">{errors.email.message}</p>}
            </div>
            <div>
              <label className="block text-xs font-medium text-ink mb-1">
                Phone Number <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                placeholder="+1-555-0199"
                {...register('phone')}
                className="w-full h-9 rounded-lg border border-line px-3 text-sm text-ink placeholder:text-muted/70 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
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
              {isSubmitting ? 'Saving...' : 'Save Doctor'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
