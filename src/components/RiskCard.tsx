import React from 'react';
import { AlertTriangle, AlertCircle, CheckCircle, TrendingUp, TrendingDown, Shield, Calendar } from 'lucide-react';
import { RiskAssessment } from '../types/UserData';

interface RiskCardProps {
  assessment: RiskAssessment;
  darkMode?: boolean;
}

const RiskCard: React.FC<RiskCardProps> = ({ assessment, darkMode = false }) => {
  const getRiskColor = (level: string) => {
    switch (level) {
      case 'High': return 'red';
      case 'Elevated': return 'orange';
      case 'Average': return 'yellow';
      default: return 'green';
    }
  };

  const getRiskIcon = (level: string) => {
    switch (level) {
      case 'High': return <AlertTriangle className="w-6 h-6" />;
      case 'Elevated': return <AlertCircle className="w-6 h-6" />;
      case 'Average': return <Shield className="w-6 h-6" />;
      default: return <CheckCircle className="w-6 h-6" />;
    }
  };

  const color = getRiskColor(assessment.riskLevel);
  const icon = getRiskIcon(assessment.riskLevel);

  return (
    <div className={`rounded-3xl shadow-xl border-l-8 border-${color}-500 p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 ${
      darkMode ? 'bg-gray-800' : 'bg-white'
    }`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            {assessment.cancerType}
          </h3>
          <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-${color}-100 text-${color}-700`}>
            {icon}
            <span className="ml-2">{assessment.riskLevel} Risk</span>
          </div>
        </div>
        <div className="text-right">
          <div className={`text-3xl font-bold mb-1 text-${color}-600`}>
            {assessment.absoluteRisk.lifetime.toFixed(1)}%
          </div>
          <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Lifetime Risk</div>
        </div>
      </div>

      {/* Risk Timeline */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className={`text-center p-3 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
          <div className={`text-lg font-bold ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
            {assessment.absoluteRisk.fiveYear.toFixed(1)}%
          </div>
          <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>5-Year Risk</div>
        </div>
        <div className={`text-center p-3 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
          <div className={`text-lg font-bold ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
            {assessment.absoluteRisk.tenYear.toFixed(1)}%
          </div>
          <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>10-Year Risk</div>
        </div>
        <div className={`text-center p-3 rounded-xl ${darkMode ? 'bg-gray-600' : 'bg-gray-100'}`}>
          <div className={`text-lg font-bold ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
            {assessment.relativeRisk.toFixed(1)}x
          </div>
          <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>vs Average</div>
        </div>
      </div>

      {/* Risk Factors */}
      <div className="space-y-4 mb-6">
        {/* Non-Modifiable Factors */}
        {assessment.nonModifiableFactors.length > 0 && (
          <div>
            <h4 className={`font-semibold mb-3 flex items-center ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
              <Shield className="w-4 h-4 mr-2 text-gray-600" />
              Non-Modifiable Risk Factors
            </h4>
            <div className="space-y-2">
              {assessment.nonModifiableFactors.slice(0, 3).map((factor, index) => (
                <div key={index} className={`flex items-start p-3 rounded-lg ${
                  darkMode ? 'bg-gray-700' : 'bg-gray-50'
                }`}>
                  <div className={`w-2 h-2 rounded-full mt-2 mr-3 ${
                    factor.impact === 'high' ? 'bg-red-400' :
                    factor.impact === 'moderate' ? 'bg-orange-400' : 'bg-yellow-400'
                  }`} />
                  <div>
                    <div className={`font-medium text-sm ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                      {factor.factor}
                    </div>
                    <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {factor.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Modifiable Factors */}
        {assessment.modifiableFactors.length > 0 && (
          <div>
            <h4 className={`font-semibold mb-3 flex items-center ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
              <TrendingUp className="w-4 h-4 mr-2 text-orange-600" />
              Modifiable Risk Factors
            </h4>
            <div className="space-y-2">
              {assessment.modifiableFactors.slice(0, 3).map((factor, index) => (
                <div key={index} className={`flex items-start p-3 rounded-lg border ${
                  darkMode 
                    ? 'bg-orange-900/20 border-orange-700' 
                    : 'bg-orange-50 border-orange-200'
                }`}>
                  <div className={`w-2 h-2 rounded-full mt-2 mr-3 ${
                    factor.impact === 'high' ? 'bg-red-500' :
                    factor.impact === 'moderate' ? 'bg-orange-500' : 'bg-yellow-500'
                  }`} />
                  <div>
                    <div className={`font-medium text-sm ${darkMode ? 'text-orange-200' : 'text-orange-800'}`}>
                      {factor.factor}
                    </div>
                    <div className={`text-xs ${darkMode ? 'text-orange-300' : 'text-orange-600'}`}>
                      {factor.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Risk Reduction Potential */}
      {assessment.riskReductionPotential && assessment.riskReductionPotential > 0 && (
        <div className={`mb-6 p-4 rounded-xl border ${
          darkMode 
            ? 'bg-green-900/20 border-green-700' 
            : 'bg-green-50 border-green-200'
        }`}>
          <div className="flex items-center mb-2">
            <TrendingDown className="w-5 h-5 text-green-600 mr-2" />
            <span className={`font-semibold ${darkMode ? 'text-green-200' : 'text-green-800'}`}>
              Risk Reduction Potential
            </span>
          </div>
          <div className="text-2xl font-bold text-green-600 mb-1">
            Up to {assessment.riskReductionPotential}%
          </div>
          <div className={`text-sm ${darkMode ? 'text-green-300' : 'text-green-700'}`}>
            Potential risk reduction through lifestyle modifications
          </div>
        </div>
      )}

      {/* Top Recommendations */}
      {assessment.recommendations.length > 0 && (
        <div className="mb-6">
          <h4 className={`font-semibold mb-3 flex items-center ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
            <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
            Key Recommendations
          </h4>
          <div className="space-y-2">
            {assessment.recommendations
              .filter(rec => rec.priority === 'high' || rec.priority === 'medium')
              .slice(0, 3)
              .map((recommendation, index) => (
                <div key={index} className={`flex items-start p-3 rounded-lg border ${
                  darkMode 
                    ? 'bg-green-900/20 border-green-700' 
                    : 'bg-green-50 border-green-200'
                }`}>
                  <CheckCircle className="w-4 h-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className={`font-medium text-sm ${darkMode ? 'text-green-200' : 'text-green-800'}`}>
                      {recommendation.action}
                    </div>
                    <div className={`text-xs ${darkMode ? 'text-green-300' : 'text-green-600'}`}>
                      {recommendation.description}
                    </div>
                    {recommendation.potentialImpact && (
                      <div className="text-xs text-green-500 font-medium mt-1">
                        {recommendation.potentialImpact}
                      </div>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Screening Timeline */}
      {assessment.screeningTimeline.length > 0 && (
        <div>
          <h4 className={`font-semibold mb-3 flex items-center ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
            <Calendar className="w-4 h-4 mr-2 text-blue-600" />
            Screening Recommendations
          </h4>
          <div className="space-y-2">
            {assessment.screeningTimeline.map((screening, index) => (
              <div key={index} className={`p-3 rounded-lg border ${
                darkMode 
                  ? 'bg-blue-900/20 border-blue-700' 
                  : 'bg-blue-50 border-blue-200'
              }`}>
                <div className={`font-medium text-sm ${darkMode ? 'text-blue-200' : 'text-blue-800'}`}>
                  {screening.test}
                </div>
                <div className={`text-xs ${darkMode ? 'text-blue-300' : 'text-blue-600'}`}>
                  Start at age {screening.startAge} • {screening.frequency}
                </div>
                <div className={`text-xs px-2 py-1 rounded-full inline-block mt-1 ${
                  screening.priority === 'high-risk' ? 'bg-red-100 text-red-700' :
                  screening.priority === 'enhanced' ? 'bg-orange-100 text-orange-700' :
                  'bg-green-100 text-green-700'
                }`}>
                  {screening.priority.replace('-', ' ')}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RiskCard;