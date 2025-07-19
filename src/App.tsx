import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import PrivacyPage from './components/PrivacyPage';
import LegalPage from './components/LegalPage';
import Questionnaire from './components/Questionnaire';
import BasicQuestionnaire from './components/BasicQuestionnaire';
import Results from './components/Results';
import BasicResults from './components/BasicResults';
import { UserData, BasicUserData } from './types/UserData';
import { Moon, Sun } from 'lucide-react';

function App() {
  const [currentStep, setCurrentStep] = useState<'welcome' | 'questionnaire' | 'basic-questionnaire' | 'results' | 'basic-results'>('welcome');
  const [userData, setUserData] = useState<UserData>({});
  const [basicUserData, setBasicUserData] = useState<BasicUserData>({});
  const [darkMode, setDarkMode] = useState(false);

  // Initialize dark mode from localStorage
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode) {
      setDarkMode(JSON.parse(savedDarkMode));
    }
  }, []);

  // Apply dark mode to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleStartAssessment = (isPremium: boolean = false) => {
    if (isPremium) {
      setCurrentStep('questionnaire');
    } else {
      setCurrentStep('basic-questionnaire');
    }
  };

  const handleCompleteQuestionnaire = (data: UserData) => {
    setUserData(data);
    setCurrentStep('results');
  };

  const handleCompleteBasicQuestionnaire = (data: BasicUserData) => {
    setBasicUserData(data);
    setCurrentStep('basic-results');
  };

  const handleRestart = () => {
    setUserData({});
    setBasicUserData({});
    setCurrentStep('welcome');
  };

  const handleUpgradeToPremium = () => {
    setCurrentStep('questionnaire');
  };

  return (
    <Router>
      <div className={`min-h-screen transition-colors duration-300 ${
        darkMode 
          ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900' 
          : 'bg-gradient-to-br from-blue-50 via-purple-50 to-green-50'
      }`}>
        {/* Navigation */}
        <Navigation darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

        {/* Routes */}
        <Routes>
          {/* Home Route */}
          <Route 
            path="/" 
            element={
              currentStep === 'welcome' ? (
                <HomePage onStart={handleStartAssessment} darkMode={darkMode} />
              ) : currentStep === 'questionnaire' ? (
                <Questionnaire 
                  onComplete={handleCompleteQuestionnaire}
                  onBack={() => setCurrentStep('welcome')}
                  darkMode={darkMode}
                />
              ) : currentStep === 'basic-questionnaire' ? (
                <BasicQuestionnaire 
                  onComplete={handleCompleteBasicQuestionnaire}
                  onBack={() => setCurrentStep('welcome')}
                  onUpgrade={handleUpgradeToPremium}
                  darkMode={darkMode}
                />
              ) : currentStep === 'results' ? (
                <Results 
                  userData={userData}
                  onRestart={handleRestart}
                  darkMode={darkMode}
                />
              ) : currentStep === 'basic-results' ? (
                <BasicResults 
                  userData={basicUserData}
                  onRestart={handleRestart}
                  onUpgrade={handleUpgradeToPremium}
                  darkMode={darkMode}
                />
              ) : (
                <HomePage onStart={handleStartAssessment} darkMode={darkMode} />
              )
            } 
          />

          {/* Static Pages */}
          <Route path="/about" element={<AboutPage darkMode={darkMode} />} />
          <Route path="/contact" element={<ContactPage darkMode={darkMode} />} />
          <Route path="/privacy" element={<PrivacyPage darkMode={darkMode} />} />
          <Route path="/legal" element={<LegalPage darkMode={darkMode} />} />

          {/* Redirect any unknown routes to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        {/* Footer */}
        <Footer darkMode={darkMode} />
      </div>
    </Router>
  );
}

export default App;