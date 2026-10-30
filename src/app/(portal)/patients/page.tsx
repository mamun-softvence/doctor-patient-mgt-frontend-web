import Link from 'next/link';

export const metadata = {
  title: 'Patients | Doctor Tracker',
};

const samplePatients = [
  { id: 'pat-1', name: 'John Doe', age: 45, gender: 'male', doctor: 'Dr. Sarah Jenkins', condition: 'Hypertension', status: 'Active', admitted: 'Jan 10, 2024' },
  { id: 'pat-2', name: 'Jane Smith', age: 34, gender: 'female', doctor: 'Dr. Sarah Jenkins', condition: 'Arrhythmia', status: 'Active', admitted: 'Jan 12, 2024' },
  { id: 'pat-3', name: 'Robert Johnson', age: 58, gender: 'male', doctor: 'Dr. Sarah Jenkins', condition: 'Coronary Artery Disease', status: 'Critical', admitted: 'Feb 01, 2024' },
  { id: 'pat-4', name: 'Emily Davis', age: 29, gender: 'female', doctor: 'Dr. Sarah Jenkins', condition: 'Mild Murmur', status: 'Recovered', admitted: 'Feb 15, 2024' },
  { id: 'pat-5', name: 'Michael Brown', age: 62, gender: 'male', doctor: 'Dr. Sarah Jenkins', condition: 'Heart Failure', status: 'Active', admitted: 'Mar 01, 2024' },
  { id: 'pat-6', name: 'Jessica Taylor', age: 41, gender: 'female', doctor: 'Dr. Michael Chen', condition: 'Migraine', status: 'Active', admitted: 'Jan 15, 2024' },
  { id: 'pat-7', name: 'William Anderson', age: 53, gender: 'male', doctor: 'Dr. Michael Chen', condition: 'Neuropathy', status: 'Active', admitted: 'Jan 22, 2024' },
  { id: 'pat-8', name: 'Ashley Thomas', age: 31, gender: 'female', doctor: 'Dr. Michael Chen', condition: 'Epilepsy', status: 'Recovered', admitted: 'Feb 05, 2024' },
];

export default function PatientsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-ink">Patients Roster</h1>
          <p className="mt-1 text-sm text-muted">Complete patient directory, medical conditions, and assigned doctors.</p>
        </div>
        <div>
          <Link
            href="/overlays#add-patient"
            className="inline-flex h-9 items-center justify-center rounded-lg bg-brand-600 px-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
          >
            + Add Patient
          </Link>
        </div>
      </div>

      {/* Filter / Search Bar */}
      <div className="rounded-2xl border border-line bg-white p-4 shadow-[0_1px_2px_rgba(16,24,22,0.04)]">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Search by patient name or diagnosis..."
            className="block h-9 flex-1 rounded-lg border border-line bg-white px-3 text-sm text-ink placeholder:text-muted/80 focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-500/15"
          />
          <select className="h-9 rounded-lg border border-line bg-white px-3 text-sm text-ink focus:border-brand-500 focus:outline-none">
            <option value="">All Statuses</option>
            <option value="Active">Active Treatment</option>
            <option value="Critical">Critical</option>
            <option value="Recovered">Recovered</option>
          </select>
          <select className="h-9 rounded-lg border border-line bg-white px-3 text-sm text-ink focus:border-brand-500 focus:outline-none">
            <option value="">All Assigned Doctors</option>
            <option value="Dr. Sarah Jenkins">Dr. Sarah Jenkins</option>
            <option value="Dr. Michael Chen">Dr. Michael Chen</option>
            <option value="Dr. Emily Rodriguez">Dr. Emily Rodriguez</option>
          </select>
        </div>
      </div>

      {/* Patients Table */}
      <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-[0_1px_2px_rgba(16,24,22,0.04)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-ink">
            <thead className="border-b border-line bg-canvas/60 text-xs font-medium text-muted uppercase">
              <tr>
                <th className="px-6 py-3">Patient</th>
                <th className="px-6 py-3">Age / Gender</th>
                <th className="px-6 py-3">Assigned Doctor</th>
                <th className="px-6 py-3">Condition</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Admitted</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {samplePatients.map((pat) => (
                <tr key={pat.id} className="hover:bg-canvas/50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-ink">{pat.name}</td>
                  <td className="px-6 py-4 capitalize">{pat.age} &bull; {pat.gender}</td>
                  <td className="px-6 py-4 text-brand-700 font-medium">{pat.doctor}</td>
                  <td className="px-6 py-4">{pat.condition}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${
                      pat.status === 'Critical' ? 'bg-rose-50 text-rose-700 ring-rose-600/20' :
                      pat.status === 'Recovered' ? 'bg-brand-50 text-brand-700 ring-brand-200' :
                      'bg-emerald-50 text-emerald-700 ring-emerald-600/20'
                    }`}>
                      {pat.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs text-muted">{pat.admitted}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href="/overlays#edit-patient"
                        className="font-medium text-muted hover:text-ink text-xs hover:underline"
                      >
                        Edit
                      </Link>
                      <span className="text-line">|</span>
                      <Link
                        href="/overlays#delete-patient"
                        className="font-medium text-rose-600 hover:text-rose-700 text-xs hover:underline"
                      >
                        Delete
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="flex items-center justify-between border-t border-line px-6 py-3 text-xs text-muted">
          <span>Showing 1 to 8 of 60 patients</span>
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

