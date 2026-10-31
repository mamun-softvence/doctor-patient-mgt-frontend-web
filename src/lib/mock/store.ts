import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Doctor, Patient, DashboardStats, DoctorFormData, PatientFormData } from '@/types';
import { INITIAL_DOCTORS, INITIAL_PATIENTS } from './seed';

interface MockStoreState {
  doctors: Doctor[];
  patients: Patient[];

  // Actions
  addDoctor: (data: DoctorFormData) => Doctor;
  updateDoctor: (id: string, data: Partial<DoctorFormData>) => Doctor | null;
  addPatient: (data: PatientFormData) => Patient;
  updatePatient: (id: string, data: Partial<PatientFormData>) => Patient | null;
  deletePatient: (id: string) => boolean;
  reassignPatient: (patientId: string, newDoctorId: string) => boolean;
  resetStore: () => void;
}

const safeStorage = {
  getItem: (name: string): string | null => {
    if (typeof window === 'undefined') return null;
    try {
      return window.localStorage.getItem(name);
    } catch {
      return null;
    }
  },
  setItem: (name: string, value: string): void => {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.setItem(name, value);
    } catch {
      // ignore
    }
  },
  removeItem: (name: string): void => {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.removeItem(name);
    } catch {
      // ignore
    }
  },
};

export const useMockStore = create<MockStoreState>()(
  persist(
    (set, get) => ({
      doctors: INITIAL_DOCTORS,
      patients: INITIAL_PATIENTS,

      addDoctor: (data: DoctorFormData) => {
        const newId = `doc-${Date.now()}`;
        const newDoctor: Doctor = {
          id: newId,
          name: data.name,
          specialty: data.specialty,
          department: data.department,
          email: data.email,
          phone: data.phone,
          status: data.status,
          createdAt: new Date().toISOString(),
        };

        set((state) => ({
          doctors: [newDoctor, ...state.doctors],
        }));

        return newDoctor;
      },

      updateDoctor: (id: string, data: Partial<DoctorFormData>) => {
        let updated: Doctor | null = null;

        set((state) => {
          const index = state.doctors.findIndex((d) => d.id === id);
          if (index === -1) return state;

          const current = state.doctors[index];
          const updatedDoctor: Doctor = { ...current, ...data };
          updated = updatedDoctor;
          const nextDoctors = [...state.doctors];
          nextDoctors[index] = updatedDoctor;

          let nextPatients = state.patients;
          if (data.name && data.name !== current.name) {
            nextPatients = state.patients.map((p) =>
              p.doctorId === id ? { ...p, doctorName: data.name! } : p
            );
          }

          return { doctors: nextDoctors, patients: nextPatients };
        });

        return updated;
      },

      addPatient: (data: PatientFormData) => {
        const assignedDoctor = get().doctors.find((d) => d.id === data.doctorId);
        const doctorName = assignedDoctor ? assignedDoctor.name : 'Unknown Doctor';

        const newPatient: Patient = {
          id: `pat-${Date.now()}`,
          name: data.name,
          age: data.age,
          gender: data.gender,
          doctorId: data.doctorId,
          doctorName,
          condition: data.condition,
          status: data.status,
          admitted: data.admitted,
          phone: data.phone,
          address: data.address,
          emergencyContact: data.emergencyContact,
          createdAt: new Date().toISOString(),
        };

        set((state) => ({
          patients: [newPatient, ...state.patients],
        }));

        return newPatient;
      },

      updatePatient: (id: string, data: Partial<PatientFormData>) => {
        let updated: Patient | null = null;

        set((state) => {
          const index = state.patients.findIndex((p) => p.id === id);
          if (index === -1) return state;

          const current = state.patients[index];
          let doctorName = current.doctorName;

          if (data.doctorId && data.doctorId !== current.doctorId) {
            const doc = state.doctors.find((d) => d.id === data.doctorId);
            doctorName = doc ? doc.name : current.doctorName;
          }

          const updatedPat: Patient = {
            ...current,
            ...data,
            doctorName,
          };
          updated = updatedPat;

          const nextPatients = [...state.patients];
          nextPatients[index] = updatedPat;

          return { patients: nextPatients };
        });

        return updated;
      },

      deletePatient: (id: string) => {
        let existed = false;
        set((state) => {
          const exists = state.patients.some((p) => p.id === id);
          if (!exists) return state;
          existed = true;
          return {
            patients: state.patients.filter((p) => p.id !== id),
          };
        });
        return existed;
      },

      reassignPatient: (patientId: string, newDoctorId: string) => {
        const doc = get().doctors.find((d) => d.id === newDoctorId);
        if (!doc) return false;

        let success = false;
        set((state) => {
          const pIndex = state.patients.findIndex((p) => p.id === patientId);
          if (pIndex === -1) return state;

          success = true;
          const nextPatients = [...state.patients];
          nextPatients[pIndex] = {
            ...nextPatients[pIndex],
            doctorId: newDoctorId,
            doctorName: doc.name,
          };

          return { patients: nextPatients };
        });

        return success;
      },

      resetStore: () => {
        set({
          doctors: INITIAL_DOCTORS,
          patients: INITIAL_PATIENTS,
        });
      },
    }),
    {
      name: 'doctor-tracker-mock-store-v1',
      storage: createJSONStorage(() => safeStorage),
    }
  )
);

// Derived Selectors
export function selectDoctorPatientCount(state: MockStoreState, doctorId: string): number {
  return state.patients.filter((p) => p.doctorId === doctorId).length;
}

export function computeDashboardStats(doctors: Doctor[], patients: Patient[]): DashboardStats {
  const totalDoctors = doctors.length;
  const activeDoctors = doctors.filter((d) => d.status === 'Active').length;
  const totalPatients = patients.length;
  const activePatients = patients.filter((p) => p.status === 'Active').length;
  const criticalPatients = patients.filter((p) => p.status === 'Critical').length;
  const recoveredPatients = patients.filter((p) => p.status === 'Recovered').length;

  // Specialty Breakdown
  const specialtyMap = new Map<string, { doctorCount: number; patientCount: number }>();
  doctors.forEach((d) => {
    const existing = specialtyMap.get(d.specialty) || { doctorCount: 0, patientCount: 0 };
    existing.doctorCount += 1;
    specialtyMap.set(d.specialty, existing);
  });

  patients.forEach((p) => {
    const doctor = doctors.find((d) => d.id === p.doctorId);
    if (doctor) {
      const existing = specialtyMap.get(doctor.specialty) || { doctorCount: 0, patientCount: 0 };
      existing.patientCount += 1;
      specialtyMap.set(doctor.specialty, existing);
    }
  });

  const specialtyBreakdown = Array.from(specialtyMap.entries()).map(([specialty, counts]) => ({
    specialty,
    ...counts,
  }));

  // Condition Breakdown
  const conditionMap = new Map<string, number>();
  patients.forEach((p) => {
    conditionMap.set(p.condition, (conditionMap.get(p.condition) || 0) + 1);
  });

  const conditionBreakdown = Array.from(conditionMap.entries())
    .map(([condition, count]) => ({ condition, count }))
    .sort((a, b) => b.count - a.count);

  // Admissions Trend
  const dateMap = new Map<string, number>();
  patients.forEach((p) => {
    const date = p.admitted;
    dateMap.set(date, (dateMap.get(date) || 0) + 1);
  });

  const admissionsTrend = Array.from(dateMap.entries())
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => a.date.localeCompare(b.date));

  return {
    totalDoctors,
    activeDoctors,
    totalPatients,
    activePatients,
    criticalPatients,
    recoveredPatients,
    specialtyBreakdown,
    conditionBreakdown,
    admissionsTrend,
  };
}
