import React from 'react';
import { FileText, Scale, AlertTriangle, Shield, Users, Calendar, CheckCircle, Info } from 'lucide-react';

interface LegalPageProps {
  darkMode: boolean;
}

const LegalPage: React.FC<LegalPageProps> = ({ darkMode }) => {
  return (
    <div className="min-h-screen pt-20 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className={`inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-8 shadow-lg`}>
            <Scale className="w-12 h-12 text-white" />
          </div>
          <h1 className={`text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent mb-6`}>
            Legal Information
          </h1>
          <p className={`text-xl max-w-3xl mx-auto leading-relaxed ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Important legal information about using our cancer risk assessment platform.
          </p>
        </div>

        {/* Disclaimer */}
        <div className={`backdrop-blur-sm rounded-3xl p-8 mb-12 shadow-xl border-l-4 border-red-500 ${
          darkMode ? 'bg-gray-800/60' : 'bg-white/60'
        }`}>
          <div className="flex items-start space-x-4 mb-6">
            <AlertTriangle className="w-8 h-8 text-red-500 flex-shrink-0 mt-1" />
            <div>
              <h2 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Medical Disclaimer
              </h2>
              <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                This platform is for educational and screening purposes only.
              </p>
            </div>
          </div>
          
          <div className={`space-y-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            <p>
              <strong>Important:</strong> The cancer risk assessments provided by CancerRisk are for educational and screening purposes only. They are not intended to diagnose, treat, cure, or prevent any disease.
            </p>
            <p>
              <strong>Not Medical Advice:</strong> The information provided through our platform should not be considered as medical advice. Always consult with qualified healthcare professionals for medical diagnosis, treatment, and advice.
            </p>
            <p>
              <strong>Emergency Situations:</strong> If you are experiencing a medical emergency, call your local emergency services immediately. Do not rely on this platform for emergency medical care.
            </p>
          </div>
        </div>

        {/* Terms of Service */}
        <div className={`backdrop-blur-sm rounded-3xl p-8 mb-12 shadow-xl ${
          darkMode ? 'bg-gray-800/60' : 'bg-white/60'
        }`}>
          <h2 className={`text-3xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Terms of Service
          </h2>
          
          <div className="space-y-6">
            <div>
              <h3 className={`text-xl font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Acceptance of Terms
              </h3>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                By accessing and using the CancerRisk platform, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </div>

            <div>
              <h3 className={`text-xl font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Use License
              </h3>
              <p className={`mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Permission is granted to temporarily access the materials on CancerRisk's website for personal, non-commercial transitory viewing only.
              </p>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className={`mt-3 space-y-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <span>Modify or copy the materials</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <span>Use the materials for any commercial purpose</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <span>Attempt to reverse engineer any software on the website</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <span>Remove any copyright or other proprietary notations</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className={`text-xl font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                User Responsibilities
              </h3>
              <ul className={`space-y-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Provide accurate and truthful information</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Maintain the confidentiality of your account</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Use the platform in compliance with applicable laws</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Report any security concerns or violations</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Limitation of Liability */}
        <div className={`backdrop-blur-sm rounded-3xl p-8 mb-12 shadow-xl ${
          darkMode ? 'bg-gray-800/60' : 'bg-white/60'
        }`}>
          <h2 className={`text-3xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Limitation of Liability
          </h2>
          
          <div className="space-y-6">
            <div className={`p-4 rounded-lg border-l-4 border-orange-500 ${
              darkMode ? 'bg-gray-700/50' : 'bg-orange-50'
            }`}>
              <h3 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                No Medical Liability
              </h3>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                CancerRisk shall not be liable for any medical decisions made based on the information provided through our platform. Users are responsible for consulting with healthcare professionals for medical advice.
              </p>
            </div>

            <div className={`p-4 rounded-lg border-l-4 border-blue-500 ${
              darkMode ? 'bg-gray-700/50' : 'bg-blue-50'
            }`}>
              <h3 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Service Availability
              </h3>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                We strive to maintain high availability but do not guarantee uninterrupted access to our services. We are not liable for any damages resulting from service interruptions.
              </p>
            </div>

            <div className={`p-4 rounded-lg border-l-4 border-purple-500 ${
              darkMode ? 'bg-gray-700/50' : 'bg-purple-50'
            }`}>
              <h3 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Data Accuracy
              </h3>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                While we strive for accuracy, we do not guarantee that all information provided is error-free. Users should verify important information independently.
              </p>
            </div>

            <div className={`p-4 rounded-lg border-l-4 border-green-500 ${
              darkMode ? 'bg-gray-700/50' : 'bg-green-50'
            }`}>
              <h3 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Maximum Liability
              </h3>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                In no event shall CancerRisk's total liability exceed the amount paid by the user for the service in the twelve months preceding the claim.
              </p>
            </div>
          </div>
        </div>

        {/* Intellectual Property */}
        <div className={`backdrop-blur-sm rounded-3xl p-8 mb-12 shadow-xl ${
          darkMode ? 'bg-gray-800/60' : 'bg-white/60'
        }`}>
          <h2 className={`text-3xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Intellectual Property Rights
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Our Rights
              </h3>
              <ul className={`space-y-3 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <li className="flex items-start">
                  <Shield className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>All content and materials on this platform are owned by CancerRisk</span>
                </li>
                <li className="flex items-start">
                  <Shield className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Assessment algorithms and methodologies are proprietary</span>
                </li>
                <li className="flex items-start">
                  <Shield className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Trademarks and logos are protected intellectual property</span>
                </li>
                <li className="flex items-start">
                  <Shield className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Software and technology are protected by copyright</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                User Rights
              </h3>
              <ul className={`space-y-3 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <li className="flex items-start">
                  <Users className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>You retain ownership of your personal data</span>
                </li>
                <li className="flex items-start">
                  <Users className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>You may use assessment results for personal purposes</span>
                </li>
                <li className="flex items-start">
                  <Users className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>You can share results with healthcare providers</span>
                </li>
                <li className="flex items-start">
                  <Users className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>You maintain control over your privacy settings</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Governing Law */}
        <div className={`backdrop-blur-sm rounded-3xl p-8 mb-12 shadow-xl ${
          darkMode ? 'bg-gray-800/60' : 'bg-white/60'
        }`}>
          <h2 className={`text-3xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Governing Law & Dispute Resolution
          </h2>
          
          <div className="space-y-6">
            <div>
              <h3 className={`text-xl font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Applicable Law
              </h3>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                These terms shall be governed by and construed in accordance with the laws of the State of New York, United States, without regard to its conflict of law provisions.
              </p>
            </div>

            <div>
              <h3 className={`text-xl font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Dispute Resolution
              </h3>
              <p className={`mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Any disputes arising from the use of our platform shall be resolved through:
              </p>
              <ul className={`space-y-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <span>First, through good faith negotiations</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <span>Then, through mediation if necessary</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <span>Finally, through binding arbitration in New York</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className={`text-xl font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Jurisdiction
              </h3>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                You agree to submit to the personal jurisdiction of the courts located within New York County, New York, for any legal proceedings arising from these terms.
              </p>
            </div>
          </div>
        </div>

        {/* Updates and Changes */}
        <div className={`backdrop-blur-sm rounded-3xl p-8 shadow-xl ${
          darkMode ? 'bg-gray-800/60' : 'bg-white/60'
        }`}>
          <h2 className={`text-3xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Updates and Changes
          </h2>
          
          <div className="space-y-6">
            <div className={`p-4 rounded-lg border-l-4 border-blue-500 ${
              darkMode ? 'bg-gray-700/50' : 'bg-blue-50'
            }`}>
              <h3 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Policy Updates
              </h3>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                We reserve the right to update these legal terms at any time. Changes will be effective immediately upon posting. Continued use of the platform constitutes acceptance of updated terms.
              </p>
            </div>

            <div className={`p-4 rounded-lg border-l-4 border-green-500 ${
              darkMode ? 'bg-gray-700/50' : 'bg-green-50'
            }`}>
              <h3 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Notification of Changes
              </h3>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                We will notify users of significant changes through email notifications and platform announcements. Users are responsible for reviewing updated terms.
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <Calendar className="w-6 h-6 text-purple-500" />
              <div>
                <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  Last Updated
                </h3>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  December 2024
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalPage; 