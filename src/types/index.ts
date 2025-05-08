export type InstitutionType = 'hospital' | 'government' | 'temple';

export interface Institution {
  id: string;
  name: string;
  type: InstitutionType;
  address: string;
  image: string;
  services: Service[];
}

export interface Service {
  id: string;
  name: string;
  description: string;
  estimatedTimeMinutes: number;
  institutionId: string;
}

export interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  available: boolean;
  serviceId: string;
}

export interface Appointment {
  id: string;
  userId: string;
  institutionId: string;
  serviceId: string;
  date: string;
  timeSlot: TimeSlot;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  queueNumber: string;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
}