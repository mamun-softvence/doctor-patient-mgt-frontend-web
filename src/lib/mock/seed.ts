import { Doctor, Patient } from '@/types';

export const INITIAL_DOCTORS: Doctor[] = [
  { id: 'doc-1', name: 'Dr. Sarah Jenkins', specialty: 'Cardiology', department: 'Cardiovascular', email: 'sarah.jenkins@hospital.org', phone: '+1-555-0101', status: 'Active' },
  { id: 'doc-2', name: 'Dr. Michael Chen', specialty: 'Neurology', department: 'Neuroscience', email: 'michael.chen@citymed.org', phone: '+1-555-0102', status: 'Active' },
  { id: 'doc-3', name: 'Dr. Emily Rodriguez', specialty: 'Pediatrics', department: 'Children Health', email: 'emily.rodriguez@clinic.org', phone: '+1-555-0103', status: 'Active' },
  { id: 'doc-4', name: 'Dr. James Wilson', specialty: 'Orthopedics', department: 'Musculoskeletal', email: 'james.wilson@hospital.org', phone: '+1-555-0104', status: 'Active' },
  { id: 'doc-5', name: 'Dr. Priya Patel', specialty: 'Dermatology', department: 'Dermatological Care', email: 'priya.patel@metrohealth.org', phone: '+1-555-0105', status: 'Active' },
  { id: 'doc-6', name: 'Dr. David Kim', specialty: 'Oncology', department: 'Cancer Center', email: 'david.kim@citymed.org', phone: '+1-555-0106', status: 'Active' },
  { id: 'doc-7', name: 'Dr. Lisa Anderson', specialty: 'Cardiology', department: 'Cardiovascular', email: 'lisa.anderson@hospital.org', phone: '+1-555-0107', status: 'Active' },
  { id: 'doc-8', name: 'Dr. Marcus Vance', specialty: 'General Medicine', department: 'Internal Medicine', email: 'marcus.vance@clinic.org', phone: '+1-555-0108', status: 'Active' },
  { id: 'doc-9', name: 'Dr. Olivia Thorne', specialty: 'Neurology', department: 'Neuroscience', email: 'olivia.thorne@hospital.org', phone: '+1-555-0109', status: 'Active' },
  { id: 'doc-10', name: 'Dr. Robert Martinez', specialty: 'Orthopedics', department: 'Musculoskeletal', email: 'robert.martinez@citymed.org', phone: '+1-555-0110', status: 'Active' },
  { id: 'doc-11', name: 'Dr. Chloe Bennett', specialty: 'Pediatrics', department: 'Children Health', email: 'chloe.bennett@clinic.org', phone: '+1-555-0111', status: 'Active' },
  { id: 'doc-12', name: 'Dr. Alan Turing', specialty: 'General Medicine', department: 'Internal Medicine', email: 'alan.turing@metrohealth.org', phone: '+1-555-0112', status: 'Inactive' },
];

export const INITIAL_PATIENTS: Patient[] = [
  { id: 'pat-1', name: 'John Doe', age: 45, gender: 'male', doctorId: 'doc-1', doctorName: 'Dr. Sarah Jenkins', condition: 'Hypertension', status: 'Active', admitted: '2024-01-10', phone: '+1-555-1001' },
  { id: 'pat-2', name: 'Jane Smith', age: 34, gender: 'female', doctorId: 'doc-1', doctorName: 'Dr. Sarah Jenkins', condition: 'Arrhythmia', status: 'Active', admitted: '2024-01-12', phone: '+1-555-1002' },
  { id: 'pat-3', name: 'Robert Johnson', age: 58, gender: 'male', doctorId: 'doc-1', doctorName: 'Dr. Sarah Jenkins', condition: 'Coronary Artery Disease', status: 'Critical', admitted: '2024-02-01', phone: '+1-555-1003' },
  { id: 'pat-4', name: 'Emily Davis', age: 29, gender: 'female', doctorId: 'doc-1', doctorName: 'Dr. Sarah Jenkins', condition: 'Mild Murmur', status: 'Recovered', admitted: '2024-02-15', phone: '+1-555-1004' },
  { id: 'pat-5', name: 'Michael Brown', age: 62, gender: 'male', doctorId: 'doc-1', doctorName: 'Dr. Sarah Jenkins', condition: 'Heart Failure', status: 'Active', admitted: '2024-03-01', phone: '+1-555-1005' },

  { id: 'pat-6', name: 'Jessica Taylor', age: 41, gender: 'female', doctorId: 'doc-2', doctorName: 'Dr. Michael Chen', condition: 'Migraine', status: 'Active', admitted: '2024-01-15', phone: '+1-555-1006' },
  { id: 'pat-7', name: 'William Anderson', age: 53, gender: 'male', doctorId: 'doc-2', doctorName: 'Dr. Michael Chen', condition: 'Neuropathy', status: 'Active', admitted: '2024-01-22', phone: '+1-555-1007' },
  { id: 'pat-8', name: 'Ashley Thomas', age: 31, gender: 'female', doctorId: 'doc-2', doctorName: 'Dr. Michael Chen', condition: 'Epilepsy', status: 'Recovered', admitted: '2024-02-05', phone: '+1-555-1008' },
  { id: 'pat-9', name: 'Christopher White', age: 47, gender: 'male', doctorId: 'doc-2', doctorName: 'Dr. Michael Chen', condition: 'Concussion', status: 'Critical', admitted: '2024-02-18', phone: '+1-555-1009' },

  { id: 'pat-10', name: 'Sophia Miller', age: 8, gender: 'female', doctorId: 'doc-3', doctorName: 'Dr. Emily Rodriguez', condition: 'Asthma', status: 'Active', admitted: '2024-01-18', phone: '+1-555-1010' },
  { id: 'pat-11', name: 'Liam Wilson', age: 12, gender: 'male', doctorId: 'doc-3', doctorName: 'Dr. Emily Rodriguez', condition: 'Bronchitis', status: 'Recovered', admitted: '2024-02-10', phone: '+1-555-1011' },
  { id: 'pat-12', name: 'Ava Martinez', age: 5, gender: 'female', doctorId: 'doc-3', doctorName: 'Dr. Emily Rodriguez', condition: 'Pneumonia', status: 'Critical', admitted: '2024-03-02', phone: '+1-555-1012' },

  { id: 'pat-13', name: 'Daniel Jackson', age: 39, gender: 'male', doctorId: 'doc-4', doctorName: 'Dr. James Wilson', condition: 'Knee Ligament Tear', status: 'Active', admitted: '2024-01-25', phone: '+1-555-1013' },
  { id: 'pat-14', name: 'Olivia Martin', age: 67, gender: 'female', doctorId: 'doc-4', doctorName: 'Dr. James Wilson', condition: 'Osteoarthritis', status: 'Active', admitted: '2024-02-14', phone: '+1-555-1014' },

  { id: 'pat-15', name: 'Lucas Harris', age: 24, gender: 'male', doctorId: 'doc-5', doctorName: 'Dr. Priya Patel', condition: 'Severe Eczema', status: 'Active', admitted: '2024-02-20', phone: '+1-555-1015' },
  { id: 'pat-16', name: 'Mia Robinson', age: 33, gender: 'female', doctorId: 'doc-5', doctorName: 'Dr. Priya Patel', condition: 'Psoriasis', status: 'Recovered', admitted: '2024-02-28', phone: '+1-555-1016' },

  { id: 'pat-17', name: 'Alexander Clark', age: 71, gender: 'male', doctorId: 'doc-6', doctorName: 'Dr. David Kim', condition: 'Lung Carcinoma', status: 'Critical', admitted: '2024-01-08', phone: '+1-555-1017' },
  { id: 'pat-18', name: 'Charlotte Lewis', age: 59, gender: 'female', doctorId: 'doc-6', doctorName: 'Dr. David Kim', condition: 'Breast Neoplasm', status: 'Active', admitted: '2024-01-30', phone: '+1-555-1018' },

  { id: 'pat-19', name: 'Ethan Walker', age: 50, gender: 'male', doctorId: 'doc-7', doctorName: 'Dr. Lisa Anderson', condition: 'Hypertension', status: 'Active', admitted: '2024-02-12', phone: '+1-555-1019' },
  { id: 'pat-20', name: 'Amelia Hall', age: 43, gender: 'female', doctorId: 'doc-8', doctorName: 'Dr. Marcus Vance', condition: 'Type 2 Diabetes', status: 'Active', admitted: '2024-02-22', phone: '+1-555-1020' },
];

