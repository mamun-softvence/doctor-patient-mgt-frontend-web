export const metadata = {
  title: 'Dialogs & Overlays Showcase | Doctor Tracker',
};

export default function OverlaysShowcasePage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-ink">Dialogs & UI Overlays Showcase</h1>
        <p className="mt-1 text-sm text-muted">
          All modal dialogs, drawers, and confirmation sheets extracted from the static design templates.
        </p>
      </div>

      {/* Add Doctor Dialog */}
      <section id="add-doctor" className="scroll-mt-6 space-y-4">
        <h2 className="text-lg font-semibold text-ink">1. Add Doctor Modal</h2>
        <div className="relative rounded-2xl border border-line bg-canvas p-6 flex justify-center">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl border border-line">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-ink">Add Doctor</h3>
                <p className="text-xs text-muted">Register a new medical specialist.</p>
              </div>
              <span className="text-xs font-mono text-muted bg-canvas px-2 py-1 rounded">esc</span>
            </div>
            <form className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-medium text-ink mb-1">Full Name</label>
                <input
                  type="text"
                  placeholder="Dr. Full Name"
                  className="w-full h-9 rounded-lg border border-line px-3 text-sm focus:border-brand-500 focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-ink mb-1">Specialty</label>
                  <input
                    type="text"
                    placeholder="e.g. Cardiology"
                    className="w-full h-9 rounded-lg border border-line px-3 text-sm focus:border-brand-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-ink mb-1">Department</label>
                  <input
                    type="text"
                    placeholder="e.g. Cardiovascular"
                    className="w-full h-9 rounded-lg border border-line px-3 text-sm focus:border-brand-500 focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-ink mb-1">Email</label>
                <input
                  type="email"
                  placeholder="doctor@hospital.org"
                  className="w-full h-9 rounded-lg border border-line px-3 text-sm focus:border-brand-500 focus:outline-none"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" className="h-9 px-4 rounded-lg border border-line text-xs font-medium text-ink hover:bg-canvas">
                  Cancel
                </button>
                <button type="button" className="h-9 px-4 rounded-lg bg-brand-600 text-xs font-semibold text-white hover:bg-brand-700">
                  Save Doctor
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Add Patient Dialog */}
      <section id="add-patient" className="scroll-mt-6 space-y-4">
        <h2 className="text-lg font-semibold text-ink">2. Add Patient Modal</h2>
        <div className="relative rounded-2xl border border-line bg-canvas p-6 flex justify-center">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl border border-line">
            <h3 className="text-lg font-semibold text-ink">Add Patient</h3>
            <p className="text-xs text-muted">Register a new patient and assign to a doctor.</p>
            <form className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-medium text-ink mb-1">Patient Name</label>
                <input
                  type="text"
                  placeholder="Patient Name"
                  className="w-full h-9 rounded-lg border border-line px-3 text-sm focus:border-brand-500 focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-ink mb-1">Age</label>
                  <input
                    type="number"
                    placeholder="45"
                    className="w-full h-9 rounded-lg border border-line px-3 text-sm focus:border-brand-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-ink mb-1">Gender</label>
                  <select className="w-full h-9 rounded-lg border border-line px-3 text-sm focus:border-brand-500 focus:outline-none">
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-ink mb-1">Assigned Doctor</label>
                <select className="w-full h-9 rounded-lg border border-line px-3 text-sm focus:border-brand-500 focus:outline-none">
                  <option value="doc-1">Dr. Sarah Jenkins (Cardiology)</option>
                  <option value="doc-2">Dr. Michael Chen (Neurology)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-ink mb-1">Condition / Diagnosis</label>
                <input
                  type="text"
                  placeholder="e.g. Hypertension"
                  className="w-full h-9 rounded-lg border border-line px-3 text-sm focus:border-brand-500 focus:outline-none"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" className="h-9 px-4 rounded-lg border border-line text-xs font-medium text-ink hover:bg-canvas">
                  Cancel
                </button>
                <button type="button" className="h-9 px-4 rounded-lg bg-brand-600 text-xs font-semibold text-white hover:bg-brand-700">
                  Assign Patient
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Delete Patient Confirmation Dialog */}
      <section id="delete-patient" className="scroll-mt-6 space-y-4">
        <h2 className="text-lg font-semibold text-ink">3. Delete Patient Confirmation</h2>
        <div className="relative rounded-2xl border border-line bg-canvas p-6 flex justify-center">
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
              <button type="button" className="h-9 px-4 rounded-lg border border-line text-xs font-medium text-ink hover:bg-canvas">
                Cancel
              </button>
              <button type="button" className="h-9 px-4 rounded-lg bg-rose-600 text-xs font-semibold text-white hover:bg-rose-700">
                Yes, Delete Patient
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
