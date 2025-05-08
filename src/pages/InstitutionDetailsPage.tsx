import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Clock, Calendar, ArrowRight, Info, Phone, Mail, ChevronDown, ChevronUp } from 'lucide-react';
import { institutions } from '../data/mockData';
import { Institution, Service } from '../types';

const InstitutionDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [institution, setInstitution] = useState<Institution | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [expandedServiceId, setExpandedServiceId] = useState<string | null>(null);
  
  useEffect(() => {
    if (id) {
      const foundInstitution = institutions.find(inst => inst.id === id);
      if (foundInstitution) {
        setInstitution(foundInstitution);
        // Initialize with the first service
        setSelectedService(foundInstitution.services[0]);
      }
    }
  }, [id]);
  
  if (!institution) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <div className="text-5xl mb-4">🔍</div>
          <h2 className="text-2xl font-semibold mb-2">Institution Not Found</h2>
          <p className="text-gray-600 mb-4">
            The institution you're looking for doesn't exist or has been removed.
          </p>
          <Link 
            to="/institutions"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Back to Institutions
          </Link>
        </div>
      </div>
    );
  }
  
  const toggleServiceDetails = (serviceId: string) => {
    if (expandedServiceId === serviceId) {
      setExpandedServiceId(null);
    } else {
      setExpandedServiceId(serviceId);
    }
  };
  
  const typeLabels: Record<string, string> = {
    hospital: 'Hospital',
    government: 'Government Office',
    temple: 'Temple'
  };
  
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="relative mb-8">
          <div className="h-64 w-full rounded-xl overflow-hidden">
            <img 
              src={institution.image} 
              alt={institution.name} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          </div>
          
          <div className="absolute bottom-0 left-0 w-full p-6 text-white">
            <div className="inline-block px-3 py-1 rounded-full bg-blue-600 text-sm font-medium mb-3">
              {typeLabels[institution.type]}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{institution.name}</h1>
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5" />
              <span>{institution.address}</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-semibold mb-6">Available Services</h2>
              
              <div className="space-y-4">
                {institution.services.map((service) => (
                  <div 
                    key={service.id}
                    className="border rounded-lg overflow-hidden"
                  >
                    <div 
                      className={`p-4 flex justify-between items-center cursor-pointer ${
                        selectedService?.id === service.id ? 'bg-blue-50' : 'bg-white'
                      }`}
                      onClick={() => {
                        setSelectedService(service);
                        toggleServiceDetails(service.id);
                      }}
                    >
                      <div>
                        <h3 className="font-medium text-lg">{service.name}</h3>
                        <div className="flex items-center text-gray-600 mt-1">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>Estimated time: {service.estimatedTimeMinutes} minutes</span>
                        </div>
                      </div>
                      <button 
                        className="text-gray-500 focus:outline-none p-1"
                        aria-label={expandedServiceId === service.id ? "Collapse details" : "Expand details"}
                      >
                        {expandedServiceId === service.id ? (
                          <ChevronUp className="h-5 w-5" />
                        ) : (
                          <ChevronDown className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                    
                    {expandedServiceId === service.id && (
                      <div className="p-4 border-t bg-gray-50">
                        <p className="text-gray-700 mb-4">{service.description}</p>
                        <Link
                          to={`/booking/${institution.id}/${service.id}`}
                          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                        >
                          Book This Service
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-4">About This Institution</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2 flex items-center">
                    <Info className="h-5 w-5 mr-2 text-blue-600" />
                    Description
                  </h3>
                  <p className="text-gray-700">
                    {institution.type === 'hospital' && (
                      "City General Hospital is a modern healthcare facility offering comprehensive medical services. Our dedicated staff provides high-quality care in a comfortable and supportive environment."
                    )}
                    {institution.type === 'government' && (
                      "Municipal Services Center is a one-stop government office providing essential administrative services to citizens. We handle various documentation needs and official government processes."
                    )}
                    {institution.type === 'temple' && (
                      "Sacred Temple of Serenity is a peaceful spiritual center dedicated to providing a tranquil environment for religious practices. The temple welcomes devotees of all backgrounds."
                    )}
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2 flex items-center">
                    <Clock className="h-5 w-5 mr-2 text-blue-600" />
                    Operating Hours
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-gray-700 font-medium">Weekdays:</p>
                      <p className="text-gray-600">9:00 AM - 5:00 PM</p>
                    </div>
                    <div>
                      <p className="text-gray-700 font-medium">Weekends:</p>
                      <p className="text-gray-600">
                        {institution.type === 'government' 
                          ? 'Closed' 
                          : '10:00 AM - 2:00 PM'}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2 flex items-center">
                    <Phone className="h-5 w-5 mr-2 text-blue-600" />
                    Contact Information
                  </h3>
                  <div className="space-y-2">
                    <p className="text-gray-700">
                      <span className="font-medium">Phone:</span> +1 (234) 567-8900
                    </p>
                    <p className="text-gray-700">
                      <span className="font-medium">Email:</span> info@{institution.name.toLowerCase().replace(/\s+/g, '')}
                        .com
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-semibold mb-4">Book an Appointment</h2>
              
              {selectedService ? (
                <>
                  <div className="mb-4 p-4 rounded-lg bg-blue-50">
                    <h3 className="font-medium mb-1">Selected Service:</h3>
                    <p className="text-blue-800 font-semibold">{selectedService.name}</p>
                    <div className="flex items-center text-sm text-gray-600 mt-2">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>Duration: ~{selectedService.estimatedTimeMinutes} min</span>
                    </div>
                  </div>
                
                  <div className="mb-6">
                    <p className="text-gray-700 mb-4">
                      Select a date and time for your appointment with:
                    </p>
                    <p className="font-semibold text-lg">{institution.name}</p>
                  </div>
                  
                  <Link
                    to={`/booking/${institution.id}/${selectedService.id}`}
                    className="w-full inline-flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    <Calendar className="mr-2 h-5 w-5" />
                    Proceed to Booking
                  </Link>
                  
                  <p className="text-center text-sm text-gray-500 mt-4">
                    No payment required for reservation
                  </p>
                </>
              ) : (
                <div className="text-center p-4">
                  <p className="text-gray-600 mb-4">
                    Please select a service from the list to proceed with booking.
                  </p>
                </div>
              )}
              
              <hr className="my-6" />
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-blue-100 rounded-full p-2 mr-3">
                    <Calendar className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Easy Scheduling</h4>
                    <p className="text-sm text-gray-600">
                      Choose the time and date that works best for you.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-green-100 rounded-full p-2 mr-3">
                    <Clock className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Skip the Line</h4>
                    <p className="text-sm text-gray-600">
                      Arrive just in time for your appointment, no waiting.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstitutionDetailsPage;