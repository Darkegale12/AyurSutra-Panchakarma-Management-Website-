'use client'

import React, { useRef } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Leaf, Star, Users, Calendar, Activity, Shield, Bell, MessageSquare } from 'lucide-react';
import { motion } from 'motion/react';

interface LandingPageProps {
  onNavigate: (page: 'patient-login' | 'doctor-login') => void;
}

export function LandingPage({ onNavigate }: LandingPageProps) {
  const aboutRef = useRef<HTMLElement>(null);
  const featuresRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const panchakarmaTreatments = [
    { name: 'Vaman', position: { top: '15%', left: '18%' } },
    { name: 'Virechan', position: { top: '15%', right: '18%' } },
    { name: 'Basti', position: { top: '65%', left: '12%' } },
    { name: 'Nasya', position: { top: '65%', right: '12%' } },
    { name: 'Raktamokshana', position: { bottom: '15%', left: '50%', transform: 'translateX(-50%)' } }
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
    <div className="min-h-screen text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-md border-b border-green-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Leaf className="w-8 h-8 text-green-400" />
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
                onClick={() => scrollToSection(aboutRef)}
                className="hover:text-green-400 transition-colors duration-200"
              >
                About Us
              </button>
              <button 
                onClick={() => scrollToSection(featuresRef)}
                className="hover:text-green-400 transition-colors duration-200"
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection(contactRef)}
                className="hover:text-green-400 transition-colors duration-200"
              >
                Contact
              </button>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="outline" className="border-green-400 text-green-400 hover:bg-green-400 hover:text-black">
                Sign Up
              </Button>
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                Login
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
        {/* Animated background particles */}
        <div className="absolute inset-0">
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
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-green-400 via-green-500 to-green-600 bg-clip-text text-transparent"
          >
            AyurSutra
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
          >
            "स्वस्थस्य स्वास्थ्य रक्षणं आतुरस्य विकार प्रशमनं च"
            <br />
            <span className="text-lg text-green-400 mt-2 block">
              Preserve health of the healthy and cure diseases of the sick through authentic Panchakarma
            </span>
          </motion.p>
        </div>

        {/* Central Meditation Figure with Treatments */}
        <div className="relative w-[28rem] h-[28rem] mb-12">
          {/* Central meditation figure */}
          <motion.div 
            className="absolute inset-0 flex items-center justify-center"
            animate={{ 
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="relative">
              {/* Glowing aura effect */}
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-green-400/30 to-transparent blur-xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{ width: '200px', height: '200px' }}
              />
              {/* Replace with a placeholder for meditation figure */}
              <div className="w-48 h-48 rounded-full bg-gradient-to-br from-green-400/20 to-green-600/20 border-2 border-green-400/30 flex items-center justify-center relative z-10">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-400/30 rounded-full mx-auto mb-2 flex items-center justify-center">
                    <Leaf className="w-8 h-8 text-green-400" />
                  </div>
                  <p className="text-green-300 text-sm">Meditation</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Treatment names positioned around the figure */}
          {panchakarmaTreatments.map((treatment, index) => (
            <motion.div
              key={treatment.name}
              className="absolute bg-gradient-to-r from-green-500/40 to-green-600/40 backdrop-blur-md border-2 border-green-400/50 rounded-full min-w-24 h-12 flex items-center justify-center font-semibold text-green-100 shadow-lg shadow-green-500/25"
              style={{
                ...treatment.position,
                padding: '0 20px',
                fontSize: '0.95rem',
                letterSpacing: '0.025em'
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.15 + 1,
                type: "spring",
                stiffness: 120,
                damping: 10
              }}
              whileHover={{ 
                scale: 1.15, 
                backgroundColor: 'rgba(34, 197, 94, 0.6)',
                borderColor: 'rgba(34, 197, 94, 0.8)',
                boxShadow: '0 0 30px rgba(34, 197, 94, 0.5)'
              }}
            >
              {treatment.name}
            </motion.div>
          ))}
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
            className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent"
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
                <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-green-500/20 hover:border-green-400/40 transition-all duration-300 h-full">
                  <CardContent className="p-6 text-center">
                    <div className="mb-4 flex justify-center">
                      {treatment.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-green-400 mb-2">{treatment.name}</h3>
                    <p className="text-gray-300">{treatment.description}</p>
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
                    <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-green-500/20 hover:border-green-400/40 transition-all duration-300 h-full">
                      <CardContent className="p-6 text-center">
                        <div className="mb-4 flex justify-center">
                          {treatment.icon}
                        </div>
                        <h3 className="text-xl font-semibold text-green-400 mb-2">{treatment.name}</h3>
                        <p className="text-gray-300">{treatment.description}</p>
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
      <section ref={featuresRef} className="py-20 px-4 bg-black/20">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent"
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
                <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-green-500/20 hover:border-green-400/40 transition-all duration-300 h-full">
                  <CardContent className="p-8">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        {feature.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-green-400 mb-2">{feature.title}</h3>
                        <p className="text-gray-300 leading-relaxed">{feature.description}</p>
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
            className="text-4xl font-bold mb-8 bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            About AyurSutra
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-300 leading-relaxed mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            AyurSutra bridges the ancient wisdom of Panchakarma with modern technology to provide 
            comprehensive wellness management. Our platform ensures authentic traditional treatments 
            while leveraging digital innovation for enhanced patient care and practitioner efficiency.
          </motion.p>
          <motion.p 
            className="text-lg text-gray-300 leading-relaxed"
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
      <footer ref={contactRef} className="bg-black/40 py-12 px-4 border-t border-green-500/20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Leaf className="w-6 h-6 text-green-400" />
                <span className="text-xl font-bold text-green-400">AyurSutra</span>
              </div>
              <p className="text-gray-400">
                Authentic Panchakarma management for modern wellness.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-green-400 mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-green-400 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-green-400 transition-colors">Services</a></li>
                <li><a href="#" className="hover:text-green-400 transition-colors">Practitioners</a></li>
                <li><a href="#" className="hover:text-green-400 transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-green-400 mb-4">Contact Info</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Email: info@ayursutra.com</li>
                <li>Phone: +91 98765 43210</li>
                <li>Address: Mumbai, Maharashtra</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-green-500/20 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 AyurSutra. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}