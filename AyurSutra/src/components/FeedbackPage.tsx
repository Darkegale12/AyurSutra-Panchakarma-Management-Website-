import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Textarea } from './ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Leaf, User, ArrowLeft, MessageSquare } from 'lucide-react';
import { motion } from 'motion/react';
import { useTheme } from './ThemeProvider';
import newLogoImage from 'figma:asset/55a14cbbf289c9fde8c4c8ca4230c7f789072dbd.png';

interface FeedbackPageProps {
  user: { id: string; name: string; email: string; userType: 'patient' | 'doctor' };
  onNavigate: (page: 'patient-dashboard' | 'feedback-view') => void;
  onLogout: () => void;
}

interface FeedbackEntry {
  id: number;
  treatment: string;
  feedback: string;
  date: string;
}

export function FeedbackPage({ user, onNavigate, onLogout }: FeedbackPageProps) {
  const { theme } = useTheme();
  const [selectedTreatment, setSelectedTreatment] = useState<string | null>(null);
  const [feedbackText, setFeedbackText] = useState('');
  const [showFeedbackDialog, setShowFeedbackDialog] = useState(false);
  const [submittedFeedbacks, setSubmittedFeedbacks] = useState<FeedbackEntry[]>([]);
  const [feedbackTexts, setFeedbackTexts] = useState<{[key: string]: string}>({});

  const treatments = [
    { id: 'vamana', name: 'Vamana', description: 'Therapeutic vomiting therapy' },
    { id: 'virechana', name: 'Virechana', description: 'Therapeutic purgation therapy' },
    { id: 'basti', name: 'Basti', description: 'Medicated enema therapy' },
    { id: 'nasya', name: 'Nasya', description: 'Nasal administration therapy' },
    { id: 'raktamokshana', name: 'Raktamokshana', description: 'Bloodletting therapy' }
  ];

  const handleFeedbackClick = (treatmentId: string) => {
    setSelectedTreatment(treatmentId);
    setShowFeedbackDialog(true);
    setFeedbackText('');
  };

  const handleSubmitFeedback = (treatmentId: string) => {
    const currentFeedback = feedbackTexts[treatmentId] || '';
    if (currentFeedback.trim()) {
      const newFeedback: FeedbackEntry = {
        id: submittedFeedbacks.length + 1,
        treatment: treatments.find(t => t.id === treatmentId)?.name || '',
        feedback: currentFeedback,
        date: new Date().toLocaleDateString()
      };
      
      setSubmittedFeedbacks(prev => [...prev, newFeedback]);
      setFeedbackTexts(prev => ({ ...prev, [treatmentId]: '' }));
      
      alert('Feedback submitted successfully!');
    }
  };

  const handleFeedbackTextChange = (treatmentId: string, text: string) => {
    setFeedbackTexts(prev => ({ ...prev, [treatmentId]: text }));
  };

  const handleViewFeedbacks = () => {
    // This would navigate to a feedback view page
    // For now, we'll show an alert with the feedbacks
    if (submittedFeedbacks.length > 0) {
      const feedbackList = submittedFeedbacks.map(f => 
        `${f.treatment} (${f.date}): ${f.feedback}`
      ).join('\n\n');
      alert(`Your Submitted Feedbacks:\n\n${feedbackList}`);
    } else {
      alert('No feedbacks submitted yet.');
    }
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
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800 dark:text-gray-200">
            FEEDBACK
          </h1>
        </motion.div>

        {/* Feedback Blocks */}
        <div className="space-y-6 mb-8">
          {treatments.map((treatment, index) => (
            <motion.div
              key={treatment.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 hover:scale-[1.02] transition-transform duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 text-center mb-4">
                        {treatment.name}
                      </h3>
                      <div className="flex items-center space-x-4">
                        <div className="flex-1">
                          <Textarea
                            value={feedbackTexts[treatment.id] || ''}
                            onChange={(e) => handleFeedbackTextChange(treatment.id, e.target.value)}
                            placeholder="Write your feedback here..."
                            className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 resize-none min-h-16"
                            rows={3}
                          />
                        </div>
                        <Button
                          onClick={() => handleSubmitFeedback(treatment.id)}
                          className="bg-green-500 hover:bg-green-600 text-white px-6 py-2"
                          disabled={!feedbackTexts[treatment.id]?.trim()}
                        >
                          SUBMIT
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* View Submitted Feedbacks Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mb-12"
        >
          <Button
            onClick={handleViewFeedbacks}
            variant="outline"
            className="border-green-500 text-green-600 hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-900/20"
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            View Submitted Feedbacks ({submittedFeedbacks.length})
          </Button>
        </motion.div>

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

      {/* Feedback Input Dialog */}
      <Dialog open={showFeedbackDialog} onOpenChange={setShowFeedbackDialog}>
        <DialogContent className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50">
          <DialogHeader>
            <DialogTitle className="text-gray-800 dark:text-gray-200">
              Feedback for {treatments.find(t => t.id === selectedTreatment)?.name}
            </DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <Textarea
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              placeholder="Write your detailed feedback here... You can write unlimited text."
              className="min-h-32 bg-white/50 dark:bg-gray-700/50 border-gray-300 dark:border-gray-600 resize-none"
              rows={6}
            />
            
            <div className="flex justify-end space-x-2 mt-4">
              <Button
                variant="outline"
                onClick={() => setShowFeedbackDialog(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmitFeedback}
                className="bg-green-600 hover:bg-green-700 text-white"
                disabled={!feedbackText.trim()}
              >
                Submit Feedback
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}