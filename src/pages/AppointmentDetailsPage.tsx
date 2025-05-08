import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, User, Phone, Mail, ArrowLeft, Printer, ChevronRight, Check, X } from 'lucide-react';
import { mockUser } from '../data/mockData';
import { Appointment } from '../types';

const AppointmentDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // In a real app, this would fetch from an API
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  
  useEffect(() => {
    // Mock API call to get appointment details
    setTimeout(() => {
      if (id === 'appt1') {
        setAppointment({
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
        });
      } else if (id === 'appt2') {
        setAppointment({
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
        });
      }
      setIsLoading(false);
    }, 1000);
  }, [id]);
  
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
  
  const institutionAddresses: Record<string, string> = {
    '1': '123 Health Avenue, Medical District',
    '2': '456 Civic Street, Government Complex',
    '3': '789 Divine Path, Spiritual Gardens'
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
  
  const handleCancelAppointment = () => {
    // In a real app, this would call an API
    if (appointment) {
      setAppointment({
        ...appointment,
        status: 'cancelled'
      });
      setShowCancelConfirm(false);
    }
  };
  
  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'confirmed':
        return {
          icon: <Check className="h-6 w-6 text-green-500" />,
          text: 'Confirmed',
          description: 'Your appointment is confirmed and ready to go.'
        };
      case 'pending':
        return {
          icon: <Clock className="h-6 w-6 text-yellow-500" />,
          text: 'Pending',
          description: 'Your appointment is waiting for confirmation.'
        };
      case 'completed':
        return {
          icon: <Check className="h-6 w-6 text-blue-500" />,
          text: 'Completed',
          description: 'This appointment has been completed.'
        };
      case 'cancelled':
        return {
          icon: <X className="h-6 w-6 text-red-500" />,
          text: 'Cancelled',
          description: 'This appointment has been cancelled.'
        };
      default:
        return {
          icon: null,
          text: '',
          description: ''
        };
    }
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading appointment details...</p>
        </div>
      </div>
    );
  }
  
  if (!appointment) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <div className="text-5xl mb-4">🔍</div>
          <h2 className="text-2xl font-semibold mb-2">Appointment Not Found</h2>
          <p className="text-gray-600 mb-4">
            The appointment you're looking for doesn't exist or has been removed.
          </p>
          <Link 
            to="/appointments"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Back to Appointments
          </Link>
        </div>
      </div>
    );
  }
  
  const status = getStatusLabel(appointment.status);
  
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-6">
          <button
            onClick={() => navigate('/appointments')}
            className="inline-flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-5 w-5 mr-1" />
            Back to Appointments
          </button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Appointment Information */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-blue-600 text-white p-6">
                <div className="flex justify-between items-center">
                  <h1 className="text-2xl font-bold">Appointment Details</h1>
                  <button
                    onClick={() => window.print()}
                    className="bg-white text-blue-600 hover:bg-blue-50 px-3 py-1 rounded-md text-sm font-medium inline-flex items-center"
                  >
                    <Printer className="h-4 w-4 mr-1" />
                    Print
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                {/* Status */}
                <div className="flex items-center p-4 mb-6 bg-gray-50 rounded-lg">
                  {status.icon}
                  <div className="ml-3">
                    <h3 className="font-semibold">{status.text}</h3>
                    <p className="text-sm text-gray-600">{status.description}</p>
                  </div>
                </div>
                
                {/* Service Information */}
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-3">Service Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-500 text-sm">Service Type:</p>
                      <p className="font-medium">{serviceNames[appointment.serviceId]}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Institution:</p>
                      <p className="font-medium">{institutionNames[appointment.institutionId]}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Address:</p>
                      <p className="font-medium">{institutionAddresses[appointment.institutionId]}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Booking Reference:</p>
                      <p className="font-medium">{appointment.id.toUpperCase()}</p>
                    </div>
                  </div>
                </div>
                
                {/* Date and Time */}
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-3">Date and Time</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start">
                      <Calendar className="h-5 w-5 text-blue-600 mt-0.5 mr-2" />
                      <div>
                        <p className="text-gray-500 text-sm">Date:</p>
                        <p className="font-medium">{formatDate(appointment.date)}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Clock className="h-5 w-5 text-blue-600 mt-0.5 mr-2" />
                      <div>
                        <p className="text-gray-500 text-sm">Time:</p>
                        <p className="font-medium">
                          {appointment.timeSlot.startTime} - {appointment.timeSlot.endTime}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Personal Information */}
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-3">Personal Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start">
                      <User className="h-5 w-5 text-blue-600 mt-0.5 mr-2" />
                      <div>
                        <p className="text-gray-500 text-sm">Name:</p>
                        <p className="font-medium">{mockUser.name}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Mail className="h-5 w-5 text-blue-600 mt-0.5 mr-2" />
                      <div>
                        <p className="text-gray-500 text-sm">Email:</p>
                        <p className="font-medium">{mockUser.email}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Phone className="h-5 w-5 text-blue-600 mt-0.5 mr-2" />
                      <div>
                        <p className="text-gray-500 text-sm">Phone:</p>
                        <p className="font-medium">{mockUser.phone}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Buttons */}
                {appointment.status !== 'cancelled' && appointment.status !== 'completed' && (
                  <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                    <Link
                      to={`/reschedule/${appointment.id}`}
                      className="inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                    >
                      Reschedule
                    </Link>
                    <button
                      onClick={() => setShowCancelConfirm(true)}
                      className="inline-flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-red-700 bg-white hover:bg-red-50 focus:outline-none"
                    >
                      Cancel Appointment
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Right Column - Queue Number */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <h2 className="text-xl font-semibold mb-4">Queue Number</h2>
              <div className="bg-blue-50 border-2 border-blue-200 rounded-lg py-6 px-4 mb-4">
                <p className="text-3xl font-bold text-blue-800">{appointment.queueNumber}</p>
              </div>
              <p className="text-gray-600 text-sm mb-6">
                Show this number when you arrive at the {institutionNames[appointment.institutionId]}
              </p>
              
              <div className="border-t pt-6">
                <h3 className="font-medium mb-3">Instructions</h3>
                <ul className="text-left text-gray-600 space-y-2">
                  <li className="flex">
                    <ChevronRight className="h-5 w-5 text-blue-600 flex-shrink-0 mr-2" />
                    <span>Arrive 10 minutes before your appointment time</span>
                  </li>
                  <li className="flex">
                    <ChevronRight className="h-5 w-5 text-blue-600 flex-shrink-0 mr-2" />
                    <span>Bring a valid ID for verification</span>
                  </li>
                  <li className="flex">
                    <ChevronRight className="h-5 w-5 text-blue-600 flex-shrink-0 mr-2" />
                    <span>Check in at the reception desk</span>
                  </li>
                  <li className="flex">
                    <ChevronRight className="h-5 w-5 text-blue-600 flex-shrink-0 mr-2" />
                    <span>Show your queue number when called</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Cancel Confirmation Modal */}
      {showCancelConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-xl font-semibold mb-4">Cancel Appointment</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to cancel your appointment for {serviceNames[appointment.serviceId]} on {formatDate(appointment.date)} at {appointment.timeSlot.startTime}?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowCancelConfirm(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                No, Keep It
              </button>
              <button
                onClick={handleCancelAppointment}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentDetailsPage;