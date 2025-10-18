'use client'

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Leaf, Eye, EyeOff, Stethoscope } from 'lucide-react';
import { motion } from 'motion/react';

interface DoctorLoginProps {
  onNavigate: (page: 'landing') => void;
  onLogin: (user: { id: string; name: string; email: string; userType: 'doctor' }) => void;
}

export function DoctorLogin({ onNavigate, onLogin }: DoctorLoginProps) {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Mock authentication - in real app, validate against backend
      if (formData.username && formData.password) {
        onLogin({
          id: '1',
          name: `Dr. ${formData.username}`,
          email: `${formData.username}@ayursutra.com`,
          userType: 'doctor'
        });
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
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
            <div className="flex items-center justify-center mb-2">
              <Stethoscope className="w-6 h-6 text-green-400 mr-2" />
              <CardTitle className="text-2xl text-white">Doctor Login</CardTitle>
            </div>
            <p className="text-gray-400 mt-2">
              "वैद्यराज नमस्तुभ्यं यमान्तक भयापह" - Salutations to the physician, dispeller of death&apos;s fear
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-green-400">Doctor ID or Email</Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={formData.username}
                  onChange={handleInputChange}
                  className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-green-400 focus:ring-green-400"
                  placeholder="Enter your doctor ID or email"
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
                    value={formData.password}
                    onChange={handleInputChange}
                    className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-green-400 focus:ring-green-400 pr-10"
                    placeholder="Enter your password"
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

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-3 font-medium"
              >
                {loading ? 'Signing In...' : 'Sign In to Portal'}
              </Button>
            </form>

            <div className="text-center pt-4 border-t border-gray-700">
              <p className="text-sm text-gray-500 mb-2">
                For demo purposes, use any username and password
              </p>
              <p className="text-xs text-gray-600">
                Doctor dashboard coming soon...
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}