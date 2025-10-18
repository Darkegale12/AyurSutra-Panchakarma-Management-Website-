import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Leaf, User, Calendar, TrendingUp, FileText, Heart, MessageSquare, Settings } from 'lucide-react';
import { motion } from 'motion/react';
import { useTheme } from './ThemeProvider';
import newLogoImage from 'figma:asset/55a14cbbf289c9fde8c4c8ca4230c7f789072dbd.png';

interface PatientDashboardProps {
  user: { id: string; name: string; email: string; userType: 'patient' | 'doctor' };
  onNavigate: (page: 'landing' | 'wellness-tips' | 'appointments' | 'book-appointment' | 'profile' | 'progress' | 'medical-reports' | 'feedback') => void;
  onLogout: () => void;
}

export function PatientDashboard({ user, onNavigate, onLogout }: PatientDashboardProps) {
  const { theme } = useTheme();

  const dashboardItems = [
    {
      title: 'My Appointments',
      description: 'View and manage your scheduled appointments',
      icon: <Calendar className="w-12 h-12 text-green-500" />,
      onClick: () => onNavigate('appointments')
    },
    {
      title: 'Book An Appointment',
      description: 'Schedule new appointments with practitioners',
      icon: <Calendar className="w-12 h-12 text-purple-500" />,
      onClick: () => onNavigate('book-appointment')
    },
    {
      title: 'Progress',
      description: 'Track your treatment progress and milestones',
      icon: <TrendingUp className="w-12 h-12 text-blue-500" />,
      onClick: () => onNavigate('progress')
    },
    {
      title: 'Medical Reports',
      description: 'Upload and view your medical documents',
      icon: <FileText className="w-12 h-12 text-orange-500" />,
      onClick: () => onNavigate('medical-reports')
    },
    {
      title: 'Wellness Tips',
      description: 'Get personalized wellness recommendations',
      icon: <Heart className="w-12 h-12 text-pink-500" />,
      onClick: () => onNavigate('wellness-tips')
    },
    {
      title: 'Feedback',
      description: 'Share your treatment experience and feedback',
      icon: <MessageSquare className="w-12 h-12 text-indigo-500" />,
      onClick: () => onNavigate('feedback')
    }
  ];

  return (
    <div className="min-h-screen" style={{ 
      background: theme === 'dark' 
        ? 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 25%, #16213e 50%, #0f3460 75%, #0e1a2e 100%)'
        : 'linear-gradient(135deg, #ffffff 0%, #f0fdf4 25%, #ffffff 50%, #f7fdf9 75%, #ffffff 100%)'
    }}>
      {/* Header */}
      <div className="border-b border-opacity-20 bg-white/10 dark:bg-black/20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                onClick={() => onNavigate('profile')}
                className="flex items-center space-x-3 text-gray-600 dark:text-gray-400 hover:text-green-500"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                  <User className="w-7 h-7 text-white" />
                </div>
                <span className="text-lg font-medium text-gray-800 dark:text-gray-200">Profile</span>
              </Button>
            </div>
            
            <div className="flex items-center space-x-3">
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
              className="border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
            >
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Welcome Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800 dark:text-gray-200">
            Welcome {user.name}
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-green-600 mx-auto"></div>
        </motion.div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {dashboardItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card 
                className="cursor-pointer h-48 transition-all duration-300 hover:scale-105 hover:shadow-2xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50"
                onClick={item.onClick}
              >
                <CardContent className="p-8 flex flex-col items-center justify-center h-full text-center">
                  <div className="mb-4 transform transition-transform hover:scale-110">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Footer Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="py-16 border-t border-gray-200/50 dark:border-gray-700/50"
        >
          <footer className="bg-amber-200/40 dark:bg-black/40 py-12 px-4 border-t border-amber-400/30 dark:border-green-500/20 px-[16px] py-[48px] mx-[-204px] my-[-20px]">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <div className="flex items-center space-x-2 mb-4">
                    <Leaf className="w-6 h-6 text-green-400" />
                    <span className="text-xl font-bold text-green-400">AyurSutra</span>
                  </div>
                  <p className="text-gray-400 dark:text-gray-400 text-gray-700">
                    Authentic Panchakarma management for modern wellness.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-green-400 mb-4">Quick Links</h3>
                  <ul className="space-y-2 text-gray-400 dark:text-gray-400 text-gray-700">
                    <li>About Us</li>
                    <li>Services</li>
                    <li>Practitioners</li>
                    <li>Contact</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-green-400 mb-4">Contact Info</h3>
                  <ul className="space-y-2 text-gray-400 dark:text-gray-400 text-gray-700">
                    <li>Email: infoayursutra1111@gmail.com</li>
                    <li>Phone: +91 8830159065</li>
                    <li>Address: Pune, Maharashtra</li>
                  </ul>
                </div>
              </div>
              
              <div className="border-t border-green-500/20 dark:border-green-500/20 border-green-200 mt-8 pt-8 text-center text-gray-400 dark:text-gray-400 text-gray-700">
                <p>&copy; 2025 AyurSutra. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </motion.div>
      </div>
    </div>
  );
}