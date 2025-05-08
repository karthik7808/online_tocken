import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, MapPin, Clock, Filter, X } from 'lucide-react';
import { institutions } from '../data/mockData';
import { Institution, InstitutionType } from '../types';

const InstitutionsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const typeFilter = searchParams.get('type') as InstitutionType | null;
  
  const [filteredInstitutions, setFilteredInstitutions] = useState<Institution[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<InstitutionType | 'all'>(typeFilter || 'all');
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  
  useEffect(() => {
    let filtered = institutions;
    
    // Filter by type
    if (selectedType !== 'all') {
      filtered = filtered.filter(institution => institution.type === selectedType);
    }
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        institution => 
          institution.name.toLowerCase().includes(term) || 
          institution.services.some(service => 
            service.name.toLowerCase().includes(term) || 
            service.description.toLowerCase().includes(term)
          )
      );
    }
    
    setFilteredInstitutions(filtered);
  }, [selectedType, searchTerm]);
  
  // Initialize filter based on URL parameter
  useEffect(() => {
    if (typeFilter) {
      setSelectedType(typeFilter);
    }
  }, [typeFilter]);
  
  const institutionTypeLabels: Record<InstitutionType | 'all', string> = {
    all: 'All Institutions',
    hospital: 'Hospitals',
    government: 'Government Offices',
    temple: 'Temples'
  };
  
  const typeIcons: Record<InstitutionType, string> = {
    hospital: '🏥',
    government: '🏛️',
    temple: '🛕'
  };
  
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-2">Find Institutions</h1>
        <p className="text-gray-600 mb-8">
          Browse and book appointments at hospitals, government offices, and temples
        </p>
        
        {/* Search and Filter Controls */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-8">
          <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out sm:text-sm"
                placeholder="Search institutions or services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setSearchTerm('')}
                >
                  <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </div>
            
            {/* Desktop Filter */}
            <div className="hidden md:flex space-x-2">
              <button
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  selectedType === 'all' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setSelectedType('all')}
              >
                All
              </button>
              <button
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  selectedType === 'hospital' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setSelectedType('hospital')}
              >
                Hospitals
              </button>
              <button
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  selectedType === 'government' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setSelectedType('government')}
              >
                Government
              </button>
              <button
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  selectedType === 'temple' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setSelectedType('temple')}
              >
                Temples
              </button>
            </div>
            
            {/* Mobile Filter Button */}
            <button
              className="md:hidden flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
            >
              <Filter className="h-5 w-5 mr-2" />
              Filter: {institutionTypeLabels[selectedType]}
            </button>
          </div>
          
          {/* Mobile Filter Menu */}
          {isFilterMenuOpen && (
            <div className="md:hidden mt-4 border-t pt-4 space-y-2">
              <button
                className={`block w-full text-left px-4 py-2 rounded-md text-sm font-medium ${
                  selectedType === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
                }`}
                onClick={() => {
                  setSelectedType('all');
                  setIsFilterMenuOpen(false);
                }}
              >
                All Institutions
              </button>
              <button
                className={`block w-full text-left px-4 py-2 rounded-md text-sm font-medium ${
                  selectedType === 'hospital' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
                }`}
                onClick={() => {
                  setSelectedType('hospital');
                  setIsFilterMenuOpen(false);
                }}
              >
                Hospitals
              </button>
              <button
                className={`block w-full text-left px-4 py-2 rounded-md text-sm font-medium ${
                  selectedType === 'government' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
                }`}
                onClick={() => {
                  setSelectedType('government');
                  setIsFilterMenuOpen(false);
                }}
              >
                Government Offices
              </button>
              <button
                className={`block w-full text-left px-4 py-2 rounded-md text-sm font-medium ${
                  selectedType === 'temple' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
                }`}
                onClick={() => {
                  setSelectedType('temple');
                  setIsFilterMenuOpen(false);
                }}
              >
                Temples
              </button>
            </div>
          )}
        </div>
        
        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredInstitutions.length} {filteredInstitutions.length === 1 ? 'institution' : 'institutions'}
            {selectedType !== 'all' && (
              <> of type <span className="font-medium">{institutionTypeLabels[selectedType]}</span></>
            )}
            {searchTerm && (
              <> matching "<span className="font-medium">{searchTerm}</span>"</>
            )}
          </p>
        </div>
        
        {/* Institutions Grid */}
        {filteredInstitutions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredInstitutions.map((institution) => (
              <Link 
                key={institution.id}
                to={`/institution/${institution.id}`}
                className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={institution.image} 
                    alt={institution.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-blue-600 text-white text-lg px-3 py-1 rounded-full">
                    {typeIcons[institution.type]}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{institution.name}</h3>
                  <div className="flex items-start space-x-2 text-gray-600 mb-3">
                    <MapPin className="h-5 w-5 flex-shrink-0 mt-0.5" />
                    <span>{institution.address}</span>
                  </div>
                  <div className="mb-4">
                    <p className="text-sm text-gray-500">Available services:</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {institution.services.slice(0, 3).map((service) => (
                        <span 
                          key={service.id}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                        >
                          {service.name}
                        </span>
                      ))}
                      {institution.services.length > 3 && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          +{institution.services.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>Avg. wait: 10-15 min</span>
                    </div>
                    <span className="text-blue-600 font-medium text-sm">Book Now →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2">No Institutions Found</h3>
            <p className="text-gray-600 mb-4">
              We couldn't find any institutions matching your search criteria.
            </p>
            <button
              className="text-blue-600 font-medium hover:text-blue-800"
              onClick={() => {
                setSearchTerm('');
                setSelectedType('all');
              }}
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default InstitutionsPage;