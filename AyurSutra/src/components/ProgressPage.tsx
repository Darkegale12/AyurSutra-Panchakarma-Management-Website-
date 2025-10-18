import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Leaf, User, ArrowLeft, Check, ChevronDown, Undo2 } from 'lucide-react';
import { motion } from 'motion/react';
import { useTheme } from './ThemeProvider';
import newLogoImage from 'figma:asset/55a14cbbf289c9fde8c4c8ca4230c7f789072dbd.png';

interface ProgressPageProps {
  user: { id: string; name: string; email: string; userType: 'patient' | 'doctor' };
  onNavigate: (page: 'patient-dashboard') => void;
  onLogout: () => void;
}

export function ProgressPage({ user, onNavigate, onLogout }: ProgressPageProps) {
  const { theme } = useTheme();
  const [completedTreatments, setCompletedTreatments] = useState<{ [key: string]: boolean }>({
    vamana: false,
    virechana: false,
    basti: false,
    nasya: false,
    raktamokshana: false
  });
  const [showCompletionDialog, setShowCompletionDialog] = useState(false);

  const treatments = [
    { id: 'vamana', name: 'Vamana', description: 'Therapeutic vomiting therapy' },
    { id: 'virechana', name: 'Virechana', description: 'Therapeutic purgation therapy' },
    { id: 'basti', name: 'Basti', description: 'Medicated enema therapy' },
    { id: 'nasya', name: 'Nasya', description: 'Nasal administration therapy' },
    { id: 'raktamokshana', name: 'Raktamokshana', description: 'Bloodletting therapy' }
  ];

  const handleTreatmentComplete = (treatmentId: string) => {
    const nextIndex = getNextIncompleteIndex();
    const currentTreatmentIndex = treatments.findIndex(t => t.id === treatmentId);
    
    // Only allow completing treatments in sequence (from top to bottom)
    if (currentTreatmentIndex !== nextIndex) {
      alert('Please complete treatments in order from top to bottom.');
      return;
    }

    setCompletedTreatments(prev => {
      const newState = {
        ...prev,
        [treatmentId]: true
      };
      
      // Check if all treatments are completed
      const allCompleted = treatments.every(treatment => newState[treatment.id]);
      if (allCompleted) {
        setTimeout(() => setShowCompletionDialog(true), 500);
      }
      
      return newState;
    });
    
    // Send post-treatment notifications (mock)
    alert(`${treatments.find(t => t.id === treatmentId)?.name} completed! Post-treatment precautions and notifications have been sent.`);
  };

  const handleTreatmentUncheck = (treatmentId: string) => {
    setCompletedTreatments(prev => ({
      ...prev,
      [treatmentId]: false
    }));
  };

  const getNextIncompleteIndex = () => {
    for (let i = 0; i < treatments.length; i++) {
      if (!completedTreatments[treatments[i].id]) {
        return i;
      }
    }
    return treatments.length;
  };

  const getCompletedCount = () => {
    return Object.values(completedTreatments).filter(Boolean).length;
  };

  const isAllCompleted = () => {
    return treatments.every(treatment => completedTreatments[treatment.id]);
  };

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
                onClick={() => onNavigate('patient-dashboard')}
                className="text-gray-600 dark:text-gray-400 hover:text-green-500"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back
              </Button>
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                <User className="w-7 h-7 text-white" />
              </div>
              <span className="text-lg font-medium text-gray-800 dark:text-gray-200">Profile</span>
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
              className="border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
            >
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800 dark:text-gray-200">
            PROGRESS
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Treatment Progress */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 p-6">
              <CardContent className="p-0">
                <div className="space-y-6">
                  {treatments.map((treatment, index) => (
                    <div key={treatment.id} className="space-y-4">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all duration-300 ${
                          completedTreatments[treatment.id]
                            ? 'bg-green-100 dark:bg-green-900/30 border-green-400'
                            : 'bg-gray-100 dark:bg-gray-700/50 border-gray-300 dark:border-gray-600'
                        }`}
                      >
                        <div className="flex-1">
                          <h3 className={`text-lg font-semibold ${
                            completedTreatments[treatment.id]
                              ? 'text-green-800 dark:text-green-300'
                              : 'text-gray-800 dark:text-gray-200'
                          }`}>
                            {treatment.name}
                          </h3>
                          <p className={`text-sm ${
                            completedTreatments[treatment.id]
                              ? 'text-green-600 dark:text-green-400'
                              : 'text-gray-600 dark:text-gray-400'
                          }`}>
                            {treatment.description}
                          </p>
                        </div>
                        
                        <div className="flex space-x-2">
                          {/* Uncheck/Undo button */}
                          {completedTreatments[treatment.id] && (
                            <Button
                              onClick={() => handleTreatmentUncheck(treatment.id)}
                              className="w-10 h-10 rounded-full p-0 bg-gray-500 hover:bg-gray-600"
                              title="Uncheck treatment"
                            >
                              <Undo2 className="w-4 h-4 text-white" />
                            </Button>
                          )}
                          
                          {/* Complete/Check button */}
                          <Button
                            onClick={() => handleTreatmentComplete(treatment.id)}
                            disabled={completedTreatments[treatment.id] || getNextIncompleteIndex() !== index}
                            className={`w-12 h-12 rounded-full p-0 transition-all duration-300 ${
                              completedTreatments[treatment.id]
                                ? 'bg-green-500 hover:bg-green-600'
                                : getNextIncompleteIndex() === index
                                ? 'bg-yellow-500 hover:bg-yellow-600'
                                : 'bg-gray-400 cursor-not-allowed'
                            }`}
                            title={
                              completedTreatments[treatment.id] 
                                ? 'Treatment completed'
                                : getNextIncompleteIndex() === index
                                ? 'Click to complete treatment'
                                : 'Complete previous treatments first'
                            }
                          >
                            {completedTreatments[treatment.id] ? (
                              <Check className="w-6 h-6 text-white" />
                            ) : (
                              <div className={`w-6 h-6 rounded-full ${
                                getNextIncompleteIndex() === index ? 'bg-yellow-400' : 'bg-gray-300'
                              }`} />
                            )}
                          </Button>
                        </div>
                      </motion.div>
                      
                      {/* Arrow between treatments */}
                      {index < treatments.length - 1 && (
                        <div className="flex justify-center">
                          <ChevronDown className={`w-6 h-6 ${
                            completedTreatments[treatment.id]
                              ? 'text-green-500'
                              : 'text-gray-400'
                          }`} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Right Column - Progress Triangle Chart */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 p-6 h-full">
              <CardContent className="p-0 h-full flex items-center justify-center">
                <div className="relative w-full max-w-sm">
                  {/* Progress Triangle */}
                  <svg viewBox="0 0 300 300" className="w-full h-auto">
                    {/* Triangle sections from bottom to top */}
                    {treatments.map((treatment, index) => {
                      const yPos = 250 - (index * 40);
                      const width = 240 - (index * 40);
                      const xPos = 150 - (width / 2);
                      const isCompleted = completedTreatments[treatment.id];
                      const colors = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6'];
                      
                      return (
                        <g key={treatment.id}>
                          <rect
                            x={xPos}
                            y={yPos}
                            width={width}
                            height={30}
                            fill={isCompleted ? colors[index] : '#d1d5db'}
                            stroke={isCompleted ? '#ffffff' : '#9ca3af'}
                            strokeWidth="2"
                            className="transition-all duration-300"
                          />
                          <text
                            x={150}
                            y={yPos + 20}
                            textAnchor="middle"
                            className="fill-white text-sm font-medium"
                            style={{ fontSize: '12px' }}
                          >
                            {treatment.name}
                          </text>
                        </g>
                      );
                    })}
                    
                    {/* Progress indicator */}
                    <circle
                      cx={150}
                      cy={270 - (getCompletedCount() * 40)}
                      r={8}
                      fill="#10b981"
                      stroke="#ffffff"
                      strokeWidth="3"
                      className="animate-pulse"
                    />
                  </svg>
                  
                  {/* Progress Text */}
                  <div className="text-center mt-6">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      Treatment Progress
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {getCompletedCount()} of {treatments.length} treatments completed
                    </p>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-4">
                      <div 
                        className="bg-green-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${(getCompletedCount() / treatments.length) * 100}%` }}
                      />
                    </div>
                    
                    {/* Completion celebration */}
                    {isAllCompleted() && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
                        className="mt-4 p-3 bg-green-100 dark:bg-green-900/30 rounded-lg border border-green-400"
                      >
                        <p className="text-green-800 dark:text-green-300 font-semibold">
                          🎉 All treatments completed!
                        </p>
                      </motion.div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Footer Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="py-16 mt-12 border-t border-gray-200/50 dark:border-gray-700/50"
        >
          <footer className="bg-amber-200/40 dark:bg-black/40 py-12 px-4 border-t border-amber-400/30 dark:border-green-500/20">
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

      {/* Completion Congratulations Dialog */}
      <Dialog open={showCompletionDialog} onOpenChange={setShowCompletionDialog}>
        <DialogContent className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border border-green-500/50 dark:border-green-400/50">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl text-green-600 dark:text-green-400 mb-4">
              🎉 Congratulations! 🎉
            </DialogTitle>
          </DialogHeader>
          
          <div className="text-center py-6">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 100 }}
            >
              <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10 text-white" />
              </div>
              
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                You have successfully completed the treatment!
              </h2>
              
              <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                Congratulations on completing your Panchakarma journey. Your dedication to health and wellness is truly commendable.
              </p>
              
              <Button 
                onClick={() => setShowCompletionDialog(false)}
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-3"
              >
                Continue to Dashboard
              </Button>
            </motion.div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}