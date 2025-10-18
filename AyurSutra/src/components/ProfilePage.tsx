import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Leaf, User, ArrowLeft, Camera, Edit, Save, X } from 'lucide-react';
import { motion } from 'motion/react';
import { useTheme } from './ThemeProvider';
import newLogoImage from 'figma:asset/55a14cbbf289c9fde8c4c8ca4230c7f789072dbd.png';

interface ProfilePageProps {
  user: { id: string; name: string; email: string; userType: 'patient' | 'doctor' };
  onNavigate: (page: 'patient-dashboard') => void;
  onLogout: () => void;
}

export function ProfilePage({ user, onNavigate, onLogout }: ProfilePageProps) {
  const { theme } = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user.name,
    email: user.email,
    phone: '+91 9876543210',
    dateOfBirth: '1990-01-15'
  });
  const [editData, setEditData] = useState(profileData);

  const handleEdit = () => {
    setIsEditing(true);
    setEditData(profileData);
  };

  const handleSave = () => {
    setProfileData(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(profileData);
    setIsEditing(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setEditData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePhotoUpload = () => {
    // In a real app, this would handle file upload
    alert('Photo upload functionality would be implemented here');
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
      <div className="max-w-2xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50">
            <CardContent className="p-8">
              {/* Profile Header */}
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-8">
                  User Profile
                </h1>
                
                {/* Profile Photo Section */}
                <div className="relative inline-block mb-6">
                  <Avatar className="w-32 h-32 mx-auto">
                    <AvatarImage src="" alt={profileData.name} />
                    <AvatarFallback className="text-2xl bg-gradient-to-br from-green-400 to-green-600 text-white">
                      {profileData.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    onClick={handlePhotoUpload}
                    className="absolute bottom-0 right-0 rounded-full w-10 h-10 p-0 bg-green-600 hover:bg-green-700 text-white"
                  >
                    <Camera className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              {/* Profile Information */}
              <div className="space-y-6">
                {/* Edit/Save/Cancel Buttons */}
                <div className="flex justify-end space-x-2">
                  {!isEditing ? (
                    <Button
                      onClick={handleEdit}
                      variant="outline"
                      className="border-green-500/50 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Button>
                  ) : (
                    <>
                      <Button
                        onClick={handleCancel}
                        variant="outline"
                        className="border-gray-300 dark:border-gray-600"
                      >
                        <X className="w-4 h-4 mr-2" />
                        Cancel
                      </Button>
                      <Button
                        onClick={handleSave}
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </Button>
                    </>
                  )}
                </div>

                {/* Name Field */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-700 dark:text-gray-300">
                    Full Name
                  </Label>
                  {isEditing ? (
                    <Input
                      id="name"
                      value={editData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="bg-white/50 dark:bg-gray-700/50 border-gray-300 dark:border-gray-600"
                    />
                  ) : (
                    <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-md text-gray-800 dark:text-gray-200">
                      {profileData.name}
                    </div>
                  )}
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">
                    Email Address
                  </Label>
                  {isEditing ? (
                    <Input
                      id="email"
                      type="email"
                      value={editData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="bg-white/50 dark:bg-gray-700/50 border-gray-300 dark:border-gray-600"
                    />
                  ) : (
                    <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-md text-gray-800 dark:text-gray-200">
                      {profileData.email}
                    </div>
                  )}
                </div>

                {/* Phone Field */}
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-gray-700 dark:text-gray-300">
                    Phone Number
                  </Label>
                  {isEditing ? (
                    <Input
                      id="phone"
                      type="tel"
                      value={editData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="bg-white/50 dark:bg-gray-700/50 border-gray-300 dark:border-gray-600"
                    />
                  ) : (
                    <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-md text-gray-800 dark:text-gray-200">
                      {profileData.phone}
                    </div>
                  )}
                </div>

                {/* Date of Birth Field */}
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth" className="text-gray-700 dark:text-gray-300">
                    Date of Birth
                  </Label>
                  {isEditing ? (
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={editData.dateOfBirth}
                      onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                      className="bg-white/50 dark:bg-gray-700/50 border-gray-300 dark:border-gray-600"
                    />
                  ) : (
                    <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-md text-gray-800 dark:text-gray-200">
                      {new Date(profileData.dateOfBirth).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Footer Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
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