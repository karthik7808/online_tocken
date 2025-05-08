import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Clock, ChevronLeft, ChevronRight, Check, Calendar as CalendarIcon } from 'lucide-react';
import { institutions, generateTimeSlots, generateAppointmentId, generateQueueNumber, mockUser } from '../data/mockData';
import { Institution, Service, TimeSlot, Appointment } from '../types';

const BookingPage: React.FC = () => {
  const { institutionId, serviceId } = useParams<{ institutionId: string; serviceId: string }>();
  const navigate = useNavigate();
  
  const [institution, setInstitution] = useState<Institution | null>(null);
  const [service, setService] = useState<Service | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(null);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [isBookingComplete, setIsBookingComplete] = useState(false);
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  
  // Get current date for disabling past dates
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  useEffect(() => {
    if (institutionId && serviceId) {
      const foundInstitution = institutions.find(inst => inst.id === institutionId);
      
      if (foundInstitution) {
        setInstitution(foundInstitution);
        
        const foundService = foundInstitution.services.find(serv => serv.id === serviceId);
        if (foundService) {
          setService(foundService);
        } else {
          navigate('/institutions');
        }
      } else {
        navigate('/institutions');
      }
    }
  }, [institutionId, serviceId, navigate]);
  
  useEffect(() => {
    if (service) {
      // Generate time slots for the selected date
      const slots = generateTimeSlots(selectedDate, service.id);
      setTimeSlots(slots);
      setSelectedTimeSlot(null); // Reset time slot selection when date changes
    }
  }, [selectedDate, service]);
  
  // Calendar rendering functions
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };
  
  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };
  
  const renderCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-10"></div>);
    }
    
    // Add cells for days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dateString = date.toISOString().split('T')[0];
      const isToday = date.getTime() === today.getTime();
      const isSelected = dateString === selectedDate;
      const isPast = date < today;
      
      days.push(
        <button
          key={day}
          className={`h-10 w-10 rounded-full flex items-center justify-center ${
            isSelected 
              ? 'bg-blue-600 text-white'
              : isToday
                ? 'bg-blue-100 text-blue-800'
                : isPast
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-700 hover:bg-gray-100'
          }`}
          onClick={() => !isPast && setSelectedDate(dateString)}
          disabled={isPast}
        >
          {day}
        </button>
      );
    }
    
    return (
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <button
            className="p-1 rounded-full hover:bg-gray-100"
            onClick={() => {
              const newMonth = new Date(currentMonth);
              newMonth.setMonth(newMonth.getMonth() - 1);
              if (newMonth.getTime() >= today.getTime() || 
                  (newMonth.getMonth() === today.getMonth() && 
                   newMonth.getFullYear() === today.getFullYear())) {
                setCurrentMonth(newMonth);
              }
            }}
          >
            <ChevronLeft className="h-5 w-5 text-gray-600" />
          </button>
          <h3 className="text-lg font-medium">
            {monthNames[month]} {year}
          </h3>
          <button
            className="p-1 rounded-full hover:bg-gray-100"
            onClick={() => {
              const newMonth = new Date(currentMonth);
              newMonth.setMonth(newMonth.getMonth() + 1);
              setCurrentMonth(newMonth);
            }}
          >
            <ChevronRight className="h-5 w-5 text-gray-600" />
          </button>
        </div>
        <div className="grid grid-cols-7 gap-1 mb-1">
          {dayNames.map(day => (
            <div key={day} className="h-10 flex items-center justify-center text-gray-500 text-sm">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {days}
        </div>
      </div>
    );
  };
  
  const handleBooking = () => {
    if (!institution || !service || !selectedTimeSlot) return;
    
    const newAppointment: Appointment = {
      id: generateAppointmentId(),
      userId: mockUser.id,
      institutionId: institution.id,
      serviceId: service.id,
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      status: 'confirmed',
      queueNumber: generateQueueNumber(service.id),
      createdAt: new Date().toISOString()
    };
    
    // In a real app, this would be saved to a database
    setAppointment(newAppointment);
    setIsBookingComplete(true);
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
  
  if (!institution || !service) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading booking information...</p>
        </div>
      </div>
    );
  }
  
  if (isBookingComplete && appointment) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Booking Confirmed!</h1>
            <p className="text-gray-600 mb-8">
              Your appointment has been successfully scheduled.
            </p>
            
            <div className="bg-blue-50 rounded-lg p-6 mb-8 text-left max-w-md mx-auto">
              <h2 className="text-xl font-semibold mb-4">Appointment Details</h2>
              
              <div className="space-y-4">
                <div>
                  <p className="text-gray-600">Institution:</p>
                  <p className="font-medium">{institution.name}</p>
                </div>
                
                <div>
                  <p className="text-gray-600">Service:</p>
                  <p className="font-medium">{service.name}</p>
                </div>
                
                <div>
                  <p className="text-gray-600">Date:</p>
                  <p className="font-medium">{formatDate(appointment.date)}</p>
                </div>
                
                <div>
                  <p className="text-gray-600">Time:</p>
                  <p className="font-medium">
                    {appointment.timeSlot.startTime} - {appointment.timeSlot.endTime}
                  </p>
                </div>
                
                <div>
                  <p className="text-gray-600">Queue Number:</p>
                  <div className="bg-white border-2 border-blue-600 rounded-lg py-3 px-4 text-center">
                    <span className="text-xl font-bold text-blue-800">{appointment.queueNumber}</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2 text-center">Show this number at the institution</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <button
                onClick={() => navigate('/appointments')}
                className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors w-full md:w-auto"
              >
                <CalendarIcon className="mr-2 h-5 w-5" />
                View My Appointments
              </button>
              
              <button
                onClick={() => navigate('/')}
                className="inline-flex items-center justify-center px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors w-full md:w-auto mt-3 md:mt-0 md:ml-3"
              >
                Return to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center text-gray-600 hover:text-gray-900"
          >
            <ChevronLeft className="h-5 w-5 mr-1" />
            Back
          </button>
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="bg-blue-600 text-white p-6">
            <h1 className="text-2xl font-bold mb-2">Book an Appointment</h1>
            <p>Select a date and time for your visit</p>
          </div>
          
          <div className="p-6">
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-3">Booking Information</h2>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-500 text-sm">Institution:</p>
                    <p className="font-medium">{institution.name}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Service:</p>
                    <p className="font-medium">{service.name}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Duration:</p>
                    <p className="font-medium">~{service.estimatedTimeMinutes} minutes</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Address:</p>
                    <p className="font-medium">{institution.address}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-3 flex items-center">
                <Calendar className="mr-2 h-5 w-5 text-blue-600" />
                Select Date
              </h2>
              {renderCalendar()}
            </div>
            
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-3 flex items-center">
                <Clock className="mr-2 h-5 w-5 text-blue-600" />
                Select Time
              </h2>
              
              {timeSlots.length > 0 ? (
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot.id}
                      className={`py-2 px-3 rounded-md text-center text-sm ${
                        selectedTimeSlot?.id === slot.id
                          ? 'bg-blue-600 text-white'
                          : slot.available
                            ? 'bg-white border border-gray-300 hover:border-blue-400 text-gray-700'
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      }`}
                      onClick={() => slot.available && setSelectedTimeSlot(slot)}
                      disabled={!slot.available}
                    >
                      {slot.startTime}
                    </button>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">No available time slots for the selected date.</p>
              )}
            </div>
            
            <button
              className={`w-full py-3 rounded-md font-medium ${
                selectedTimeSlot
                  ? 'bg-blue-600 text-white hover:bg-blue-700' 
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
              disabled={!selectedTimeSlot}
              onClick={handleBooking}
            >
              Confirm Booking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;