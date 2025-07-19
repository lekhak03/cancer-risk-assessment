import React from 'react';
import { RotateCcw, AlertTriangle, CheckCircle, Info, TrendingUp, Heart, BarChart3 } from 'lucide-react';
import { UserData, RiskAssessment } from '../types/UserData';
import { calculateRisks } from '../utils/riskCalculation';
import RiskCard from './RiskCard';

interface ResultsProps {
  userData: UserData;
  onRestart: () => void;
  darkMode: boolean;
}

const Results: React.FC<ResultsProps> = ({ userData, onRestart, darkMode }) => {
  const riskAssessments = calculateRisks(userData);

  const highRiskCount = riskAssessments.filter(r => r.riskLevel === 'High').length;
  const elevatedRiskCount = riskAssessments.filter(r => r.riskLevel === 'Elevated').length;
  const averageRiskCount = riskAssessments.filter(r => r.riskLevel === 'Average').length;
  const lowRiskCount = riskAssessments.filter(r => r.riskLevel === 'Low').length;

  const overallRiskLevel = highRiskCount > 0 ? 'High' : 
                          elevatedRiskCount > 0 ? 'Elevated' : 
                          averageRiskCount > 0 ? 'Average' : 'Low';

  const totalModifiableFactors = riskAssessments.reduce((total, assessment) => 
    total + assessment.modifiableFactors.length, 0);

  const highPriorityRecommendations = riskAssessments.reduce((total, assessment) => 
    total + assessment.recommendations.filter(r => r.priority === 'high').length, 0);

  return (
    <div className="min-h-screen pt-20 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-6 shadow-lg">
            {overallRiskLevel === 'High' ? (
              <AlertTriangle className="w-10 h-10 text-white" />
            ) : overallRiskLevel === 'Low' ? (
              <CheckCircle className="w-10 h-10 text-white" />
            ) : (
              <Heart className="w-10 h-10 text-white" />
            )}
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent mb-4">
            Your Comprehensive Cancer Risk Profile
          </h1>
          <p className={`text-xl max-w-3xl mx-auto leading-relaxed ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Based on your detailed responses, here's your personalized cancer risk assessment with 
            evidence-based recommendations for risk reduction and screening.
          </p>
        </div>

        {/* Overall Risk Summary */}
        <div className={`backdrop-blur-sm rounded-3xl p-8 shadow-xl border mb-8 ${
          darkMode 
            ? 'bg-gray-800/70 border-gray-600' 
            : 'bg-white/70 border-white/20'
        }`}>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">{overallRiskLevel}</div>
              <div className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Overall Risk Level</div>
              <div className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Across all cancer types</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">{totalModifiableFactors}</div>
              <div className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Modifiable Factors</div>
              <div className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Risk factors you can change</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-red-600 mb-2">{highPriorityRecommendations}</div>
              <div className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Priority Actions</div>
              <div className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>High-impact recommendations</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">{riskAssessments.length}</div>
              <div className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Cancers Assessed</div>
              <div className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Comprehensive evaluation</div>
            </div>
          </div>
        </div>

        {/* Risk Level Distribution */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className={`border-2 border-red-200 rounded-2xl p-6 text-center ${
            darkMode ? 'bg-red-900/20' : 'bg-red-50'
          }`}>
            <div className="text-3xl font-bold text-red-600 mb-2">{highRiskCount}</div>
            <div className="text-red-700 font-medium">High Risk</div>
            <div className="text-sm text-red-600 mt-1">Requires immediate attention</div>
          </div>
          <div className={`border-2 border-orange-200 rounded-2xl p-6 text-center ${
            darkMode ? 'bg-orange-900/20' : 'bg-orange-50'
          }`}>
            <div className="text-3xl font-bold text-orange-600 mb-2">{elevatedRiskCount}</div>
            <div className="text-orange-700 font-medium">Elevated Risk</div>
            <div className="text-sm text-orange-600 mt-1">Enhanced monitoring needed</div>
          </div>
          <div className={`border-2 border-yellow-200 rounded-2xl p-6 text-center ${
            darkMode ? 'bg-yellow-900/20' : 'bg-yellow-50'
          }`}>
            <div className="text-3xl font-bold text-yellow-600 mb-2">{averageRiskCount}</div>
            <div className="text-yellow-700 font-medium">Average Risk</div>
            <div className="text-sm text-yellow-600 mt-1">Standard screening recommended</div>
          </div>
          <div className={`border-2 border-green-200 rounded-2xl p-6 text-center ${
            darkMode ? 'bg-green-900/20' : 'bg-green-50'
          }`}>
            <div className="text-3xl font-bold text-green-600 mb-2">{lowRiskCount}</div>
            <div className="text-green-700 font-medium">Low Risk</div>
            <div className="text-sm text-green-600 mt-1">Continue healthy habits</div>
          </div>
        </div>

        {/* Risk Assessments Grid */}
        <div className="grid xl:grid-cols-2 gap-8 mb-8">
          {riskAssessments.map((assessment, index) => (
            <RiskCard key={index} assessment={assessment} darkMode={darkMode} />
          ))}
        </div>

        {/* Key Insights Section */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Top Risk Factors */}
          <div className={`backdrop-blur-sm rounded-3xl p-8 shadow-xl border ${
            darkMode 
              ? 'bg-gray-800/70 border-gray-600' 
              : 'bg-white/70 border-white/20'
          }`}>
            <h3 className={`text-2xl font-bold mb-6 flex items-center ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              <TrendingUp className="w-6 h-6 mr-3 text-red-500" />
              Key Risk Factors to Address
            </h3>
            <div className="space-y-4">
              {riskAssessments
                .flatMap(assessment => assessment.modifiableFactors)
                .filter(factor => factor.impact === 'high')
                .slice(0, 5)
                .map((factor, index) => (
                  <div key={index} className={`flex items-start p-4 rounded-xl border ${
                    darkMode 
                      ? 'bg-red-900/20 border-red-700' 
                      : 'bg-red-50 border-red-200'
                  }`}>
                    <div className="w-3 h-3 rounded-full bg-red-500 mt-2 mr-3 flex-shrink-0"></div>
                    <div>
                      <div className={`font-semibold ${darkMode ? 'text-red-200' : 'text-red-800'}`}>
                        {factor.factor}
                      </div>
                      <div className={`text-sm mt-1 ${darkMode ? 'text-red-300' : 'text-red-600'}`}>
                        {factor.description}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Priority Recommendations */}
          <div className={`backdrop-blur-sm rounded-3xl p-8 shadow-xl border ${
            darkMode 
              ? 'bg-gray-800/70 border-gray-600' 
              : 'bg-white/70 border-white/20'
          }`}>
            <h3 className={`text-2xl font-bold mb-6 flex items-center ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              <CheckCircle className="w-6 h-6 mr-3 text-green-500" />
              Priority Recommendations
            </h3>
            <div className="space-y-4">
              {riskAssessments
                .flatMap(assessment => assessment.recommendations)
                .filter(rec => rec.priority === 'high')
                .slice(0, 5)
                .map((recommendation, index) => (
                  <div key={index} className={`flex items-start p-4 rounded-xl border ${
                    darkMode 
                      ? 'bg-green-900/20 border-green-700' 
                      : 'bg-green-50 border-green-200'
                  }`}>
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className={`font-semibold ${darkMode ? 'text-green-200' : 'text-green-800'}`}>
                        {recommendation.action}
                      </div>
                      <div className={`text-sm mt-1 ${darkMode ? 'text-green-300' : 'text-green-600'}`}>
                        {recommendation.description}
                      </div>
                      {recommendation.potentialImpact && (
                        <div className="text-xs text-green-500 mt-1 font-medium">
                          Impact: {recommendation.potentialImpact}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Screening Timeline */}
        <div className={`backdrop-blur-sm rounded-3xl p-8 shadow-xl border mb-8 ${
          darkMode 
            ? 'bg-gray-800/70 border-gray-600' 
            : 'bg-white/70 border-white/20'
        }`}>
          <h3 className={`text-2xl font-bold mb-6 flex items-center ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            <BarChart3 className="w-6 h-6 mr-3 text-blue-500" />
            Recommended Screening Timeline
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {riskAssessments
              .filter(assessment => assessment.screeningTimeline.length > 0)
              .map((assessment, index) => (
                <div key={index} className={`p-6 rounded-xl border ${
                  darkMode 
                    ? 'bg-blue-900/20 border-blue-700' 
                    : 'bg-blue-50 border-blue-200'
                }`}>
                  <h4 className={`font-semibold mb-3 ${darkMode ? 'text-blue-200' : 'text-blue-800'}`}>
                    {assessment.cancerType}
                  </h4>
                  {assessment.screeningTimeline.map((screening, screenIndex) => (
                    <div key={screenIndex} className="mb-3 last:mb-0">
                      <div className={`font-medium ${darkMode ? 'text-blue-300' : 'text-blue-700'}`}>
                        {screening.test}
                      </div>
                      <div className={`text-sm ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                        Start: Age {screening.startAge} • {screening.frequency}
                      </div>
                      <div className={`text-xs px-2 py-1 rounded-full inline-block mt-1 ${
                        screening.priority === 'high-risk' ? 'bg-red-100 text-red-700' :
                        screening.priority === 'enhanced' ? 'bg-orange-100 text-orange-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {screening.priority}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
          </div>
        </div>

        {/* Disclaimer */}
        <div className={`border-2 rounded-3xl p-8 mb-8 ${
          darkMode 
            ? 'bg-blue-900/20 border-blue-700' 
            : 'bg-blue-50 border-blue-200'
        }`}>
          <div className="flex items-start">
            <Info className="w-8 h-8 text-blue-600 mr-4 mt-1 flex-shrink-0" />
            <div>
              <h3 className={`text-xl font-semibold mb-3 ${darkMode ? 'text-blue-200' : 'text-blue-800'}`}>
                Important Medical Disclaimer
              </h3>
              <div className={`leading-relaxed space-y-2 ${darkMode ? 'text-blue-300' : 'text-blue-700'}`}>
                <p>
                  This comprehensive risk assessment is for educational purposes only and should not replace 
                  professional medical advice, diagnosis, or treatment. The calculations are based on 
                  established epidemiological studies and validated risk models, but may not account for 
                  all individual factors or recent medical developments.
                </p>
                <p>
                  <strong>Please consult with your healthcare provider to:</strong>
                </p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Discuss these results in the context of your complete medical history</li>
                  <li>Develop a personalized screening and prevention plan</li>
                  <li>Consider genetic counseling if you have significant family history</li>
                  <li>Address any high-risk factors identified in this assessment</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="text-center">
          <button
            onClick={onRestart}
            className="inline-flex items-center px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 text-lg"
          >
            <RotateCcw className="w-6 h-6 mr-3" />
            Take Assessment Again
          </button>
          <p className={`mt-4 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Consider retaking this assessment annually or when your health status changes significantly
          </p>
        </div>
      </div>
    </div>
  );
};

export default Results;