import React from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { ArrowLeft, Leaf, Star, CheckCircle, AlertTriangle, Target } from 'lucide-react';
import { motion } from 'motion/react';
import { useTheme } from '../ThemeProvider';

interface NasyaPageProps {
  onNavigate: (page: 'landing') => void;
}

export function NasyaPage({ onNavigate }: NasyaPageProps) {
  return (
    <div className="min-h-screen text-white py-8 px-4" style={{
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 25%, #16213e 50%, #0f3460 75%, #0e1a2e 100%)'
    }}>
      {/* Header */}
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <Button
            variant="ghost"
            onClick={() => onNavigate('landing')}
            className="text-gray-400 hover:text-green-400 mr-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Button>
          <div className="flex items-center space-x-2">
            <Leaf className="w-6 h-6 text-green-400" />
            <span className="text-xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
              AyurSutra
            </span>
          </div>
        </div>

        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            <Star className="w-12 h-12 text-green-400 mr-4" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
              Nasya
            </h1>
          </div>
          <p className="text-xl text-gray-300">Nasal Therapy</p>
        </motion.div>

        {/* Overview Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-green-500/20">
            <CardHeader>
              <CardTitle className="text-green-400 text-2xl">Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 leading-relaxed">
                Nasya involves administration of herbal oils or powders through the nostrils to cleanse and rejuvenate the head region.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Process Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-8"
        >
          <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-green-500/20">
            <CardHeader>
              <CardTitle className="text-green-400 text-2xl">Process</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-semibold text-sm mt-1">
                  1
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Pre-procedure</h4>
                  <p className="text-gray-300">Gentle massage and steam for face/neck.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-semibold text-sm mt-1">
                  2
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Administration</h4>
                  <p className="text-gray-300">Herbal oils (Anu taila, Shadbindu taila) instilled in nostrils.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-semibold text-sm mt-1">
                  3
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Post-care</h4>
                  <p className="text-gray-300">Gentle inhalation, gargling.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Benefits & Indications Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-green-500/20 h-full">
              <CardHeader>
                <CardTitle className="text-green-400 text-xl flex items-center">
                  <CheckCircle className="w-6 h-6 mr-2" />
                  Benefits
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Clears sinuses, improves breathing.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Enhances memory, concentration, and sleep.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Relieves migraine, stress, and hair problems.</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          {/* Indications */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-green-500/20 h-full">
              <CardHeader>
                <CardTitle className="text-green-400 text-xl flex items-center">
                  <Target className="w-6 h-6 mr-2" />
                  Indications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Sinusitis, migraines, chronic headaches.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Allergic rhinitis, neurological disorders.</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Precautions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-8"
        >
          <Card className="bg-gradient-to-br from-red-900/20 to-gray-900/50 border-red-500/30">
            <CardHeader>
              <CardTitle className="text-red-400 text-xl flex items-center">
                <AlertTriangle className="w-6 h-6 mr-2" />
                Precautions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Not to be performed immediately after meals.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Avoid in pregnancy and very young children.</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>


      </div>
    </div>
  );
}