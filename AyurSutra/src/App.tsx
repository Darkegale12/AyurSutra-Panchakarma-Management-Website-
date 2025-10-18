import React, { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { PatientLogin } from './components/PatientLogin';
import { DoctorLogin } from './components/DoctorLogin';
import { PatientRegister } from './components/PatientRegister';
import { PatientDashboard } from './components/PatientDashboard';
import { WellnessTips } from './components/WellnessTips';
import { AppointmentsPage } from './components/AppointmentsPage';
import { BookAppointment } from './components/BookAppointment';
import { ProfilePage } from './components/ProfilePage';
import { ProgressPage } from './components/ProgressPage';
import { MedicalReportsPage } from './components/MedicalReportsPage';
import { FeedbackPage } from './components/FeedbackPage';
import { VamanPage } from './components/treatments/VamanPage';
import { VirechanPage } from './components/treatments/VirechanPage';
import { BastiPage } from './components/treatments/BastiPage';
import { NasyaPage } from './components/treatments/NasyaPage';
import { RaktamokshanaPage } from './components/treatments/RaktamokshanaPage';
import { AppointmentDetails } from './components/AppointmentDetails';
import { ThemeProvider } from './components/ThemeProvider';

type PageType = 'landing' | 'patient-login' | 'doctor-login' | 'patient-register' | 'patient-dashboard' | 'wellness-tips' | 'appointments' | 'book-appointment' | 'appointment-details' | 'profile' | 'progress' | 'medical-reports' | 'feedback' | 'vaman' | 'virechan' | 'basti' | 'nasya' | 'raktamokshana';
type UserType = { id: string; name: string; email: string; userType: 'patient' | 'doctor' } | null;

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('landing');
  const [user, setUser] = useState<UserType>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);

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



  return (
    <ThemeProvider>
      <div className="min-h-screen">
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
        {currentPage === 'patient-dashboard' && user && (
          <PatientDashboard user={user} onNavigate={handleNavigation} onLogout={handleLogout} />
        )}
        {currentPage === 'wellness-tips' && user && (
          <WellnessTips user={user} onNavigate={handleNavigation} onLogout={handleLogout} />
        )}
        {currentPage === 'appointments' && user && (
          <AppointmentsPage user={user} onNavigate={handleNavigation} onLogout={handleLogout} />
        )}
        {currentPage === 'book-appointment' && user && (
          <BookAppointment 
            user={user} 
            onNavigate={handleNavigation} 
            onLogout={handleLogout} 
            onSelectDoctor={setSelectedDoctor}
          />
        )}
        {currentPage === 'appointment-details' && user && (
          <AppointmentDetails 
            user={user} 
            onNavigate={handleNavigation} 
            onLogout={handleLogout} 
            selectedDoctor={selectedDoctor}
          />
        )}
        {currentPage === 'profile' && user && (
          <ProfilePage user={user} onNavigate={handleNavigation} onLogout={handleLogout} />
        )}
        {currentPage === 'progress' && user && (
          <ProgressPage user={user} onNavigate={handleNavigation} onLogout={handleLogout} />
        )}
        {currentPage === 'medical-reports' && user && (
          <MedicalReportsPage user={user} onNavigate={handleNavigation} onLogout={handleLogout} />
        )}
        {currentPage === 'feedback' && user && (
          <FeedbackPage user={user} onNavigate={handleNavigation} onLogout={handleLogout} />
        )}
        {currentPage === 'vaman' && (
          <VamanPage onNavigate={handleNavigation} />
        )}
        {currentPage === 'virechan' && (
          <VirechanPage onNavigate={handleNavigation} />
        )}
        {currentPage === 'basti' && (
          <BastiPage onNavigate={handleNavigation} />
        )}
        {currentPage === 'nasya' && (
          <NasyaPage onNavigate={handleNavigation} />
        )}
        {currentPage === 'raktamokshana' && (
          <RaktamokshanaPage onNavigate={handleNavigation} />
        )}
      </div>
    </ThemeProvider>
  );
}