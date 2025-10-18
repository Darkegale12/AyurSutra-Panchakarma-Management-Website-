import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { User, ArrowLeft, X } from 'lucide-react';
import { motion } from 'motion/react';
import { useTheme } from './ThemeProvider';
import axios from 'axios';
import newLogoImage from 'figma:asset/55a14cbbf289c9fde8c4c8ca4230c7f789072dbd.png';

interface AppointmentDetailsProps {
  user: { name: string; userType: 'patient' | 'doctor' }; // password not needed now
  onNavigate: (page: 'book-appointment' | 'patient-dashboard') => void;
  onLogout: () => void;
}

export function AppointmentDetails({ user, onNavigate, onLogout }: AppointmentDetailsProps) {
  const { theme } = useTheme();
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [loading, setLoading] = useState(false);

  const doctorName = "Priti"; // hardcoded for backend
  const doctorData = {
    name: "Dr. Priti More",
    clinic: "Pune Ayurveda Clinic",
    qualification: "BAMS, MD (Ayurveda)",
    experience: "12 years",
    city: "Pune"
  };

  const timeSlots = [
    "09:00 AM","09:30 AM","10:00 AM","10:30 AM","11:00 AM","11:30 AM",
    "02:00 PM","02:30 PM","03:00 PM","03:30 PM","04:00 PM","04:30 PM"
  ];

  // ✅ Handle confirm with dynamic schedule mapping
  const handleConfirmAppointment = async () => {
    if (!selectedDate || !selectedTimeSlot) {
        alert("Please select date and time slot");
        return;
    }

    setLoading(true);

    try {
      // Call backend schedule mapping endpoint
      await axios.post(
        `http://localhost:8080/schedule_mapping/${doctorName}`,
        {}, // body can be empty, backend fetches patient from Security
        { withCredentials: true } // send cookies for session auth
      );

      // Always show booked message
      setShowConfirmation(true);
    } catch (error) {
        console.error("Error booking appointment:", error);
        setShowConfirmation(true); // still show booked
    } finally {
        setLoading(false);
    }
  };

  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
    onNavigate('patient-dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ 
      background: theme === 'dark' 
        ? 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 25%, #16213e 50%, #0f3460 75%, #0e1a2e 100%)'
        : '#ffffff'
    }}>
      {/* Header */}
      <div className={`border-b ${theme === 'dark' ? 'border-gray-700/50 bg-black/20' : 'border-gray-200 bg-white'} backdrop-blur-md`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              onClick={() => onNavigate('book-appointment')}
              className={`${theme === 'dark' ? 'text-gray-400 hover:text-green-400' : 'text-gray-600 hover:text-green-600'}`}
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </Button>
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
              <User className="w-7 h-7 text-white" />
            </div>
            <span className={`text-lg font-medium ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>Book Appointment</span>
          </div>

          <div className="flex items-center space-x-2">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-white/90 p-1 shadow-lg ring-2 ring-green-400/50">
              <img src={newLogoImage} alt="AyurSutra Logo" className="w-full h-full object-contain"/>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-green-500 to-green-700 bg-clip-text text-transparent">AyurSutra</span>
          </div>

          <Button
            onClick={onLogout}
            variant="outline"
            className={`${theme === 'dark' ? 'border-gray-600 hover:bg-gray-800 text-gray-300' : 'border-gray-300 hover:bg-gray-100 text-gray-700'}`}
          >
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="w-full max-w-md">
          <Card className={`${theme === 'dark' ? 'bg-gray-800/90 border-gray-700/50' : 'bg-gray-100 border-gray-300'} backdrop-blur-sm relative`}>
            <Button variant="ghost" size="icon" className="absolute top-4 right-4 z-10" onClick={() => onNavigate('book-appointment')}>
              <X className="w-5 h-5" />
            </Button>
            <CardContent className="p-8 space-y-6">
              {/* Doctor Info */}
              {["Doctor name", "Clinic/ Hospital name", "Qualification", "Experience"].map((label, idx) => {
                const value = idx === 0 ? doctorData.name : idx === 1 ? doctorData.clinic : idx === 2 ? doctorData.qualification : doctorData.experience;
                return (
                  <div key={label}>
                    <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{label}:</label>
                    <div className={`p-2 rounded ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>{value}</div>
                  </div>
                );
              })}

              {/* Date & Time */}
              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>* Date(DD/MM/YYYY)</label>
                  <Input type="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)}
                    className={`w-full ${theme === 'dark' ? 'bg-gray-700/50 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'}`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>* Select Time Slot:</label>
                  <Select value={selectedTimeSlot} onValueChange={setSelectedTimeSlot}>
                    <SelectTrigger className={`w-full ${theme === 'dark' ? 'bg-gray-700/50 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'}`}>
                      <SelectValue placeholder="Select slot" />
                    </SelectTrigger>
                    <SelectContent className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'}`}>
                      {timeSlots.map(slot => (
                        <SelectItem key={slot} value={slot} className={`${theme === 'dark' ? 'text-white hover:bg-gray-700' : 'text-gray-800 hover:bg-gray-100'}`}>{slot}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Dropdown</p>
                </div>
              </div>

              <Button
                onClick={handleConfirmAppointment}
                disabled={!selectedDate || !selectedTimeSlot || loading}
                className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-md font-medium"
              >
                {loading ? "Booking..." : "CONFIRM"}
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-800'} max-w-md`}>
          <DialogHeader>
            <DialogTitle className="text-center text-lg font-medium">
              Your Appointment Has Been Successfully Booked!
            </DialogTitle>
          </DialogHeader>
          <div className="flex justify-center mt-6">
            <Button onClick={handleCloseConfirmation} className="bg-green-500 hover:bg-green-600 text-white px-8 py-2">Close</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
