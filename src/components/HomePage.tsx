import React from 'react';
import { Heart, Users, TrendingUp, Star, Zap } from 'lucide-react';

interface HomePageProps {
  onStart: (isPremium?: boolean) => void;
  darkMode: boolean;
}

const HomePage: React.FC<HomePageProps> = ({ onStart, darkMode }) => {
  return (
    <div className="min-h-screen pt-20 flex items-center justify-center p-4">
      <div className="max-w-5xl mx-auto text-center">
        <div className="mb-8">
          <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-6 shadow-lg`}>
            <Heart className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent mb-4">
            Cancer Risk Assessment
          </h1>
          <p className={`text-xl max-w-2xl mx-auto leading-relaxed ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Take control of your health with our comprehensive cancer risk assessment. 
            Get personalized insights based on the latest medical research and guidelines.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className={`backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
            darkMode ? 'bg-gray-800/60' : 'bg-white/60'
          }`}>
            <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto">
              <Heart className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Personalized Analysis
            </h3>
            <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Tailored risk assessment based on your unique lifestyle and genetic factors
            </p>
          </div>

          <div className={`backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
            darkMode ? 'bg-gray-800/60' : 'bg-white/60'
          }`}>
            <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Evidence-Based
            </h3>
            <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Built on algorithms from leading cancer research institutions and health agencies
            </p>
          </div>

          <div className={`backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
            darkMode ? 'bg-gray-800/60' : 'bg-white/60'
          }`}>
            <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Actionable Insights
            </h3>
            <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Receive personalized recommendations to help reduce your cancer risk
            </p>
          </div>
        </div>

        {/* Assessment Options */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Basic Assessment */}
          <div className={`backdrop-blur-sm rounded-3xl p-8 shadow-xl border-2 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${
            darkMode 
              ? 'bg-gray-800/70 border-gray-600 hover:border-blue-400' 
              : 'bg-white/70 border-gray-200 hover:border-blue-400'
          }`}>
            <div className="mb-6">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Zap className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Quick Assessment
              </h3>
              <p className={`text-lg mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Get essential insights in just 5 minutes
              </p>
            </div>
            
            <div className="space-y-3 mb-6">
              <div className={`flex items-center text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                15 essential questions
              </div>
              <div className={`flex items-center text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                Basic risk assessment for major cancers
              </div>
              <div className={`flex items-center text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                Actionable lifestyle recommendations
              </div>
              <div className={`flex items-center text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                Free forever
              </div>
            </div>

            <button
              onClick={() => onStart(false)}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl text-lg"
            >
              Start Quick Assessment
            </button>
          </div>

          {/* Premium Assessment */}
          <div className={`backdrop-blur-sm rounded-3xl p-8 shadow-xl border-2 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 relative ${
            darkMode 
              ? 'bg-gradient-to-br from-purple-900/70 to-blue-900/70 border-purple-400' 
              : 'bg-gradient-to-br from-purple-50/70 to-blue-50/70 border-purple-400'
          }`}>
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center">
                <Star className="w-4 h-4 mr-1" />
                Premium
              </div>
            </div>
            
            <div className="mb-6 mt-4">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Heart className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Comprehensive Assessment
              </h3>
              <p className={`text-lg mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Complete analysis with detailed insights
              </p>
            </div>
            
            <div className="space-y-3 mb-6">
              <div className={`flex items-center text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                40+ detailed questions across 8 sections
              </div>
              <div className={`flex items-center text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                Risk assessment for 10+ cancer types
              </div>
              <div className={`flex items-center text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                Personalized screening timeline
              </div>
              <div className={`flex items-center text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                Genetic risk factors analysis
              </div>
            </div>

            <button
              onClick={() => onStart(true)}
              className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-full hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl text-lg"
            >
              Start Premium Assessment
            </button>
          </div>
        </div>

        <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          <p>✓ Your data is private and secure.</p>
          <p>✓ Results are for educational purposes only</p>
          <p>✓ Always consult with healthcare professionals</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage; 