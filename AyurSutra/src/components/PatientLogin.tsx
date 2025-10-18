import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { motion } from 'motion/react';
import { useTheme } from './ThemeProvider';
import newLogoImage from 'figma:asset/55a14cbbf289c9fde8c4c8ca4230c7f789072dbd.png';

interface PatientLoginProps {
  onNavigate: (page: 'landing' | 'patient-register' | 'patient-dashboard') => void;
  onLogin: (user: { id: string; name: string; email: string; userType: 'patient'; token?: string }) => void;
}

export function PatientLogin({ onNavigate, onLogin }: PatientLoginProps) {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(
        `http://localhost:8080/login/${formData.username}/${formData.password}`,
        { method: 'POST' }
      );

      if (response.ok) {
        const msg = await response.text();

        if (msg.includes('success') || msg.includes('found')) {
          // ✅ login success → navigate
          const fakeToken = 'dummy-jwt-token'; // in real case, use backend JWT
          localStorage.setItem('authToken', fakeToken);

          onLogin({
            id: '1',
            name: formData.username,
            email: `${formData.username}@email.com`,
            userType: 'patient',
            token: fakeToken,
          });
          onNavigate('patient-dashboard');
        } else {
          setError('Invalid username or password');
        }
      } else {
        setError('Login failed');
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
      style={{
        background:
          theme === 'dark'
            ? 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 25%, #16213e 50%, #0f3460 75%, #0e1a2e 100%)'
            : 'linear-gradient(135deg, #ffffff 0%, #f0fdf4 25%, #ffffff 50%, #f7fdf9 75%, #ffffff 100%)',
      }}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-green-400 rounded-full opacity-20"
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
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
        <Card className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 dark:from-gray-800/90 dark:to-gray-900/90 from-amber-100/95 to-green-100/95 border-green-500/30 dark:border-green-500/30 border-amber-400/50 backdrop-blur-sm shadow-2xl">
          <CardHeader className="text-center pb-6">
            <div className="flex items-center justify-center mb-4">
              <Button
                variant="ghost"
                onClick={() => onNavigate('landing')}
                className="absolute left-4 top-4 text-gray-400 hover:text-green-400"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
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
            </div>
            <CardTitle className="text-2xl text-white dark:text-white text-amber-900">
              Patient Login
            </CardTitle>
            <p className="text-gray-400 dark:text-gray-400 text-amber-800 mt-2">
              "शरीरमाद्यं खलु धर्मसाधनम्" - Body is the primary means for dharma
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            {error && (
              <div className="bg-red-900/50 border border-red-500/50 rounded-lg p-3 text-red-200 text-sm">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-green-400">
                  Username
                </Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={formData.username}
                  onChange={handleInputChange}
                  className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-green-400 focus:ring-green-400"
                  placeholder="Enter your username"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-green-400">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
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
                {loading ? 'Signing In...' : 'Sign In'}
              </Button>
            </form>

            <div className="text-center">
              <p className="text-gray-400">
                New to AyurSutra?{' '}
                <button
                  onClick={() => onNavigate('patient-register')}
                  className="text-green-400 hover:text-green-300 font-medium underline"
                >
                  Register here
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
