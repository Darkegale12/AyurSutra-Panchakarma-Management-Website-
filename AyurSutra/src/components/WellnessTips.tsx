import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Leaf, User, ArrowLeft, ExternalLink, Mail } from 'lucide-react';
import { motion } from 'motion/react';
import { useTheme } from './ThemeProvider';
import newLogoImage from 'figma:asset/55a14cbbf289c9fde8c4c8ca4230c7f789072dbd.png';

interface WellnessTipsProps {
  user: { id: string; name: string; email: string; userType: 'patient' | 'doctor' };
  onNavigate: (page: 'patient-dashboard') => void;
  onLogout: () => void;
}

export function WellnessTips({ user, onNavigate, onLogout }: WellnessTipsProps) {
  const { theme } = useTheme();

  const wellnessTips = [
    "Follow a light, easily digestible diet – freshly cooked, warm, and balanced meals.",
    "Avoid heavy, oily, fried, and junk foods during and after therapy.",
    "Stay hydrated with warm water or herbal teas; avoid cold drinks.",
    "Eat at regular timings and avoid overeating.",
    "Get sufficient rest and sound sleep – at least 7–8 hours daily.",
    "Avoid excessive physical or mental exertion during treatment.",
    "Do gentle yoga or light stretching (only if advised by the doctor).",
    "Practice deep breathing or meditation to calm the mind.",
    "Take short walks after meals for better digestion.",
    "Avoid alcohol, smoking, and caffeine to support detoxification.",
    "Maintain personal hygiene – regular bath, oral care, and clean clothing.",
    "Use oil massage (Abhyanga) or steam therapy (if recommended) to relax muscles.",
    "Stay consistent with your therapy schedule and don't skip sessions.",
    "Follow doctor's post-therapy lifestyle guidelines to maintain benefits.",
    "Keep a positive mindset – healing takes time, trust the process."
  ];

  const panchakarmaPrepLinks = [
    {
      title: "How to Prepare for Panchakarma",
      url: "https://www.ayurooms.com/how-to-prepare-for-panchakarma.html?utm.com",
      description: "Complete guide to preparing for Panchakarma therapy"
    },
    {
      title: "Panchakarma Therapy Overview",
      url: "https://www.forestessentialsindia.com/blog/panchakarma-therapy.html",
      description: "Understanding the benefits and process of Panchakarma"
    },
    {
      title: "Panchakarma Preparations and Expectations",
      url: "https://www.purushaayurveda.com/panchakarma-preparations-and-expectations",
      description: "What to expect during Panchakarma treatment"
    },
    {
      title: "Panchakarma Deep Healing Process",
      url: "https://www.keralaayurveda.us/courses/blog/panchakarma-cleanse-the-deep-healing-and-detoxification-process-of-ayurveda/",
      description: "Deep dive into the healing and detoxification process"
    },
    {
      title: "Essential Dos and Don'ts During Panchakarma",
      url: "https://whyayurveda.org/essential-dos-and-donts-during-panchakarma-therapy-at-an-kairali-the-ayurvedic-healing-village/",
      description: "Important guidelines to follow during therapy"
    }
  ];

  const handleSendToEmail = () => {
    const emailSubject = "Panchakarma Preparation Resources from AyurSutra";
    const emailBody = `Dear ${user.name},\n\nHere are some valuable resources to help you prepare for your Panchakarma therapy:\n\n${panchakarmaPrepLinks.map((link, index) => 
      `${index + 1}. ${link.title}\n   ${link.description}\n   ${link.url}\n\n`
    ).join('')}Best regards,\nAyurSutra Team`;
    
    const mailtoLink = `mailto:${user.email}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    window.open(mailtoLink);
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
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800 dark:text-gray-200">
            Wellness Tips
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-green-600 mx-auto mb-8"></div>
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-8">
            General Wellness Tips for All Panchakarma Patients
          </h2>
        </motion.div>

        {/* Tips Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50">
            <CardContent className="p-8">
              <div className="space-y-6">
                {wellnessTips.map((tip, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                    className="flex items-start space-x-4 p-4 rounded-lg"
                  >
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-3 flex-shrink-0"></div>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                      {tip}
                    </p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Panchakarma Preparation Links */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12"
        >
          <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50">
            <CardContent className="p-8">
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6 text-center">
                Panchakarma Preparation Resources
              </h3>
              
              <div className="space-y-4 mb-8">
                {panchakarmaPrepLinks.map((link, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                    className="flex items-center justify-between p-4 rounded-lg bg-white/50 dark:bg-gray-700/50 hover:bg-white/70 dark:hover:bg-gray-600/50 transition-colors"
                  >
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">
                        {link.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {link.description}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(link.url, '_blank')}
                      className="ml-4 border-green-500/50 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Visit
                    </Button>
                  </motion.div>
                ))}
              </div>

              <div className="text-center">
                <Button
                  onClick={handleSendToEmail}
                  className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-3"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Send to Email
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Footer Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
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
    </div>
  );
}