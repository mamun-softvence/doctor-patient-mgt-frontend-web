import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().trim().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const doctorFormSchema = z.object({
  name: z.string().trim().min(2, 'Doctor name must be at least 2 characters'),
  specialty: z.string().trim().min(2, 'Specialty is required'),
  department: z.string().trim().min(2, 'Department is required'),
  email: z.string().trim().email('Please enter a valid email address'),
  phone: z.string().trim().min(5, 'Valid phone number is required'),
  status: z.enum(['Active', 'Inactive']),
});

export type DoctorFormData = z.infer<typeof doctorFormSchema>;

export const patientFormSchema = z.object({
  name: z.string().trim().min(2, 'Patient name must be at least 2 characters'),
  age: z.number().int().min(0, 'Age must be 0 or greater').max(130, 'Age must be realistic'),
  gender: z.enum(['male', 'female', 'other'], {
    message: 'Please select a gender',
  }),
  doctorId: z.string().min(1, 'Please select an assigned doctor'),
  condition: z.string().trim().min(2, 'Medical condition is required'),
  status: z.enum(['Active', 'Critical', 'Recovered']),
  admitted: z.string().min(4, 'Admission date is required'),
  phone: z.string().trim().optional(),
  address: z.string().trim().optional(),
  emergencyContact: z.string().trim().optional(),
});

export type PatientFormData = z.infer<typeof patientFormSchema>;
