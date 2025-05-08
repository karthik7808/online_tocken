import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Check, MapPin, Calendar, ArrowRight } from 'lucide-react';
import { InstitutionType } from '../types';

const HomePage: React.FC = () => {
  const institutionTypes: { type: InstitutionType; name: string; icon: string; description: string }[] = [
    {
      type: 'hospital',
      name: 'Hospitals',
      icon: '🏥',
      description: 'Book appointments with doctors, laboratory tests, and other medical services.'
    },
    {
      type: 'government',
      name: 'Government Offices',
      icon: '🏛️',
      description: 'Schedule visits for document processing, applications, and other administrative services.'
    },
    {
      type: 'temple',
      name: 'Temples',
      icon: '🛕',
      description: 'Reserve time slots for prayers, ceremonies, and other religious activities.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-32 mt-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Skip the Line, <span className="text-yellow-300">Book Online</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Reserve your spot in advance at hospitals, government offices, and temples. 
            Save time and avoid unnecessary waiting.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              to="/institutions"
              className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-6 py-3 rounded-lg transition-colors duration-300 inline-flex items-center justify-center"
            >
              Book Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/how-it-works"
              className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-600 font-semibold px-6 py-3 rounded-lg transition-colors duration-300 inline-flex items-center justify-center"
            >
              How It Works
            </Link>
          </div>
        </div>
      </section>

      {/* Institution Types Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {institutionTypes.map((institution) => (
              <div
                key={institution.type}
                className="bg-white rounded-xl shadow-md p-8 transition-transform duration-300 hover:scale-105"
              >
                <div className="text-4xl mb-4">{institution.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{institution.name}</h3>
                <p className="text-gray-600 mb-6">{institution.description}</p>
                <Link
                  to={`/institutions?type=${institution.type}`}
                  className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center"
                >
                  Book an appointment
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Why Choose QueueEase</h2>
          <p className="text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            Our platform provides a seamless experience for booking and managing appointments 
            at various institutions. Here's what makes us special:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 rounded-xl bg-blue-50 text-center">
              <div className="bg-blue-100 rounded-full p-4 inline-flex mb-4">
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Save Time</h3>
              <p className="text-gray-600">
                No more waiting in long lines. Book your appointment and arrive just in time.
              </p>
            </div>
            
            <div className="p-6 rounded-xl bg-green-50 text-center">
              <div className="bg-green-100 rounded-full p-4 inline-flex mb-4">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Easy to Use</h3>
              <p className="text-gray-600">
                Simple and intuitive interface makes booking appointments a breeze.
              </p>
            </div>
            
            <div className="p-6 rounded-xl bg-purple-50 text-center">
              <div className="bg-purple-100 rounded-full p-4 inline-flex mb-4">
                <MapPin className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Multiple Locations</h3>
              <p className="text-gray-600">
                Find and book appointments at various institutions all in one place.
              </p>
            </div>
            
            <div className="p-6 rounded-xl bg-yellow-50 text-center">
              <div className="bg-yellow-100 rounded-full p-4 inline-flex mb-4">
                <Calendar className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Flexible Scheduling</h3>
              <p className="text-gray-600">
                Choose the date and time that works best for your schedule.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl">
                  S
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">Sarah Johnson</h4>
                  <p className="text-gray-500 text-sm">Hospital visitor</p>
                </div>
              </div>
              <p className="text-gray-600">
                "I used to spend hours waiting at the hospital for my regular check-ups. With QueueEase, 
                I can book my appointment in advance and arrive just in time. It's a game-changer!"
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold text-xl">
                  M
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">Michael Rodriguez</h4>
                  <p className="text-gray-500 text-sm">Government office user</p>
                </div>
              </div>
              <p className="text-gray-600">
                "Getting my passport renewal used to be a full-day affair. Thanks to QueueEase, 
                I booked my slot, showed up at the scheduled time, and was done in 30 minutes!"
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold text-xl">
                  A
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">Anita Patel</h4>
                  <p className="text-gray-500 text-sm">Temple visitor</p>
                </div>
              </div>
              <p className="text-gray-600">
                "During festival seasons, temples are extremely crowded. QueueEase allowed me to 
                reserve a time for prayers, making my temple visit peaceful and hassle-free."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Skip the Queue?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of happy users who've saved time by booking their appointments online.
          </p>
          <Link
            to="/register"
            className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8 py-3 rounded-lg transition-colors duration-300 inline-flex items-center"
          >
            Get Started
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;