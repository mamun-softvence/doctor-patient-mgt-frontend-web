export type DoctorStatus = 'Active' | 'Inactive';

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  department: string;
  email: string;
  phone: string;
  status: DoctorStatus;
  patientCount?: number;
}

export type PatientGender = 'male' | 'female' | 'other';
export type PatientStatus = 'Active' | 'Critical' | 'Recovered';

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: PatientGender;
  doctorId: string;
  doctorName: string;
  condition: string;
  status: PatientStatus;
  admitted: string; // YYYY-MM-DD or formatted date string
  phone?: string;
  address?: string;
  emergencyContact?: string;
}

export interface DashboardStats {
  totalDoctors: number;
  activeDoctors: number;
  totalPatients: number;
  activePatients: number;
  criticalPatients: number;
  recoveredPatients: number;
  specialtyBreakdown: Array<{
    specialty: string;
    doctorCount: number;
    patientCount: number;
  }>;
  conditionBreakdown: Array<{
    condition: string;
    count: number;
  }>;
  admissionsTrend: Array<{
    date: string;
    count: number;
  }>;
}

export interface DoctorFilterParams {
  search?: string;
  specialty?: string;
  department?: string;
  page?: number;
  limit?: number;
}

export interface PatientFilterParams {
  search?: string;
  status?: string;
  doctorId?: string;
  condition?: string;
  page?: number;
  limit?: number;
}

export type { DoctorFormData, PatientFormData, LoginFormData } from '@/lib/validation/schemas';

