'use client';

import { useState } from 'react';
import { useMockStore } from '@/lib/mock/store';
import { AddDoctorModal } from '@/components/modals/AddDoctorModal';
import { AddPatientModal } from '@/components/modals/AddPatientModal';
import { EditPatientModal } from '@/components/modals/EditPatientModal';
import { DeletePatientModal } from '@/components/modals/DeletePatientModal';

export function OverlaysView() {
  const doctors = useMockStore((state) => state.doctors);
  const patients = useMockStore((state) => state.patients);

  const [isAddDoctorOpen, setIsAddDoctorOpen] = useState(false);
  const [isAddPatientOpen, setIsAddPatientOpen] = useState(false);
  const [isEditPatientOpen, setIsEditPatientOpen] = useState(false);
  const [isDeletePatientOpen, setIsDeletePatientOpen] = useState(false);

  const samplePatient = patients[0] || null;

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-ink">Dialogs & UI Overlays Showcase</h1>
        <p className="mt-1 text-sm text-muted">
          All interactive modal dialogs and confirmation sheets wired to the centralized store and validation schemas.
        </p>
      </div>

      {/* Interactive Trigger Bar */}
      <div className="rounded-2xl border border-line bg-white p-6 shadow-[0_1px_2px_rgba(16,24,22,0.04)]">
        <h2 className="text-sm font-semibold text-ink mb-3">Live Interactive Modals</h2>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setIsAddDoctorOpen(true)}
            data-testid="showcase-btn-add-doctor"
            className="h-9 px-4 rounded-lg bg-brand-600 text-xs font-semibold text-white hover:bg-brand-700 cursor-pointer"
          >
            Launch Add Doctor Modal
          </button>
          <button
            type="button"
            onClick={() => setIsAddPatientOpen(true)}
            data-testid="showcase-btn-add-patient"
            className="h-9 px-4 rounded-lg bg-brand-600 text-xs font-semibold text-white hover:bg-brand-700 cursor-pointer"
          >
            Launch Add Patient Modal
          </button>
          <button
            type="button"
            onClick={() => setIsEditPatientOpen(true)}
            data-testid="showcase-btn-edit-patient"
            className="h-9 px-4 rounded-lg border border-line bg-white text-xs font-semibold text-ink hover:bg-canvas cursor-pointer"
          >
            Launch Edit Patient Modal
          </button>
          <button
            type="button"
            onClick={() => setIsDeletePatientOpen(true)}
            data-testid="showcase-btn-delete-patient"
            className="h-9 px-4 rounded-lg bg-rose-50 text-rose-700 border border-rose-200 text-xs font-semibold hover:bg-rose-100 cursor-pointer"
          >
            Launch Delete Confirmation
          </button>
        </div>
      </div>

      {/* Showcase Visual Previews */}
      {/* 1. Add Doctor Preview */}
      <section id="add-doctor" className="scroll-mt-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-ink">1. Add Doctor Modal Showcase</h2>
          <button
            type="button"
            onClick={() => setIsAddDoctorOpen(true)}
            className="text-xs font-medium text-brand-600 hover:underline"
          >
            Open Interactive &rarr;
          </button>
        </div>
        <div className="rounded-2xl border border-line bg-canvas p-6 flex justify-center">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl border border-line">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-ink">Add Doctor</h3>
                <p className="text-xs text-muted">Register a new medical specialist.</p>
              </div>
              <span className="text-xs font-mono text-muted bg-canvas px-2 py-1 rounded">esc</span>
            </div>
            <div className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-medium text-ink mb-1">Full Name</label>
                <input
                  type="text"
                  readOnly
                  value="Dr. Full Name"
                  className="w-full h-9 rounded-lg border border-line px-3 text-sm bg-canvas/40"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-ink mb-1">Specialty</label>
                  <input
                    type="text"
                    readOnly
                    value="Cardiology"
                    className="w-full h-9 rounded-lg border border-line px-3 text-sm bg-canvas/40"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-ink mb-1">Department</label>
                  <input
                    type="text"
                    readOnly
                    value="Cardiovascular"
                    className="w-full h-9 rounded-lg border border-line px-3 text-sm bg-canvas/40"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddDoctorOpen(true)}
                  className="h-9 px-4 rounded-lg bg-brand-600 text-xs font-semibold text-white hover:bg-brand-700"
                >
                  Test In Modal
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Add Patient Preview */}
      <section id="add-patient" className="scroll-mt-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-ink">2. Add Patient Modal Showcase</h2>
          <button
            type="button"
            onClick={() => setIsAddPatientOpen(true)}
            className="text-xs font-medium text-brand-600 hover:underline"
          >
            Open Interactive &rarr;
          </button>
        </div>
        <div className="rounded-2xl border border-line bg-canvas p-6 flex justify-center">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl border border-line">
            <h3 className="text-lg font-semibold text-ink">Add Patient</h3>
            <p className="text-xs text-muted">Register a new patient and assign to a doctor.</p>
            <div className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-medium text-ink mb-1">Patient Name</label>
                <input
                  type="text"
                  readOnly
                  value="Patient Name"
                  className="w-full h-9 rounded-lg border border-line px-3 text-sm bg-canvas/40"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-ink mb-1">Assigned Doctor</label>
                <input
                  type="text"
                  readOnly
                  value={doctors[0]?.name || 'Dr. Sarah Jenkins'}
                  className="w-full h-9 rounded-lg border border-line px-3 text-sm bg-canvas/40"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddPatientOpen(true)}
                  className="h-9 px-4 rounded-lg bg-brand-600 text-xs font-semibold text-white hover:bg-brand-700"
                >
                  Test In Modal
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Delete Patient Preview */}
      <section id="delete-patient" className="scroll-mt-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-ink">3. Delete Patient Confirmation</h2>
          <button
            type="button"
            onClick={() => setIsDeletePatientOpen(true)}
            className="text-xs font-medium text-rose-600 hover:underline"
          >
            Open Interactive &rarr;
          </button>
        </div>
        <div className="rounded-2xl border border-line bg-canvas p-6 flex justify-center">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl border border-line">
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-full bg-rose-50 text-rose-600 border border-rose-200">
                <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                </svg>
              </span>
              <div>
                <h3 className="text-base font-semibold text-ink">Delete Patient Record</h3>
                <p className="text-xs text-muted">This action cannot be undone.</p>
              </div>
            </div>
            <p className="mt-4 text-xs leading-relaxed text-muted">
              Are you sure you want to permanently delete this patient from hospital records and unassign them from their attending doctor?
            </p>
            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsDeletePatientOpen(true)}
                className="h-9 px-4 rounded-lg bg-rose-600 text-xs font-semibold text-white hover:bg-rose-700"
              >
                Test In Modal
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Modals */}
      <AddDoctorModal isOpen={isAddDoctorOpen} onClose={() => setIsAddDoctorOpen(false)} />
      <AddPatientModal isOpen={isAddPatientOpen} onClose={() => setIsAddPatientOpen(false)} />
      <EditPatientModal
        isOpen={isEditPatientOpen}
        onClose={() => setIsEditPatientOpen(false)}
        patient={samplePatient}
      />
      <DeletePatientModal
        isOpen={isDeletePatientOpen}
        onClose={() => setIsDeletePatientOpen(false)}
        patient={samplePatient}
      />
    </div>
  );
}

