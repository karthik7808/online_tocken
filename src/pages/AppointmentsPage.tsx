import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, CheckCircle, XCircle, AlertCircle, Trash2, CalendarX } from 'lucide-react';
import { mockUser } from '../data/mockData';
import { Appointment } from '../types';

const AppointmentsPage: React.FC = () => {
  // Mocked appointments - in a real app, this would come from API
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: 'appt1',
      userId: mockUser.id,
      institutionId: '1',
      serviceId: '101',
      date: '2025-04-15',
      timeSlot: {
        id: 'slot1',
        startTime: '10:00',
        endTime: '10:15',
        available: false,
        serviceId: '101'
      },
      status: 'confirmed',
      queueNumber: 'H005',
      createdAt: '2025-04-10T14:30:00.000Z'
    },
    {
      id: 'appt2',
      userId: mockUser.id,
      institutionId: '2',
      serviceId: '201',
      date: '2025-04-18',
      timeSlot: {
        id: 'slot2',
        startTime: '14:30',
        endTime: '15:00',
        available: false,
        serviceId: '201'
      },
      status: 'pending',
      queueNumber: 'G012',
      createdAt: '2025-04-11T09:15:00.000Z'
    },
    {
      id: 'appt3',
      userId: mockUser.id,
      institutionId: '3',
      serviceId: '301',
      date: '2025-04-05',
      timeSlot: {
        id: 'slot3',
        startTime: '11:00',
        endTime: '11:20',
        available: false,
        serviceId: '301'
      },
      status: 'completed',
      queueNumber: 'T008',
      createdAt: '2025-04-01T16:45:00.000Z'
    }
  ]);
  
  const institutionNames: Record<string, string> = {
    '1': 'City General Hospital',
    '2': 'Municipal Services Center',
    '3': 'Sacred Temple of Serenity'
  };
  
  const serviceNames: Record<string, string> = {
    '101': 'General Consultation',
    '201': 'Passport Application',
    '301': 'Prayer Session'
  };
  
  const cancelAppointment = (appointmentId: string) => {
    // In a real app, this would call an API
    const updatedAppointments = appointments.map(appointment => 
      appointment.id === appointmentId 
        ? { ...appointment, status: 'cancelled' }
        : appointment
    );
    setAppointments(updatedAppointments);
  };
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  const isUpcoming = (appointment: Appointment) => {
    return new Date(appointment.date) >= new Date() && 
           appointment.status !== 'cancelled' && 
           appointment.status !== 'completed';
  };
  
  const isPast = (appointment: Appointment) => {
    return new Date(appointment.date) < new Date() || 
           appointment.status === 'cancelled' || 
           appointment.status === 'completed';
  };
  
  const upcomingAppointments = appointments.filter(isUpcoming);
  const pastAppointments = appointments.filter(isPast);
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="mr-1 h-3 w-3" />
            Confirmed
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <AlertCircle className="mr-1 h-3 w-3" />
            Pending
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <CheckCircle className="mr-1 h-3 w-3" />
            Completed
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <XCircle className="mr-1 h-3 w-3" />
            Cancelled
          </span>
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-2">My Appointments</h1>
        <p className="text-gray-600 mb-8">
          Manage your upcoming and past appointments
        </p>
        
        {/* Upcoming Appointments */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-4">Upcoming Appointments</h2>
          
          {upcomingAppointments.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {upcomingAppointments.map((appointment) => (
                <div 
                  key={appointment.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden border-l-4 border-blue-600"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-lg font-semibold">
                        {serviceNames[appointment.serviceId]}
                      </h3>
                      {getStatusBadge(appointment.status)}
                    </div>
                    
                    <div className="flex items-start space-x-3 mb-3">
                      <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
                      <div>
                        <p className="text-gray-700">
                          {institutionNames[appointment.institutionId]}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3 mb-3">
                      <Calendar className="h-5 w-5 text-gray-500 mt-0.5" />
                      <div>
                        <p className="text-gray-700">
                          {formatDate(appointment.date)}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3 mb-5">
                      <Clock className="h-5 w-5 text-gray-500 mt-0.5" />
                      <div>
                        <p className="text-gray-700">
                          {appointment.timeSlot.startTime} - {appointment.timeSlot.endTime}
                        </p>
                      </div>
                    </div>
                    
                    <div className="bg-blue-50 p-3 rounded-md mb-4 text-center">
                      <p className="text-sm text-gray-600 mb-1">Queue Number:</p>
                      <p className="text-xl font-bold text-blue-700">{appointment.queueNumber}</p>
                    </div>
                    
                    <div className="flex space-x-3">
                      <Link
                        to={`/appointment/${appointment.id}`}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded text-center transition-colors"
                      >
                        View Details
                      </Link>
                      
                      {appointment.status !== 'cancelled' && (
                        <button
                          onClick={() => cancelAppointment(appointment.id)}
                          className="bg-white hover:bg-red-50 text-red-600 border border-red-300 py-2 px-4 rounded transition-colors flex items-center justify-center"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="mx-auto h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <CalendarX className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No Upcoming Appointments</h3>
              <p className="text-gray-600 mb-6">
                You don't have any upcoming appointments scheduled.
              </p>
              <Link
                to="/institutions"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Book an Appointment
              </Link>
            </div>
          )}
        </div>
        
        {/* Past Appointments */}
        {pastAppointments.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Past Appointments</h2>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Service
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Institution
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date & Time
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Queue #
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {pastAppointments.map((appointment) => (
                    <tr key={appointment.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {serviceNames[appointment.serviceId]}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {institutionNames[appointment.institutionId]}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {new Date(appointment.date).toLocaleDateString()}, {appointment.timeSlot.startTime}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(appointment.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {appointment.queueNumber}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentsPage;