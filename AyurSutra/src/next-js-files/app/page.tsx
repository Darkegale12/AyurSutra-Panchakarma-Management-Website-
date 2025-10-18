'use client'

import React, { useState } from 'react';
import { LandingPage } from '@/components/LandingPage';
import { PatientLogin } from '@/components/PatientLogin';
import { DoctorLogin } from '@/components/DoctorLogin';
import { PatientRegister } from '@/components/PatientRegister';

type PageType = 'landing' | 'patient-login' | 'doctor-login' | 'patient-register' | 'patient-dashboard';
type UserType = { id: string; name: string; email: string; userType: 'patient' | 'doctor' } | null;

export default function Home() {
  const [currentPage, setCurrentPage] = useState<PageType>('landing');
  const [user, setUser] = useState<UserType>(null);

  const handleNavigation = (page: PageType) => {
    setCurrentPage(page);
  };

  const handleLogin = (userData: { id: string; name: string; email: string; userType: 'patient' | 'doctor' }) => {
    setUser(userData);
    if (userData.userType === 'patient') {
      setCurrentPage('patient-dashboard');
    }
    // Doctor dashboard would go here when implemented
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('landing');
  };

  // For now, show a simple dashboard for logged-in patients
  if (user && currentPage === 'patient-dashboard') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-green-400">
              Welcome, {user.name}!
            </h1>
            <button
              onClick={handleLogout}
              className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition-colors"
            >
              Logout
            </button>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-6 border border-green-500/20">
            <h2 className="text-xl font-semibold mb-4 text-green-400">Patient Dashboard</h2>
            <p className="text-gray-300 mb-4">
              Your personalized Panchakarma treatment dashboard is coming soon!
            </p>
            <p className="text-gray-400 text-sm">
              This will include treatment schedules, progress tracking, and communication with your practitioner.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {currentPage === 'landing' && (
        <LandingPage onNavigate={handleNavigation} />
      )}
      {currentPage === 'patient-login' && (
        <PatientLogin onNavigate={handleNavigation} onLogin={handleLogin} />
      )}
      {currentPage === 'doctor-login' && (
        <DoctorLogin onNavigate={handleNavigation} onLogin={handleLogin} />
      )}
      {currentPage === 'patient-register' && (
        <PatientRegister onNavigate={handleNavigation} />
      )}
    </div>
  );
}