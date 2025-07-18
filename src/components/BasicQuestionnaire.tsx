import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle, Star } from 'lucide-react';
import { BasicUserData } from '../types/UserData';
import ProgressBar from './ProgressBar';
import QuestionCard from './QuestionCard';

interface BasicQuestionnaireProps {
  onComplete: (data: BasicUserData) => void;
  onBack: () => void;
  onUpgrade: () => void;
  darkMode: boolean;
}

const BasicQuestionnaire: React.FC<BasicQuestionnaireProps> = ({ 
  onComplete, 
  onBack, 
  onUpgrade, 
  darkMode 
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userData, setUserData] = useState<BasicUserData>({});

  const questions = [
    {
      id: 'age',
      title: 'What is your age?',
      type: 'number' as const,
      placeholder: 'Enter your age',
      required: true,
      defaultValue: 40,
    },
    {
      id: 'biologicalSex',
      title: 'What is your biological sex?',
      type: 'radio' as const,
      options: [
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' },
        { value: 'other', label: 'Other' },
      ],
      required: true,
      defaultValue: 'other',
    },
    {
      id: 'raceEthnicity',
      title: 'What is your race/ethnicity?',
      subtitle: 'This helps assess genetic predisposition patterns',
      type: 'radio' as const,
      options: [
        { value: 'white', label: 'White/Caucasian' },
        { value: 'black', label: 'Black/African American' },
        { value: 'hispanic', label: 'Hispanic/Latino' },
        { value: 'asian', label: 'Asian' },
        { value: 'native_american', label: 'Native American' },
        { value: 'pacific_islander', label: 'Pacific Islander' },
        { value: 'other', label: 'Other/Mixed' },
      ],
      required: true,
      defaultValue: 'other',
    },
    {
      id: 'height',
      title: 'What is your height?',
      type: 'number' as const,
      placeholder: 'Height in centimeters (e.g., 170)',
      required: true,
      defaultValue: 170,
    },
    {
      id: 'weight',
      title: 'What is your weight?',
      type: 'number' as const,
      placeholder: 'Weight in kilograms (e.g., 70)',
      required: true,
      defaultValue: 70,
    },
    {
      id: 'familyHistory',
      title: 'Has anyone in your immediate family (parents, siblings) been diagnosed with cancer?',
      subtitle: 'Select all that apply',
      type: 'checkbox' as const,
      options: [
        { value: 'breast', label: 'Breast cancer' },
        { value: 'lung', label: 'Lung cancer' },
        { value: 'colorectal', label: 'Colorectal cancer' },
        { value: 'prostate', label: 'Prostate cancer' },
        { value: 'ovarian', label: 'Ovarian cancer' },
        { value: 'skin', label: 'Skin cancer/Melanoma' },
        { value: 'pancreatic', label: 'Pancreatic cancer' },
        { value: 'other', label: 'Other cancer types' },
        { value: 'none', label: 'No family history of cancer' },
      ],
      defaultValue: {
        breast: false, lung: false, colorectal: false, prostate: false, ovarian: false, skin: false, pancreatic: false, other: false, none: false
      },
    },
    {
      id: 'smokingStatus',
      title: 'What is your smoking status?',
      type: 'radio' as const,
      options: [
        { value: 'never', label: 'Never smoked' },
        { value: 'former', label: 'Former smoker' },
        { value: 'current', label: 'Current smoker' },
      ],
      required: true,
      defaultValue: 'never',
    },
    {
      id: 'smokingPackYears',
      title: 'How many pack-years have you smoked?',
      subtitle: 'Pack-years = (cigarettes per day ÷ 20) × years smoked. Enter 0 if unsure.',
      type: 'number' as const,
      placeholder: 'Enter pack-years (e.g., 10)',
      condition: (data: BasicUserData) => data.smokingStatus !== 'never',
      defaultValue: 0,
    },
    {
      id: 'alcoholConsumption',
      title: 'How would you describe your alcohol consumption?',
      type: 'radio' as const,
      options: [
        { value: 'never', label: 'Never drink alcohol' },
        { value: 'light', label: 'Light (1-3 drinks per week)' },
        { value: 'moderate', label: 'Moderate (4-14 drinks per week)' },
        { value: 'heavy', label: 'Heavy (15+ drinks per week)' },
      ],
      required: true,
      defaultValue: 'never',
    },
    {
      id: 'physicalActivity',
      title: 'How many minutes of moderate to vigorous exercise do you get per week?',
      type: 'radio' as const,
      options: [
        { value: 'none', label: 'None (0 minutes)' },
        { value: 'low', label: 'Low (1-75 minutes)' },
        { value: 'moderate', label: 'Moderate (75-150 minutes)' },
        { value: 'high', label: 'High (150+ minutes)' },
      ],
      required: true,
      defaultValue: 'moderate',
    },
    {
      id: 'fruitsVegetables',
      title: 'How many servings of fruits and vegetables do you eat per day?',
      type: 'radio' as const,
      options: [
        { value: '0-1', label: '0-1 servings' },
        { value: '2-3', label: '2-3 servings' },
        { value: '4-5', label: '4-5 servings' },
        { value: '6+', label: '6+ servings' },
      ],
      required: true,
      defaultValue: '2-3',
    },
    {
      id: 'redMeatConsumption',
      title: 'How often do you eat red meat?',
      type: 'radio' as const,
      options: [
        { value: 'never', label: 'Never' },
        { value: 'rarely', label: 'Rarely (less than once per week)' },
        { value: 'weekly', label: 'Weekly (1-3 times per week)' },
        { value: 'daily', label: 'Daily or almost daily' },
      ],
      required: true,
      defaultValue: 'never',
    },
    {
      id: 'sunExposure',
      title: 'How much sun exposure do you typically get?',
      type: 'radio' as const,
      options: [
        { value: 'minimal', label: 'Minimal (mostly indoors)' },
        { value: 'moderate', label: 'Moderate (some outdoor activities)' },
        { value: 'high', label: 'High (outdoor job or frequent sun exposure)' },
      ],
      required: true,
      defaultValue: 'moderate',
    },
    {
      id: 'skinType',
      title: 'What is your skin type?',
      subtitle: 'How does your skin typically react to sun exposure?',
      type: 'radio' as const,
      options: [
        { value: '1', label: 'Type I: Always burns, never tans (very fair)' },
        { value: '2', label: 'Type II: Usually burns, tans minimally (fair)' },
        { value: '3', label: 'Type III: Sometimes burns, tans gradually (medium)' },
        { value: '4', label: 'Type IV: Rarely burns, tans easily (olive)' },
        { value: '5', label: 'Type V: Very rarely burns, tans very easily (brown)' },
        { value: '6', label: 'Type VI: Never burns, deeply pigmented (black)' },
      ],
      required: true,
      defaultValue: '3',
    },
    {
      id: 'ageAtMenarche',
      title: 'At what age did you have your first menstrual period?',
      subtitle: 'Early menarche (before 12) increases breast cancer risk',
      type: 'number' as const,
      placeholder: 'Age in years (e.g., 13)',
      condition: (data: BasicUserData) => data.biologicalSex === 'female',
      defaultValue: 12,
    },
    {
      id: 'pregnancies',
      title: 'How many pregnancies have you had that lasted 6+ months?',
      subtitle: 'Full-term pregnancies reduce breast and ovarian cancer risk',
      type: 'number' as const,
      placeholder: 'Number of pregnancies (0 if none)',
      condition: (data: BasicUserData) => data.biologicalSex === 'female',
      defaultValue: 0,
    },
    {
      id: 'mammogramHistory',
      title: 'What is your mammogram screening history?',
      type: 'radio' as const,
      options: [
        { value: 'never', label: 'Never had a mammogram' },
        { value: 'irregular', label: 'Irregular screening' },
        { value: 'regular', label: 'Regular screening as recommended' },
        { value: 'enhanced', label: 'Enhanced screening (high risk)' },
        { value: 'not_applicable', label: 'Not applicable (male)' },
      ],
      condition: (data: BasicUserData) => data.biologicalSex === 'female' || !data.biologicalSex,
      defaultValue: 'never',
    },
    {
      id: 'colonoscopyHistory',
      title: 'What is your colonoscopy screening history?',
      type: 'radio' as const,
      options: [
        { value: 'never', label: 'Never had a colonoscopy' },
        { value: 'irregular', label: 'Irregular screening' },
        { value: 'regular', label: 'Regular screening as recommended' },
        { value: 'polyps', label: 'History of polyps found' },
      ],
      condition: (data: BasicUserData) => (data.age || 0) >= 40,
      defaultValue: 'never',
    },
  ];

  // Place getAllDefaultValues above handleNext
  const getAllDefaultValues = () => {
    const defaults: Record<string, any> = {};
    questions.forEach(q => {
      if (!q.condition || q.condition(userData)) {
        if (q.defaultValue !== undefined) {
          defaults[q.id] = q.defaultValue;
        } else if (q.type === 'checkbox') {
          if (q.options) {
            defaults[q.id] = q.options.reduce((acc, opt) => {
              acc[opt.value] = false;
              return acc;
            }, {} as Record<string, boolean>);
          }
        } else {
          defaults[q.id] = '';
        }
      }
    });
    return defaults;
  };

  const visibleQuestions = questions.filter(q => 
    !q.condition || q.condition(userData)
  );
  const currentQuestionData = visibleQuestions[currentQuestion];

  const handleAnswer = (questionId: string, value: any) => {
    setUserData(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleNext = () => {
    if (currentQuestion < visibleQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      const defaults = getAllDefaultValues();
      const merged = { ...defaults, ...userData };
      onComplete(merged);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    } else {
      onBack();
    }
  };

  const progress = ((currentQuestion + 1) / visibleQuestions.length) * 100;
  const isLastQuestion = currentQuestion === visibleQuestions.length - 1;

  if (!currentQuestionData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen p-4 flex items-center justify-center">
      <div className="max-w-2xl mx-auto w-full">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className={`text-lg font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
              Quick Cancer Risk Assessment
            </h2>
            <button
              onClick={onUpgrade}
              className="flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-semibold rounded-full hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Star className="w-4 h-4 mr-2" />
              Upgrade to Premium
            </button>
          </div>
          <ProgressBar progress={progress} />
        </div>
        
        <QuestionCard
          question={currentQuestionData}
          value={userData[currentQuestionData.id as keyof BasicUserData]}
          onChange={(value) => handleAnswer(currentQuestionData.id, value)}
          darkMode={darkMode}
        />

        <div className="flex justify-between items-center mt-8">
          <button
            onClick={handlePrevious}
            className={`flex items-center px-6 py-3 transition-colors duration-200 ${
              darkMode 
                ? 'text-gray-300 hover:text-white' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            {currentQuestion === 0 ? 'Back to Home' : 'Previous'}
          </button>

          <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Question {currentQuestion + 1} of {visibleQuestions.length}
          </div>

          <button
            onClick={handleNext}
            className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            {isLastQuestion ? (
              <>
                Get Results
                <CheckCircle className="w-5 h-5 ml-2" />
              </>
            ) : (
              <>
                Next
                <ArrowRight className="w-5 h-5 ml-2" />
              </>
            )}
          </button>
        </div>

        {/* Premium Upgrade Prompt */}
        <div className={`mt-8 p-6 rounded-2xl border-2 border-dashed transition-all duration-300 ${
          darkMode 
            ? 'border-purple-400 bg-purple-900/20' 
            : 'border-purple-300 bg-purple-50'
        }`}>
          <div className="text-center">
            <Star className="w-8 h-8 text-purple-600 mx-auto mb-3" />
            <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Want More Detailed Analysis?
            </h3>
            <p className={`text-sm mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Upgrade to our premium assessment for comprehensive risk analysis using advanced models like 
              Gail Model, Tyrer-Cuzick (IBIS), and CCRAT across 12+ cancer types.
            </p>
            <button
              onClick={onUpgrade}
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-full hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Upgrade Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicQuestionnaire;