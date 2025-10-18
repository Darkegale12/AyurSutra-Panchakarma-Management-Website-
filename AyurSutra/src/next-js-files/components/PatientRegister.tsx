'use client'

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Leaf, Eye, EyeOff, CheckCircle, Mail } from 'lucide-react';
import { motion } from 'motion/react';

interface PatientRegisterProps {
  onNavigate: (page: 'landing' | 'patient-login') => void;
}

export function PatientRegister({ onNavigate }: PatientRegisterProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    gender: '',
    city: '',
    mobile: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [registered, setRegistered] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    setLoading(true);
    
    // Simulate API call and email sending
    setTimeout(() => {
      setRegistered(true);
      setLoading(false);
    }, 2000);
  };

  if (registered) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md relative z-10"
        >
          <Card className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 border-green-500/30 backdrop-blur-sm shadow-2xl text-center">
            <CardContent className="p-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                className="mb-6"
              >
                <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
              </motion.div>
              
              <h2 className="text-2xl font-bold text-green-400 mb-4">Registration Successful!</h2>
              
              <div className="flex items-center justify-center mb-4">
                <Mail className="w-5 h-5 text-green-400 mr-2" />
                <p className="text-gray-300">
                  Welcome email sent to {formData.email}
                </p>
              </div>
              
              <p className="text-gray-400 mb-6">
                Your account has been created successfully. You can now log in to access your dashboard.
              </p>
              
              <Button
                onClick={() => onNavigate('patient-login')}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-3 font-medium"
              >
                Go to Login
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
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

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md relative z-10"
      >
        <Card className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 border-green-500/30 backdrop-blur-sm shadow-2xl">
          <CardHeader className="text-center pb-6">
            <div className="flex items-center justify-center mb-4">
              <Button
                variant="ghost"
                onClick={() => onNavigate('landing')}
                className="absolute left-4 top-4 text-gray-400 hover:text-green-400"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="flex items-center space-x-2">
                <Leaf className="w-8 h-8 text-green-400" />
                <span className="text-2xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                  AyurSutra
                </span>
              </div>
            </div>
            <CardTitle className="text-2xl text-white">Patient Registration</CardTitle>
            <p className="text-gray-400 mt-2">
              "स्वस्थ रहें, खुश रहें" - Stay healthy, stay happy
            </p>
          </CardHeader>

          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-green-400">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-green-400 focus:ring-green-400"
                    placeholder="Enter full name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="age" className="text-green-400">Age</Label>
                  <Input
                    id="age"
                    name="age"
                    type="number"
                    required
                    min="1"
                    max="120"
                    value={formData.age}
                    onChange={handleInputChange}
                    className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-green-400 focus:ring-green-400"
                    placeholder="Age"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-green-400">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-green-400 focus:ring-green-400"
                  placeholder="Enter email address"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-green-400">Gender</Label>
                  <Select onValueChange={(value) => handleSelectChange('gender', value)} required>
                    <SelectTrigger className="bg-gray-700/50 border-gray-600 text-white focus:border-green-400 focus:ring-green-400">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-600">
                      <SelectItem value="male" className="text-white hover:bg-gray-700">Male</SelectItem>
                      <SelectItem value="female" className="text-white hover:bg-gray-700">Female</SelectItem>
                      <SelectItem value="other" className="text-white hover:bg-gray-700">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-green-400">City</Label>
                  <Select onValueChange={(value) => handleSelectChange('city', value)} required>
                    <SelectTrigger className="bg-gray-700/50 border-gray-600 text-white focus:border-green-400 focus:ring-green-400">
                      <SelectValue placeholder="Select city" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-600">
                      <SelectItem value="pune" className="text-white hover:bg-gray-700">Pune</SelectItem>
                      <SelectItem value="mumbai" className="text-white hover:bg-gray-700">Mumbai</SelectItem>
                      <SelectItem value="kolhapur" className="text-white hover:bg-gray-700">Kolhapur</SelectItem>
                      <SelectItem value="sangli" className="text-white hover:bg-gray-700">Sangli</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="mobile" className="text-green-400">Mobile Number</Label>
                <Input
                  id="mobile"
                  name="mobile"
                  type="tel"
                  required
                  pattern="[0-9]{10}"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-green-400 focus:ring-green-400"
                  placeholder="Enter 10-digit mobile number"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-green-400">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    minLength={6}
                    value={formData.password}
                    onChange={handleInputChange}
                    className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-green-400 focus:ring-green-400 pr-10"
                    placeholder="Create password"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-0 top-0 h-full px-3 text-gray-400 hover:text-green-400"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-green-400">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-green-400 focus:ring-green-400 pr-10"
                    placeholder="Confirm password"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-0 top-0 h-full px-3 text-gray-400 hover:text-green-400"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-3 font-medium mt-6"
              >
                {loading ? 'Creating Account...' : 'Register'}
              </Button>
            </form>

            <div className="text-center pt-4 border-t border-gray-700">
              <p className="text-gray-400">
                Already have an account?{' '}
                <button
                  onClick={() => onNavigate('patient-login')}
                  className="text-green-400 hover:text-green-300 font-medium underline"
                >
                  Login here
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}