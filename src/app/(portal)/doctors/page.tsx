import Link from 'next/link';

export const metadata = {
  title: 'Doctors | Doctor Tracker',
};

const sampleDoctors = [
  { id: 'doc-1', name: 'Dr. Sarah Jenkins', specialty: 'Cardiology', department: 'Cardiovascular', email: 'sarah.jenkins@hospital.org', phone: '+1-555-0101', patients: 5, status: 'Active' },
  { id: 'doc-2', name: 'Dr. Michael Chen', specialty: 'Neurology', department: 'Neuroscience', email: 'michael.chen@citymed.org', phone: '+1-555-0102', patients: 5, status: 'Active' },
  { id: 'doc-3', name: 'Dr. Emily Rodriguez', specialty: 'Pediatrics', department: 'Children Health', email: 'emily.rodriguez@clinic.org', phone: '+1-555-0103', patients: 5, status: 'Active' },
  { id: 'doc-4', name: 'Dr. James Wilson', specialty: 'Orthopedics', department: 'Musculoskeletal', email: 'james.wilson@hospital.org', phone: '+1-555-0104', patients: 5, status: 'Active' },
  { id: 'doc-5', name: 'Dr. Priya Patel', specialty: 'Dermatology', department: 'Dermatological Care', email: 'priya.patel@metrohealth.org', phone: '+1-555-0105', patients: 5, status: 'Active' },
  { id: 'doc-6', name: 'Dr. David Kim', specialty: 'Oncology', department: 'Cancer Center', email: 'david.kim@citymed.org', phone: '+1-555-0106', patients: 5, status: 'Active' },
];

export default function DoctorsPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-ink">Doctors Directory</h1>
          <p className="mt-1 text-sm text-muted">Manage hospital doctors, specialties, departments, and caseloads.</p>
        </div>
        <div>
          <Link
            href="/overlays#add-doctor"
            className="inline-flex h-9 items-center justify-center rounded-lg bg-brand-600 px-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
          >
            + Add Doctor
          </Link>
        </div>
      </div>

      {/* Filter / Search Bar */}
      <div className="rounded-2xl border border-line bg-white p-4 shadow-[0_1px_2px_rgba(16,24,22,0.04)]">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Search by doctor name or email..."
            className="block h-9 flex-1 rounded-lg border border-line bg-white px-3 text-sm text-ink placeholder:text-muted/80 focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-500/15"
          />
          <select className="h-9 rounded-lg border border-line bg-white px-3 text-sm text-ink focus:border-brand-500 focus:outline-none">
            <option value="">All Specialties</option>
            <option value="Cardiology">Cardiology</option>
            <option value="Neurology">Neurology</option>
            <option value="Pediatrics">Pediatrics</option>
            <option value="Orthopedics">Orthopedics</option>
            <option value="Oncology">Oncology</option>
          </select>
          <select className="h-9 rounded-lg border border-line bg-white px-3 text-sm text-ink focus:border-brand-500 focus:outline-none">
            <option value="">All Departments</option>
            <option value="Cardiovascular">Cardiovascular</option>
            <option value="Neuroscience">Neuroscience</option>
            <option value="Children Health">Children Health</option>
          </select>
        </div>
      </div>

      {/* Doctors Table */}
      <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-[0_1px_2px_rgba(16,24,22,0.04)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-ink">
            <thead className="border-b border-line bg-canvas/60 text-xs font-medium text-muted uppercase">
              <tr>
                <th className="px-6 py-3">Doctor</th>
                <th className="px-6 py-3">Specialty</th>
                <th className="px-6 py-3">Department</th>
                <th className="px-6 py-3">Patients</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {sampleDoctors.map((doc) => (
                <tr key={doc.id} className="hover:bg-canvas/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-ink">{doc.name}</div>
                    <div className="text-xs text-muted">{doc.email}</div>
                  </td>
                  <td className="px-6 py-4">{doc.specialty}</td>
                  <td className="px-6 py-4">{doc.department}</td>
                  <td className="px-6 py-4">
                    <span className="font-medium text-brand-700 bg-brand-50 px-2 py-0.5 rounded-full text-xs">
                      {doc.patients} active
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
                      {doc.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/doctors/${doc.id}`}
                      className="font-medium text-brand-600 hover:text-brand-700 hover:underline"
                    >
                      View Details &rarr;
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="flex items-center justify-between border-t border-line px-6 py-3 text-xs text-muted">
          <span>Showing 1 to 6 of 12 doctors</span>
          <div className="flex gap-2">
            <button disabled className="rounded border border-line px-2.5 py-1 text-muted/60 cursor-not-allowed">
              Previous
            </button>
            <button className="rounded border border-line px-2.5 py-1 text-ink hover:bg-canvas">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

