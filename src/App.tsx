import { useState, useEffect } from 'react';
import WelcomePage from './components/WelcomePage';
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
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900' 
        : 'bg-gradient-to-br from-blue-50 via-purple-50 to-green-50'
    }`}>
      {/* Dark Mode Toggle */}
      <div className="fixed top-6 right-6 z-50">
        <button
          onClick={toggleDarkMode}
          className={`p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 ${
            darkMode
              ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700'
              : 'bg-white text-gray-600 hover:bg-gray-50'
          }`}
          aria-label="Toggle dark mode"
        >
          {darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
        </button>
      </div>

      {currentStep === 'welcome' && (
        <WelcomePage onStart={handleStartAssessment} darkMode={darkMode} />
      )}
      {currentStep === 'questionnaire' && (
        <Questionnaire 
          onComplete={handleCompleteQuestionnaire}
          onBack={() => setCurrentStep('welcome')}
          darkMode={darkMode}
        />
      )}
      {currentStep === 'basic-questionnaire' && (
        <BasicQuestionnaire 
          onComplete={handleCompleteBasicQuestionnaire}
          onBack={() => setCurrentStep('welcome')}
          onUpgrade={handleUpgradeToPremium}
          darkMode={darkMode}
        />
      )}
      {currentStep === 'results' && (
        <Results 
          userData={userData}
          onRestart={handleRestart}
          darkMode={darkMode}
        />
      )}
      {currentStep === 'basic-results' && (
        <BasicResults 
          userData={basicUserData}
          onRestart={handleRestart}
          onUpgrade={handleUpgradeToPremium}
          darkMode={darkMode}
        />
      )}
    </div>
  );
}

export default App;