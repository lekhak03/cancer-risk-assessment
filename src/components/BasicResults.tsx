import React from 'react';
import { RotateCcw, AlertTriangle, CheckCircle, Info, TrendingUp, Shield, Star, ArrowRight } from 'lucide-react';
import { BasicUserData, BasicRiskAssessment } from '../types/UserData';
import { calculateBasicRisks } from '../utils/basicRiskCalculation';

interface BasicResultsProps {
  userData: BasicUserData;
  onRestart: () => void;
  onUpgrade: () => void;
  darkMode: boolean;
}

const BasicResults: React.FC<BasicResultsProps> = ({ userData, onRestart, onUpgrade, darkMode }) => {
  const riskAssessments = calculateBasicRisks(userData);

  const highRiskCount = riskAssessments.filter(r => r.riskLevel === 'High').length;
  const elevatedRiskCount = riskAssessments.filter(r => r.riskLevel === 'Elevated').length;
  const averageRiskCount = riskAssessments.filter(r => r.riskLevel === 'Average').length;
  const lowRiskCount = riskAssessments.filter(r => r.riskLevel === 'Low').length;

  const overallRiskLevel = highRiskCount > 0 ? 'High' : 
                          elevatedRiskCount > 0 ? 'Elevated' : 
                          averageRiskCount > 0 ? 'Average' : 'Low';

  const highPriorityRecommendations = riskAssessments.reduce((total, assessment) => 
    total + assessment.recommendations.filter(r => r.priority === 'high').length, 0);

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-6 shadow-lg">
            {overallRiskLevel === 'High' ? (
              <AlertTriangle className="w-10 h-10 text-white" />
            ) : overallRiskLevel === 'Low' ? (
              <CheckCircle className="w-10 h-10 text-white" />
            ) : (
              <Shield className="w-10 h-10 text-white" />
            )}
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent mb-4">
            Your Cancer Risk Assessment
          </h1>
          <p className={`text-lg max-w-2xl mx-auto leading-relaxed ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Based on your responses, here's your personalized cancer risk overview with actionable recommendations.
          </p>
        </div>

        {/* Premium Upgrade Banner */}
        <div className={`rounded-3xl p-6 mb-8 border-2 border-dashed transition-all duration-300 ${
          darkMode 
            ? 'border-purple-400 bg-gradient-to-r from-purple-900/30 to-blue-900/30' 
            : 'border-purple-300 bg-gradient-to-r from-purple-50 to-blue-50'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Star className="w-8 h-8 text-purple-600 mr-4" />
              <div>
                <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  Unlock Complete Analysis
                </h3>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Get detailed risk assessment for 10+ cancer types, genetic factors, and personalized screening timeline
                </p>
              </div>
            </div>
            <button
              onClick={onUpgrade}
              className="flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-full hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Upgrade Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </div>
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
              <div className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Based on key factors</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">{riskAssessments.length}</div>
              <div className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Cancers Assessed</div>
              <div className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Major cancer types</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-red-600 mb-2">{highPriorityRecommendations}</div>
              <div className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Priority Actions</div>
              <div className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>High-impact steps</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">10+</div>
              <div className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>More in Premium</div>
              <div className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Additional cancer types</div>
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
            <div className="text-sm text-red-600 mt-1">Requires attention</div>
          </div>
          <div className={`border-2 border-orange-200 rounded-2xl p-6 text-center ${
            darkMode ? 'bg-orange-900/20' : 'bg-orange-50'
          }`}>
            <div className="text-3xl font-bold text-orange-600 mb-2">{elevatedRiskCount}</div>
            <div className="text-orange-700 font-medium">Elevated Risk</div>
            <div className="text-sm text-orange-600 mt-1">Enhanced monitoring</div>
          </div>
          <div className={`border-2 border-yellow-200 rounded-2xl p-6 text-center ${
            darkMode ? 'bg-yellow-900/20' : 'bg-yellow-50'
          }`}>
            <div className="text-3xl font-bold text-yellow-600 mb-2">{averageRiskCount}</div>
            <div className="text-yellow-700 font-medium">Average Risk</div>
            <div className="text-sm text-yellow-600 mt-1">Standard screening</div>
          </div>
          <div className={`border-2 border-green-200 rounded-2xl p-6 text-center ${
            darkMode ? 'bg-green-900/20' : 'bg-green-50'
          }`}>
            <div className="text-3xl font-bold text-green-600 mb-2">{lowRiskCount}</div>
            <div className="text-green-700 font-medium">Low Risk</div>
            <div className="text-sm text-green-600 mt-1">Continue habits</div>
          </div>
        </div>

        {/* Risk Assessments Grid */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {riskAssessments.map((assessment, index) => (
            <div key={index} className={`backdrop-blur-sm rounded-3xl shadow-xl border-l-8 p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 ${
              assessment.riskLevel === 'High' ? 'border-red-500' :
              assessment.riskLevel === 'Elevated' ? 'border-orange-500' :
              assessment.riskLevel === 'Average' ? 'border-yellow-500' : 'border-green-500'
            } ${
              darkMode ? 'bg-gray-800/70' : 'bg-white'
            }`}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    {assessment.cancerType}
                  </h3>
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
                    assessment.riskLevel === 'High' ? 'bg-red-100 text-red-700' :
                    assessment.riskLevel === 'Elevated' ? 'bg-orange-100 text-orange-700' :
                    assessment.riskLevel === 'Average' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
                  }`}>
                    {assessment.riskLevel} Risk
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-2xl font-bold mb-1 ${
                    assessment.riskLevel === 'High' ? 'text-red-600' :
                    assessment.riskLevel === 'Elevated' ? 'text-orange-600' :
                    assessment.riskLevel === 'Average' ? 'text-yellow-600' : 'text-green-600'
                  }`}>
                    {assessment.riskScore}/10
                  </div>
                  <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Risk Score</div>
                </div>
              </div>

              {/* Key Factors */}
              <div className="mb-4">
                <h4 className={`font-semibold mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                  Key Risk Factors
                </h4>
                <div className="space-y-1">
                  {assessment.keyFactors.slice(0, 3).map((factor, factorIndex) => (
                    <div key={factorIndex} className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      • {factor}
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Recommendations */}
              <div>
                <h4 className={`font-semibold mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                  Recommendations
                </h4>
                <div className="space-y-2">
                  {assessment.recommendations.slice(0, 2).map((rec, recIndex) => (
                    <div key={recIndex} className={`flex items-start p-2 rounded-lg ${
                      darkMode ? 'bg-gray-700/50' : 'bg-gray-50'
                    }`}>
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className={`font-medium text-sm ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                          {rec.action}
                        </div>
                        <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {rec.description}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Action Steps */}
        <div className={`backdrop-blur-sm rounded-3xl p-8 shadow-xl border mb-8 ${
          darkMode 
            ? 'bg-gray-800/70 border-gray-600' 
            : 'bg-white/70 border-white/20'
        }`}>
          <h3 className={`text-2xl font-bold mb-6 flex items-center ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            <TrendingUp className="w-6 h-6 mr-3 text-green-500" />
            Your Action Plan
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {riskAssessments
              .flatMap(assessment => assessment.recommendations)
              .filter(rec => rec.priority === 'high')
              .slice(0, 6)
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
                    {recommendation.impact && (
                      <div className="text-xs text-green-500 font-medium mt-1">
                        Impact: {recommendation.impact}
                      </div>
                    )}
                  </div>
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
                  This basic risk assessment is for educational purposes only and should not replace 
                  professional medical advice, diagnosis, or treatment.
                </p>
                <p>
                  <strong>Please consult with your healthcare provider to:</strong>
                </p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Discuss these results in the context of your complete medical history</li>
                  <li>Develop a personalized screening and prevention plan</li>
                  <li>Address any high-risk factors identified in this assessment</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="text-center space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onUpgrade}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-full hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 text-lg"
            >
              <Star className="w-6 h-6 mr-3" />
              Get Complete Analysis
            </button>
            <button
              onClick={onRestart}
              className={`inline-flex items-center px-8 py-4 font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 text-lg ${
                darkMode 
                  ? 'bg-gray-700 text-white hover:bg-gray-600' 
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              <RotateCcw className="w-6 h-6 mr-3" />
              Take Assessment Again
            </button>
          </div>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Consider retaking this assessment annually or when your health status changes
          </p>
        </div>
      </div>
    </div>
  );
};

export default BasicResults;