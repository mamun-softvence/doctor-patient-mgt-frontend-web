import Link from 'next/link';

export const metadata = {
  title: 'Doctor Profile | Doctor Tracker',
};

const assignedPatients = [
  { id: 'pat-1', name: 'John Doe', age: 45, gender: 'male', condition: 'Hypertension', status: 'Active', admitted: 'Jan 10, 2024' },
  { id: 'pat-2', name: 'Jane Smith', age: 34, gender: 'female', condition: 'Arrhythmia', status: 'Active', admitted: 'Jan 12, 2024' },
  { id: 'pat-3', name: 'Robert Johnson', age: 58, gender: 'male', condition: 'Coronary Artery Disease', status: 'Critical', admitted: 'Feb 01, 2024' },
  { id: 'pat-4', name: 'Emily Davis', age: 29, gender: 'female', condition: 'Mild Murmur', status: 'Recovered', admitted: 'Feb 15, 2024' },
  { id: 'pat-5', name: 'Michael Brown', age: 62, gender: 'male', condition: 'Heart Failure', status: 'Active', admitted: 'Mar 01, 2024' },
];

export function generateStaticParams() {
  return [
    { doctorId: 'doc-1' },
    { doctorId: 'doc-2' },
    { doctorId: 'doc-3' },
  ];
}

export default async function DoctorDetailPage({
  params,
}: {
  params: Promise<{ doctorId: string }>;
}) {
  const { doctorId } = await params;

  return (
    <div className="space-y-6">
      {/* Back link */}
      <div>
        <Link href="/doctors" className="inline-flex items-center gap-1.5 text-xs font-medium text-muted hover:text-ink">
          &larr; Back to Doctors Directory
        </Link>
      </div>

      {/* Doctor Header Card */}
      <div className="rounded-2xl border border-line bg-white p-6 shadow-[0_1px_2px_rgba(16,24,22,0.04)] sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="grid size-14 place-items-center rounded-2xl bg-brand-50 text-brand-700 font-bold text-xl border border-brand-200">
              SJ
            </span>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-ink">Dr. Sarah Jenkins</h1>
              <p className="text-sm text-muted">Cardiology &bull; Cardiovascular Department</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/overlays#add-patient"
              className="inline-flex h-9 items-center justify-center rounded-lg bg-brand-600 px-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
            >
              + Assign Patient
            </Link>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4 border-t border-line pt-6 sm:grid-cols-4 text-sm">
          <div>
            <span className="block text-xs text-muted">ID Reference</span>
            <span className="font-mono text-xs font-semibold text-ink">{doctorId}</span>
          </div>
          <div>
            <span className="block text-xs text-muted">Email</span>
            <span className="text-xs text-ink">sarah.jenkins@hospital.org</span>
          </div>
          <div>
            <span className="block text-xs text-muted">Phone</span>
            <span className="text-xs text-ink">+1-555-0101</span>
          </div>
          <div>
            <span className="block text-xs text-muted">Caseload</span>
            <span className="text-xs font-semibold text-brand-700">5 active patients</span>
          </div>
        </div>
      </div>

      {/* Assigned Patients Table */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-ink">Assigned Patients ({assignedPatients.length})</h2>
          <span className="text-xs text-muted">Managing treatment & clinical updates</span>
        </div>

        <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-[0_1px_2px_rgba(16,24,22,0.04)]">
          <table className="w-full text-left text-sm text-ink">
            <thead className="border-b border-line bg-canvas/60 text-xs font-medium text-muted uppercase">
              <tr>
                <th className="px-6 py-3">Patient</th>
                <th className="px-6 py-3">Age / Gender</th>
                <th className="px-6 py-3">Diagnosed Condition</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Admitted Date</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {assignedPatients.map((p) => (
                <tr key={p.id} className="hover:bg-canvas/50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-ink">{p.name}</td>
                  <td className="px-6 py-4 capitalize">{p.age} y/o &bull; {p.gender}</td>
                  <td className="px-6 py-4">{p.condition}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${
                      p.status === 'Critical' ? 'bg-rose-50 text-rose-700 ring-rose-600/20' :
                      p.status === 'Recovered' ? 'bg-brand-50 text-brand-700 ring-brand-200' :
                      'bg-emerald-50 text-emerald-700 ring-emerald-600/20'
                    }`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs text-muted">{p.admitted}</td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href="/overlays#edit-patient"
                      className="font-medium text-brand-600 hover:text-brand-700 hover:underline text-xs"
                    >
                      Edit Record
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
