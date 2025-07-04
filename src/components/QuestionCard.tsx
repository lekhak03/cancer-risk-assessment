import React from 'react';

interface Question {
  id: string;
  title: string;
  subtitle?: string;
  type: 'radio' | 'checkbox' | 'number' | 'text';
  options?: { value: string; label: string }[];
  placeholder?: string;
  step?: number;
  required?: boolean;
}

interface QuestionCardProps {
  question: Question;
  value: any;
  onChange: (value: any) => void;
  darkMode?: boolean;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, value, onChange, darkMode = false }) => {
  const handleRadioChange = (selectedValue: string) => {
    onChange(selectedValue);
  };

  const handleCheckboxChange = (selectedValue: string) => {
    const currentValues = value || {};
    onChange({
      ...currentValues,
      [selectedValue]: !currentValues[selectedValue]
    });
  };

  const handleInputChange = (inputValue: string) => {
    if (question.type === 'number') {
      onChange(inputValue ? parseFloat(inputValue) : undefined);
    } else {
      onChange(inputValue);
    }
  };

  return (
    <div className={`backdrop-blur-sm rounded-3xl p-8 shadow-xl border transition-all duration-300 ${
      darkMode 
        ? 'bg-gray-800/70 border-gray-600' 
        : 'bg-white/70 border-white/20'
    }`}>
      <h2 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
        {question.title}
      </h2>
      {question.subtitle && (
        <p className={`mb-6 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          {question.subtitle}
        </p>
      )}

      <div className="space-y-3">
        {question.type === 'radio' && question.options && (
          <div className="grid gap-3">
            {question.options.map((option) => (
              <label
                key={option.value}
                className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 hover:shadow-md ${
                  value === option.value
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                    : `border-gray-200 hover:border-gray-300 ${
                        darkMode ? 'dark:border-gray-600 dark:hover:border-gray-500' : ''
                      }`
                }`}
              >
                <input
                  type="radio"
                  name={question.id}
                  value={option.value}
                  checked={value === option.value}
                  onChange={() => handleRadioChange(option.value)}
                  className="sr-only"
                />
                <div
                  className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                    value === option.value
                      ? 'border-blue-500 bg-blue-500'
                      : `border-gray-300 ${darkMode ? 'dark:border-gray-500' : ''}`
                  }`}
                >
                  {value === option.value && (
                    <div className="w-2 h-2 rounded-full bg-white" />
                  )}
                </div>
                <span className={`font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        )}

        {question.type === 'checkbox' && question.options && (
          <div className="grid gap-3">
            {question.options.map((option) => {
              const isChecked = value && value[option.value];
              return (
                <label
                  key={option.value}
                  className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 hover:shadow-md ${
                    isChecked
                      ? 'border-green-500 bg-green-50 dark:bg-green-900/30'
                      : `border-gray-200 hover:border-gray-300 ${
                          darkMode ? 'dark:border-gray-600 dark:hover:border-gray-500' : ''
                        }`
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked || false}
                    onChange={() => handleCheckboxChange(option.value)}
                    className="sr-only"
                  />
                  <div
                    className={`w-5 h-5 rounded border-2 mr-3 flex items-center justify-center ${
                      isChecked
                        ? 'border-green-500 bg-green-500'
                        : `border-gray-300 ${darkMode ? 'dark:border-gray-500' : ''}`
                    }`}
                  >
                    {isChecked && (
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <span className={`font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                    {option.label}
                  </span>
                </label>
              );
            })}
          </div>
        )}

        {(question.type === 'number' || question.type === 'text') && (
          <input
            type={question.type}
            value={value || ''}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder={question.placeholder}
            step={question.step}
            className={`w-full p-4 rounded-xl border-2 focus:outline-none transition-all duration-200 text-lg ${
              darkMode
                ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:border-blue-500'
                : 'border-gray-200 bg-white text-gray-900 placeholder-gray-500 focus:border-blue-500'
            }`}
          />
        )}
      </div>
    </div>
  );
};

export default QuestionCard;