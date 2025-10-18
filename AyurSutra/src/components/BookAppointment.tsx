import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Leaf, User, ArrowLeft, Search, Calendar, MapPin, Phone } from 'lucide-react';
import { motion } from 'motion/react';
import { useTheme } from './ThemeProvider';
import newLogoImage from 'figma:asset/55a14cbbf289c9fde8c4c8ca4230c7f789072dbd.png';

interface BookAppointmentProps {
  user: { id: string; name: string; email: string; userType: 'patient' | 'doctor' };
  onNavigate: (page: 'patient-dashboard' | 'appointment-details') => void;
  onLogout: () => void;
  onSelectDoctor: (doctor: any) => void;
}

export function BookAppointment({ user, onNavigate, onLogout, onSelectDoctor }: BookAppointmentProps) {
  const { theme } = useTheme();
  const [citySearch, setCitySearch] = useState('');
  const [doctorSearch, setDoctorSearch] = useState('');
  const [showCitySuggestions, setShowCitySuggestions] = useState(false);
  const [showDoctorSuggestions, setShowDoctorSuggestions] = useState(false);

  const cities = [
    'Mumbai, Maharashtra',
    'Pune, Maharashtra', 
    'Delhi, Delhi',
    'Bangalore, Karnataka',
    'Chennai, Tamil Nadu',
    'Hyderabad, Telangana',
    'Kochi, Kerala',
    'Jaipur, Rajasthan'
  ];

  const doctors = [
    {
      id: 1,
      name: "Dr. Priti More",
      clinic: "Ayurveda Wellness Center",
      qualification: "MD (Ayurveda)",
      experience: "5 years",
      phone: "+91 98765 43210",
      location: "Pune, Maharashtra",
      speciality: "Panchakarma Specialist"
    },
    {
      id: 2,
      name: "Dr. Priya Sharma", 
      clinic: "Holistic Health Clinic",
      qualification: "BAMS, PhD (Ayurveda)",
      experience: "12 years",
      phone: "+91 87654 32109",
      location: "Pune, Maharashtra",
      speciality: "Herbal Medicine Expert"
    },
    {
      id: 3,
      name: "Dr. Arjun Patel",
      clinic: "Traditional Ayurveda Centre",
      qualification: "BAMS, MS (Ayurveda)",
      experience: "20 years",
      phone: "+91 76543 21098",
      location: "Delhi, Delhi",
      speciality: "Vata Disorders Specialist"
    },
    {
      id: 4,
      name: "Dr. Meera Nair",
      clinic: "Kerala Ayurveda Hospital",
      qualification: "BAMS, MD (Panchakarma)",
      experience: "18 years",
      phone: "+91 65432 10987",
      location: "Kochi, Kerala",
      speciality: "Panchakarma & Rejuvenation"
    }
  ];

  const filteredCities = cities.filter(city => 
    city.toLowerCase().includes(citySearch.toLowerCase())
  );

  const filteredDoctors = doctors.filter(doctor => 
    doctor.name.toLowerCase().includes(doctorSearch.toLowerCase()) ||
    doctor.clinic.toLowerCase().includes(doctorSearch.toLowerCase()) ||
    doctor.speciality.toLowerCase().includes(doctorSearch.toLowerCase())
  );

  const displayedDoctors = citySearch 
    ? doctors.filter(doctor => doctor.location.toLowerCase().includes(citySearch.toLowerCase()))
    : doctorSearch 
    ? filteredDoctors 
    : doctors;

  return (
    <div className="min-h-screen" style={{ 
      background: theme === 'dark' 
        ? 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 25%, #16213e 50%, #0f3460 75%, #0e1a2e 100%)'
        : '#ffffff'
    }}>
      {/* Header */}
      <div className={`border-b ${theme === 'dark' ? 'border-gray-700/50 bg-black/20' : 'border-gray-200 bg-white'} backdrop-blur-md`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                onClick={() => onNavigate('patient-dashboard')}
                className={`${theme === 'dark' ? 'text-gray-400 hover:text-green-400' : 'text-gray-600 hover:text-green-600'}`}
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back
              </Button>
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                <User className="w-7 h-7 text-white" />
              </div>
              <span className={`text-lg font-medium ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                Book Appointment
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-white/90 p-1 shadow-lg ring-2 ring-green-400/50">
                <img 
                  src={newLogoImage} 
                  alt="AyurSutra Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-green-500 to-green-700 bg-clip-text text-transparent">
                AyurSutra
              </span>
            </div>
            
            <Button
              onClick={onLogout}
              variant="outline"
              className={`${
                theme === 'dark' 
                  ? 'border-gray-600 hover:bg-gray-800 text-gray-300' 
                  : 'border-gray-300 hover:bg-gray-100 text-gray-700'
              }`}
            >
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Search Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Card className={`${
            theme === 'dark' 
              ? 'bg-gray-800/80 border-gray-700/50' 
              : 'bg-white border-gray-200 shadow-sm'
          } backdrop-blur-sm`}>
            <CardContent className="p-6">
              <div className="flex gap-4 mb-4">
                <div className="flex-1 relative">
                  <Input
                    placeholder="City"
                    value={citySearch}
                    onChange={(e) => {
                      setCitySearch(e.target.value);
                      setShowCitySuggestions(true);
                      setShowDoctorSuggestions(false);
                    }}
                    onFocus={() => setShowCitySuggestions(true)}
                    className={`${
                      theme === 'dark' 
                        ? 'bg-gray-700/90 border-gray-600 text-white' 
                        : 'bg-white border-gray-200 text-gray-800'
                    }`}
                  />
                  
                  {/* City Suggestions Dropdown */}
                  {showCitySuggestions && citySearch && (
                    <div className={`absolute top-full left-0 right-0 z-10 mt-1 ${
                      theme === 'dark' 
                        ? 'bg-gray-800 border-gray-600' 
                        : 'bg-white border-gray-200'
                    } border rounded-md shadow-lg max-h-40 overflow-y-auto`}>
                      {filteredCities.map((city, index) => (
                        <button
                          key={index}
                          className={`w-full text-left px-3 py-2 text-sm ${
                            theme === 'dark' 
                              ? 'hover:bg-gray-700 text-gray-300' 
                              : 'hover:bg-gray-100 text-gray-700'
                          }`}
                          onClick={() => {
                            setCitySearch(city);
                            setShowCitySuggestions(false);
                          }}
                        >
                          {city}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="flex-1 relative">
                  <Input
                    placeholder="Search Vaidya name/clinic/hospital"
                    value={doctorSearch}
                    onChange={(e) => {
                      setDoctorSearch(e.target.value);
                      setShowDoctorSuggestions(true);
                      setShowCitySuggestions(false);
                    }}
                    onFocus={() => setShowDoctorSuggestions(true)}
                    className={`${
                      theme === 'dark' 
                        ? 'bg-gray-700/90 border-gray-600 text-white' 
                        : 'bg-white border-gray-200 text-gray-800'
                    }`}
                  />
                  
                  {/* Doctor Suggestions Dropdown */}
                  {showDoctorSuggestions && doctorSearch && (
                    <div className={`absolute top-full left-0 right-0 z-10 mt-1 ${
                      theme === 'dark' 
                        ? 'bg-gray-800 border-gray-600' 
                        : 'bg-white border-gray-200'
                    } border rounded-md shadow-lg max-h-40 overflow-y-auto`}>
                      {filteredDoctors.map((doctor, index) => (
                        <button
                          key={index}
                          className={`w-full text-left px-3 py-2 text-sm ${
                            theme === 'dark' 
                              ? 'hover:bg-gray-700 text-gray-300' 
                              : 'hover:bg-gray-100 text-gray-700'
                          }`}
                          onClick={() => {
                            setDoctorSearch(doctor.name);
                            setShowDoctorSuggestions(false);
                          }}
                        >
                          <div>{doctor.name}</div>
                          <div className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                            {doctor.clinic}
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                
                <Button 
                  size="icon" 
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => {
                    setShowCitySuggestions(false);
                    setShowDoctorSuggestions(false);
                  }}
                >
                  <Search className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Doctors List */}
        <div className="space-y-6">
          {displayedDoctors.map((doctor, index) => (
            <motion.div
              key={doctor.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 * (index + 1) }}
            >
              <Card className={`${
                theme === 'dark' 
                  ? 'bg-gray-800/80 border-gray-700/50 hover:border-green-400/50' 
                  : 'bg-white border-gray-200 hover:border-green-400/50 shadow-sm'
              } backdrop-blur-sm transition-colors`}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-6">
                    {/* Doctor Avatar */}
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex-shrink-0 flex items-center justify-center">
                      <User className="w-10 h-10 text-white" />
                    </div>
                    
                    {/* Doctor Info */}
                    <div className="flex-1">
                      <h3 className={`text-xl font-semibold mb-1 ${
                        theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
                      }`}>
                        {doctor.name}
                      </h3>
                      <p className={`mb-2 font-medium ${
                        theme === 'dark' ? 'text-green-400' : 'text-green-600'
                      }`}>
                        {doctor.speciality}
                      </p>
                      <p className={`mb-3 ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {doctor.clinic}
                      </p>
                      
                      <div className="space-y-2">
                        <div className={`flex items-center ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          <Phone className="w-4 h-4 mr-2" />
                          <span>Phone no: {doctor.phone}</span>
                        </div>
                        <div className={`flex items-center ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          <MapPin className="w-4 h-4 mr-2" />
                          <span>Location: {doctor.location}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Book Button */}
                    <Button 
                      className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md"
                      onClick={() => {
                        // Set selected doctor and navigate to appointment details page
                        onSelectDoctor(doctor);
                        onNavigate('appointment-details');
                      }}
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      Book Appointment
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Pagination */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex justify-center items-center space-x-4 mt-8"
        >
          <Button variant="outline" className={`${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Prev
          </Button>
          <span className={`font-medium ${
            theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
          }`}>
            Page 1
          </span>
          <Button variant="outline" className={`${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Next
          </Button>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className={`w-full ${theme === 'dark' ? 'bg-gray-900/50' : 'bg-gray-50'} border-t ${
        theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
      } py-12 px-4 mt-12`}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Leaf className="w-6 h-6 text-green-400" />
                <span className="text-xl font-bold text-green-400">AyurSutra</span>
              </div>
              <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Authentic Panchakarma management for modern wellness.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-green-400 mb-4">Quick Links</h3>
              <ul className={`space-y-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                <li>About Us</li>
                <li>Services</li>
                <li>Practitioners</li>
                <li>Contact</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-green-400 mb-4">Contact Info</h3>
              <ul className={`space-y-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                <li>Email: infoayursutra1111@gmail.com</li>
                <li>Phone: +91 8830159065</li>
                <li>Address: Pune, Maharashtra</li>
              </ul>
            </div>
          </div>
          
          <div className={`border-t ${
            theme === 'dark' ? 'border-gray-700' : 'border-gray-300'
          } mt-8 pt-8 text-center ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            <p>&copy; 2025 AyurSutra. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Click outside handler */}
      {(showCitySuggestions || showDoctorSuggestions) && (
        <div 
          className="fixed inset-0 z-5" 
          onClick={() => {
            setShowCitySuggestions(false);
            setShowDoctorSuggestions(false);
          }}
        />
      )}
    </div>
  );
}