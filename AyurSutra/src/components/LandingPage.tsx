import React, { useRef } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Leaf, Star, Users, Calendar, Activity, Shield, Bell, MessageSquare, Sun, Moon } from 'lucide-react';
import { motion } from 'motion/react';
import { useTheme } from './ThemeProvider';
import newMeditationFigure from 'figma:asset/0ee0414eef781f4af38704040ee4b56e19b91d16.png';
import newLogoImage from 'figma:asset/55a14cbbf289c9fde8c4c8ca4230c7f789072dbd.png';

interface LandingPageProps {
  onNavigate: (page: 'patient-login' | 'doctor-login' | 'vaman' | 'virechan' | 'basti' | 'nasya' | 'raktamokshana') => void;
}

export function LandingPage({ onNavigate }: LandingPageProps) {
  const aboutRef = useRef<HTMLElement>(null);
  const featuresRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);
  const { theme, toggleTheme } = useTheme();

  const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleTreatmentClick = (treatmentName: string) => {
    const treatmentPageMap: { [key: string]: 'vaman' | 'virechan' | 'basti' | 'nasya' | 'raktamokshana' } = {
      'Vaman': 'vaman',
      'Virechan': 'virechan',
      'Basti': 'basti',
      'Nasya': 'nasya',
      'Raktamokshana': 'raktamokshana'
    };
    const page = treatmentPageMap[treatmentName];
    if (page) {
      onNavigate(page);
    }
  };

  const panchakarmaTreatments = [
    { name: 'Vaman', position: { top: '10%', left: '15%' } },
    { name: 'Virechan', position: { top: '10%', right: '15%' } },
    { name: 'Basti', position: { top: '70%', left: '10%' } },
    { name: 'Nasya', position: { top: '70%', right: '10%' } },
    { name: 'Raktamokshana', position: { bottom: '5%', left: '50%', transform: 'translateX(-50%)' } }
  ];

  const treatmentBoxes = [
    { name: 'Vaman', description: 'Therapeutic vomiting for detoxification', icon: <Activity className="w-8 h-8 text-green-400" /> },
    { name: 'Virechan', description: 'Therapeutic purgation for cleansing', icon: <Leaf className="w-8 h-8 text-green-400" /> },
    { name: 'Basti', description: 'Medicated enema therapy', icon: <Shield className="w-8 h-8 text-green-400" /> },
    { name: 'Nasya', description: 'Nasal administration of medicines', icon: <Star className="w-8 h-8 text-green-400" /> },
    { name: 'Raktamokshana', description: 'Bloodletting therapy for purification', icon: <Users className="w-8 h-8 text-green-400" /> }
  ];

  const features = [
    { 
      title: 'Automated Scheduling', 
      description: 'AI-powered scheduling system for optimal therapy timing',
      icon: <Calendar className="w-12 h-12 text-green-400" />
    },
    { 
      title: 'Real-time Progress Tracking', 
      description: 'Monitor your healing journey with detailed progress analytics',
      icon: <Activity className="w-12 h-12 text-green-400" />
    },
    { 
      title: 'Pre & Post Procedure Notifications', 
      description: 'Comprehensive guidance for treatment preparation and aftercare',
      icon: <Bell className="w-12 h-12 text-green-400" />
    },
    { 
      title: 'Feedback System', 
      description: 'Share your experience and help improve treatment outcomes',
      icon: <MessageSquare className="w-12 h-12 text-green-400" />
    }
  ];

  return (
    <div className="min-h-screen text-white dark:text-white text-gray-900" style={{
      background: theme === 'dark' 
        ? 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 25%, #16213e 50%, #0f3460 75%, #0e1a2e 100%)'
        : 'linear-gradient(135deg, #ffffff 0%, #f0fdf4 25%, #ffffff 50%, #f7fdf9 75%, #ffffff 100%)'
    }}>
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-brown-200/60 dark:bg-black/20 backdrop-blur-md border-b border-brown-400/30 dark:border-green-500/20" style={{
        backgroundColor: theme === 'dark' ? 'rgba(0, 0, 0, 0.2)' : 'rgba(212, 181, 163, 0.6)'
      }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-white/90 p-1 shadow-lg ring-2 ring-green-400/50">
                <img 
                  src={newLogoImage} 
                  alt="AyurSutra Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                AyurSutra
              </span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="hover:text-green-400 transition-colors duration-200"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection(featuresRef)}
                className="hover:text-green-400 transition-colors duration-200"
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection(aboutRef)}
                className="hover:text-green-400 transition-colors duration-200"
              >
                About Us
              </button>
              <button 
                onClick={() => scrollToSection(contactRef)}
                className="hover:text-green-400 transition-colors duration-200"
              >
                Contact
              </button>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-full p-1 border border-gray-200 dark:border-gray-600">
                <Button
                  variant={theme === 'light' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => theme === 'dark' && toggleTheme()}
                  className="rounded-full px-3 py-1 text-xs bg-gray-800 text-white hover:bg-gray-700"
                >
                  Light
                </Button>
                <Button
                  variant={theme === 'dark' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => theme === 'light' && toggleTheme()}
                  className="rounded-full px-3 py-1 text-xs bg-white text-gray-700 hover:bg-gray-100"
                >
                  Dark
                </Button>
              </div>
              <Button 
                onClick={() => onNavigate('patient-login')}
                className="bg-green-600 hover:bg-green-700 text-white px-6"
              >
                Login / Sign Up
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
        {/* Animated background particles */}
        <div className="absolute inset-0 bg-[rgba(0,0,0,0)]">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-green-400 rounded-full opacity-20"
              animate={{
                x: [0, Math.random() * 100 - 50],
                y: [0, Math.random() * 100 - 50],
                opacity: [0.2, 0.5, 0.2]
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
            />
          ))}
        </div>

        <div className="text-center mb-8 z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-amber-800 to-green-700 dark:from-green-400 dark:via-green-500 dark:to-green-600 bg-clip-text text-transparent"
          >
            AyurSutra
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-xl md:text-2xl text-amber-900 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed"
          >
            "स्वस्थस्य स्वास्थ्य रक्षणं आतुरस्य विकार प्रशमनं च"
            <br />
            <span className="text-lg text-green-400 mt-2 block">
              Preserve health of the healthy and cure diseases of the sick through authentic Panchakarma
            </span>
          </motion.p>
        </div>

        {/* Central Meditation Figure with Treatments */}
        <div className="relative w-[48rem] h-[48rem] mb-12">
          {/* Central meditation figure with semicircular treatment positioning */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              {/* Glowing aura effect */}
              <motion.div
                className="absolute inset-0 rounded-full blur-2xl"
                style={{
                  background: theme === 'dark' 
                    ? 'radial-gradient(circle, rgba(34, 197, 94, 0.2) 0%, transparent 70%)'
                    : 'radial-gradient(circle, rgba(168, 196, 168, 0.3) 0%, transparent 70%)',
                  width: '480px', 
                  height: '480px'
                }}
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              {/* Main meditation figure - increased size */}
              <div className="relative z-10 w-[32rem] h-[32rem] flex items-center justify-center">
                <img 
                  src={newMeditationFigure}
                  alt="Meditation Figure"
                  className="w-full h-full object-contain"
                  style={{
                    filter: theme === 'dark' 
                      ? 'drop-shadow(0 0 30px rgba(34, 197, 94, 0.4))' 
                      : 'drop-shadow(0 0 20px rgba(168, 196, 168, 0.4))',
                  }}
                />
                
                {/* Treatment circles positioned in proper semicircle - static positioning */}
                {/* Top center - Vaman */}
                <div
                  className="absolute bg-amber-600/90 dark:bg-green-500/90 text-white rounded-full w-16 h-16 flex items-center justify-center text-xs font-semibold cursor-pointer hover:scale-110 transition-transform shadow-lg"
                  style={{ top: '-4rem', left: '50%', transform: 'translateX(-50%)' }}
                  onClick={() => handleTreatmentClick('Vaman')}
                >
                  Vaman
                </div>
                
                {/* Top right - Virechan */}
                <div
                  className="absolute bg-amber-600/90 dark:bg-green-500/90 text-white rounded-full w-16 h-16 flex items-center justify-center text-xs font-semibold cursor-pointer hover:scale-110 transition-transform shadow-lg"
                  style={{ top: '-1rem', right: '-4rem' }}
                  onClick={() => handleTreatmentClick('Virechan')}
                >
                  Virechan
                </div>
                
                {/* Top left - Basti */}
                <div
                  className="absolute bg-amber-600/90 dark:bg-green-500/90 text-white rounded-full w-16 h-16 flex items-center justify-center text-xs font-semibold cursor-pointer hover:scale-110 transition-transform shadow-lg"
                  style={{ top: '-1rem', left: '-4rem' }}
                  onClick={() => handleTreatmentClick('Basti')}
                >
                  Basti
                </div>
                
                {/* Bottom right - Nasya */}
                <div
                  className="absolute bg-amber-600/90 dark:bg-green-500/90 text-white rounded-full w-16 h-16 flex items-center justify-center text-xs font-semibold cursor-pointer hover:scale-110 transition-transform shadow-lg"
                  style={{ bottom: '2rem', right: '-3rem' }}
                  onClick={() => handleTreatmentClick('Nasya')}
                >
                  Nasya
                </div>
                
                {/* Bottom left - Raktamokshana */}
                <div
                  className="absolute bg-green-600/90 dark:bg-emerald-500/90 text-white rounded-full w-16 h-16 flex items-center justify-center text-xs font-semibold cursor-pointer hover:scale-110 transition-transform shadow-lg"
                  style={{ bottom: '2rem', left: '-3rem' }}
                  onClick={() => handleTreatmentClick('Raktamokshana')}
                >
                  <div className="text-center leading-tight">
                    Raktamo-<br/>kshana
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Login Options */}
        <motion.div 
          className="flex space-x-6 z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <Button 
            onClick={() => onNavigate('patient-login')}
            className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-3 text-lg rounded-full shadow-lg hover:shadow-green-500/25 transition-all duration-300"
          >
            Login as Patient
          </Button>
          <Button 
            onClick={() => onNavigate('doctor-login')}
            className="bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white px-8 py-3 text-lg rounded-full shadow-lg transition-all duration-300"
          >
            Login as Doctor
          </Button>
        </motion.div>
      </section>

      {/* Treatment Boxes Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-amber-800 to-green-700 dark:from-green-400 dark:to-green-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Five Pillars of Panchakarma
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* First row - 3 boxes */}
            {treatmentBoxes.slice(0, 3).map((treatment, index) => (
              <motion.div
                key={treatment.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card 
                  className="bg-amber-100/90 dark:bg-gray-800/80 backdrop-blur-sm border-amber-300/50 dark:border-green-500/20 hover:border-amber-500/60 dark:hover:border-green-400/40 transition-all duration-300 h-full cursor-pointer"
                  onClick={() => handleTreatmentClick(treatment.name)}
                >
                  <CardContent className="p-6 text-center">
                    <div className="mb-4 flex justify-center">
                      {treatment.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-amber-800 dark:text-green-400 mb-2">{treatment.name}</h3>
                    <p className="text-amber-900 dark:text-gray-300">{treatment.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
            
            {/* Second row - 2 boxes centered */}
            <div className="md:col-span-3 flex justify-center">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl">
                {treatmentBoxes.slice(3, 5).map((treatment, index) => (
                  <motion.div
                    key={treatment.name}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: (index + 3) * 0.2 }}
                  >
                    <Card 
                      className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 dark:from-gray-800/50 dark:to-gray-900/50 from-white/80 to-green-50/80 border-green-500/20 dark:border-green-500/20 border-green-200 hover:border-green-400/40 transition-all duration-300 h-full cursor-pointer"
                      onClick={() => handleTreatmentClick(treatment.name)}
                    >
                      <CardContent className="p-6 text-center">
                        <div className="mb-4 flex justify-center">
                          {treatment.icon}
                        </div>
                        <h3 className="text-xl font-semibold text-pink-600 dark:text-green-400 mb-2">{treatment.name}</h3>
                        <p className="text-gray-700 dark:text-gray-300">{treatment.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-amber-800 to-green-700 dark:from-green-400 dark:to-green-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Platform Features
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <Card className="bg-amber-100/90 dark:bg-gray-800/80 backdrop-blur-sm border-amber-300/50 dark:border-green-500/20 hover:border-amber-500/60 dark:hover:border-green-400/40 transition-all duration-300 h-full">
                  <CardContent className="p-8">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        {feature.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-amber-800 dark:text-green-400 mb-2">{feature.title}</h3>
                        <p className="text-amber-900 dark:text-gray-300 leading-relaxed">{feature.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section ref={aboutRef} className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            className="text-4xl font-bold mb-8 bg-gradient-to-r from-amber-800 to-green-700 dark:from-green-400 dark:to-green-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            About AyurSutra
          </motion.h2>
          <motion.p 
            className="text-lg text-amber-900 dark:text-gray-300 leading-relaxed mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            AyurSutra bridges the ancient wisdom of Panchakarma with modern technology to provide 
            comprehensive wellness management. Our platform ensures authentic traditional treatments 
            while leveraging digital innovation for enhanced patient care and practitioner efficiency.
          </motion.p>
          <motion.p 
            className="text-lg text-amber-900 dark:text-gray-300 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            With the global Ayurveda market projected to reach USD 16 billion by 2026, we're 
            committed to maintaining the authenticity and quality of Panchakarma treatments 
            while making them accessible through intelligent automation and personalized care.
          </motion.p>
        </div>
      </section>

      {/* Footer */}
      <footer ref={contactRef} className="bg-amber-200/40 dark:bg-black/40 py-12 px-4 border-t border-amber-400/30 dark:border-green-500/20">
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
                <li>
                  <button 
                    onClick={() => scrollToSection(aboutRef)}
                    className="hover:text-green-400 transition-colors"
                  >
                    About Us
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection(featuresRef)}
                    className="hover:text-green-400 transition-colors"
                  >
                    Services
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => onNavigate('doctor-login')}
                    className="hover:text-green-400 transition-colors"
                  >
                    Practitioners
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection(contactRef)}
                    className="hover:text-green-400 transition-colors"
                  >
                    Contact
                  </button>
                </li>
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
    </div>
  );
}