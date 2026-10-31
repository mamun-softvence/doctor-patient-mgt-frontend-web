'use client';

import { useState } from 'react';
import { useMockStore } from '@/lib/mock/store';
import { AddDoctorModal } from '@/components/modals/AddDoctorModal';
import { AddPatientModal } from '@/components/modals/AddPatientModal';
import { EditPatientModal } from '@/components/modals/EditPatientModal';
import { DeletePatientModal } from '@/components/modals/DeletePatientModal';

export function OverlaysView() {
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
      <section id="add-patient" aria-labelledby="add-patient-h" className="scroll-mt-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 id="add-patient-h" className="text-base font-semibold text-ink">
              Add patient
            </h2>
            <p className="mt-1 text-sm text-muted">
              Opens from a doctor&apos;s page, so the doctor is already set.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsAddPatientOpen(true)}
            data-testid="showcase-btn-open-add-patient"
            className="text-xs font-medium text-brand-600 hover:underline cursor-pointer"
          >
            Launch Interactive &rarr;
          </button>
        </div>

        <div className="relative flex overflow-hidden rounded-2xl border border-line bg-canvas min-h-[560px] items-center justify-center p-4 sm:p-10">
          <div aria-hidden="true" className="absolute inset-0 flex">
            <div className="hidden w-48 shrink-0 border-r border-line bg-white sm:block" />
            <div className="flex-1 space-y-4 p-6">
              <div className="h-7 w-40 rounded-md bg-white" />
              <div className="h-24 rounded-xl bg-white" />
              <div className="h-80 rounded-xl bg-white" />
            </div>
          </div>
          <div aria-hidden="true" className="absolute inset-0 bg-ink/40" />

          <div className="relative flex w-full justify-center">
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="add-patient-preview-title"
              className="relative w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-2xl shadow-black/10 ring-1 ring-black/5"
            >
              <div className="flex items-start justify-between gap-4 px-6 pt-6">
                <div>
                  <h3
                    id="add-patient-preview-title"
                    className="text-lg font-semibold tracking-tight text-ink"
                  >
                    Add patient
                  </h3>
                  <p className="mt-1 text-sm text-muted">
                    The patient is added to this doctor&apos;s list.
                  </p>
                </div>
                <button
                  type="button"
                  aria-label="Close"
                  onClick={() => setIsAddPatientOpen(true)}
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

              <div className="px-6 pb-6 pt-5">
                <div className="mb-5 flex items-center gap-3 rounded-lg bg-canvas px-3 py-2.5 ring-1 ring-inset ring-line">
                  <span
                    aria-hidden="true"
                    className="grid size-8 shrink-0 place-items-center rounded-full bg-brand-50 text-xs font-semibold text-brand-700 ring-1 ring-inset ring-brand-100"
                  >
                    FR
                  </span>
                  <div className="min-w-0 flex-1 text-sm">
                    <p className="font-medium text-ink">Dr. Farhana Rahman</p>
                    <p className="text-xs text-muted">Cardiology, Square Hospital</p>
                  </div>
                  <div className="flex items-center gap-2.5 shrink-0">
                    <span className="text-xs text-muted">Doctor</span>
                    <button
                      type="button"
                      className="inline-flex h-7 items-center gap-1 rounded-md border border-line bg-white px-2 text-xs font-medium text-ink shadow-2xs hover:bg-canvas transition-colors"
                    >
                      <svg
                        className="size-3.5 text-muted"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="m16 3 4 4-4 4" />
                        <path d="M20 7H4" />
                        <path d="m8 21-4-4 4-4" />
                        <path d="M4 17h16" />
                      </svg>
                      Change
                    </button>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className="mb-1.5 block text-sm font-medium text-ink">Full name</label>
                    <input
                      type="text"
                      readOnly
                      placeholder="Patient's full name"
                      className="block h-10 w-full rounded-lg border border-line bg-white px-3 text-sm text-ink placeholder:text-muted/80 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-ink">Age</label>
                    <input
                      type="number"
                      readOnly
                      placeholder="Years"
                      className="block h-10 w-full rounded-lg border border-line bg-white px-3 text-sm text-ink placeholder:text-muted/80 focus:outline-none"
                    />
                  </div>
                  <fieldset>
                    <legend className="mb-1.5 block text-sm font-medium text-ink">Gender</legend>
                    <div className="grid h-10 grid-cols-3 gap-1 rounded-lg bg-canvas p-1 ring-1 ring-inset ring-line">
                      <span className="block rounded-md bg-white py-1.5 text-center text-sm font-semibold text-ink shadow-sm">
                        Male
                      </span>
                      <span className="block rounded-md py-1.5 text-center text-sm text-muted">
                        Female
                      </span>
                      <span className="block rounded-md py-1.5 text-center text-sm text-muted">
                        Other
                      </span>
                    </div>
                  </fieldset>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-ink">Phone</label>
                    <input
                      type="tel"
                      readOnly
                      placeholder="+880 1XXX-XXXXXX"
                      className="block h-10 w-full rounded-lg border border-line bg-white px-3 text-sm text-ink placeholder:text-muted/80 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-ink">
                      Email <span className="font-normal text-muted">(optional)</span>
                    </label>
                    <input
                      type="email"
                      readOnly
                      placeholder="name@example.com"
                      className="block h-10 w-full rounded-lg border border-line bg-white px-3 text-sm text-ink placeholder:text-muted/80 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-ink">Condition</label>
                    <div className="relative">
                      <select
                        disabled
                        className="block h-10 w-full appearance-none rounded-lg border border-line bg-white pl-3 pr-9 text-sm text-ink"
                      >
                        <option>Stable</option>
                      </select>
                      <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-muted">
                        <svg
                          className="size-4 shrink-0"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.75"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <path d="m6 9 6 6 6-6" />
                        </svg>
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-ink">
                      Admission date
                    </label>
                    <input
                      type="date"
                      readOnly
                      defaultValue="2026-10-30"
                      className="block h-10 w-full rounded-lg border border-line bg-white px-3 text-sm text-ink focus:outline-none"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="mb-1.5 block text-sm font-medium text-ink">
                      Diagnosis <span className="font-normal text-muted">(optional)</span>
                    </label>
                    <input
                      type="text"
                      readOnly
                      placeholder="For example, hypertension"
                      className="block h-10 w-full rounded-lg border border-line bg-white px-3 text-sm text-ink placeholder:text-muted/80 focus:outline-none"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="mb-1.5 block text-sm font-medium text-ink">
                      Notes <span className="font-normal text-muted">(optional)</span>
                    </label>
                    <textarea
                      rows={3}
                      readOnly
                      placeholder="Anything the next person on shift should know"
                      className="block w-full resize-none rounded-lg border border-line bg-white px-3 py-2 text-sm text-ink placeholder:text-muted/80 focus:outline-none"
                    />
                    <p className="mt-1.5 text-xs text-muted">Visible to all staff.</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col-reverse gap-2 border-t border-line bg-canvas/60 px-6 py-4 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => setIsAddPatientOpen(true)}
                  className="inline-flex h-10 px-4 items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm border border-line bg-white font-medium text-ink hover:bg-canvas cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddPatientOpen(true)}
                  className="inline-flex h-10 px-4 items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm bg-brand-600 font-semibold text-white hover:bg-brand-700 cursor-pointer"
                >
                  Add patient
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

