import { Institution, Appointment, TimeSlot } from '../types';

export const institutions: Institution[] = [
  {
    id: '1',
    name: 'City General Hospital',
    type: 'hospital',
    address: '123 Health Avenue, Medical District',
    image: 'https://images.pexels.com/photos/668298/pexels-photo-668298.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    services: [
      {
        id: '101',
        name: 'General Consultation',
        description: 'Regular check-up with a general physician',
        estimatedTimeMinutes: 15,
        institutionId: '1'
      },
      {
        id: '102',
        name: 'Vaccination',
        description: 'All types of vaccinations',
        estimatedTimeMinutes: 10,
        institutionId: '1'
      },
      {
        id: '103',
        name: 'Laboratory Tests',
        description: 'Blood work and other laboratory tests',
        estimatedTimeMinutes: 20,
        institutionId: '1'
      }
    ]
  },
  {
    id: '2',
    name: 'Municipal Services Center',
    type: 'government',
    address: '456 Civic Street, Government Complex',
    image: 'https://images.pexels.com/photos/417202/pexels-photo-417202.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    services: [
      {
        id: '201',
        name: 'Passport Application',
        description: 'Apply for a new passport or renew existing one',
        estimatedTimeMinutes: 30,
        institutionId: '2'
      },
      {
        id: '202',
        name: 'ID Card Services',
        description: 'National ID card application and renewal',
        estimatedTimeMinutes: 25,
        institutionId: '2'
      },
      {
        id: '203',
        name: 'Tax Consultation',
        description: 'Tax filing assistance and consultation',
        estimatedTimeMinutes: 45,
        institutionId: '2'
      }
    ]
  },
  {
    id: '3',
    name: 'Sacred Temple of Serenity',
    type: 'temple',
    address: '789 Divine Path, Spiritual Gardens',
    image: 'https://images.pexels.com/photos/6042013/pexels-photo-6042013.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    services: [
      {
        id: '301',
        name: 'Prayer Session',
        description: 'Reserved time for personal prayers',
        estimatedTimeMinutes: 20,
        institutionId: '3'
      },
      {
        id: '302',
        name: 'Blessing Ceremony',
        description: 'Special blessings from temple priests',
        estimatedTimeMinutes: 15,
        institutionId: '3'
      },
      {
        id: '303',
        name: 'Meditation Class',
        description: 'Guided meditation sessions',
        estimatedTimeMinutes: 60,
        institutionId: '3'
      }
    ]
  }
];

export const generateTimeSlots = (date: string, serviceId: string): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  const startHour = 9; // 9 AM
  const endHour = 17; // 5 PM
  
  for (let hour = startHour; hour < endHour; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const startTime = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      const endMinute = (minute + 30) % 60;
      const endHour = minute + 30 >= 60 ? hour + 1 : hour;
      const endTime = `${endHour.toString().padStart(2, '0')}:${endMinute.toString().padStart(2, '0')}`;
      
      slots.push({
        id: `${date}-${startTime}-${serviceId}`,
        startTime,
        endTime,
        available: Math.random() > 0.3, // 70% chance of being available
        serviceId
      });
    }
  }
  
  return slots;
};

export const generateAppointmentId = (): string => {
  return Math.random().toString(36).substring(2, 10);
};

export const generateQueueNumber = (serviceId: string): string => {
  const prefix = serviceId.substring(0, 1).toUpperCase();
  const number = Math.floor(Math.random() * 100) + 1;
  return `${prefix}${number.toString().padStart(3, '0')}`;
};

export const mockUser = {
  id: 'user123',
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+1234567890'
};