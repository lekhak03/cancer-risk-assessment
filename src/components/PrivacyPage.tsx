import React from 'react';
import { Shield, Lock, Eye, Database, Users, FileText, Calendar, CheckCircle } from 'lucide-react';

interface PrivacyPageProps {
  darkMode: boolean;
}

const PrivacyPage: React.FC<PrivacyPageProps> = ({ darkMode }) => {
  return (
    <div className="min-h-screen pt-20 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className={`inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-8 shadow-lg`}>
            <Shield className="w-12 h-12 text-white" />
          </div>
          <h1 className={`text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent mb-6`}>
            Privacy Policy
          </h1>
          <p className={`text-xl max-w-3xl mx-auto leading-relaxed ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Your privacy is our priority. Learn how we protect and handle your personal health information.
          </p>
          <p className={`text-sm mt-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Last updated: December 2024
          </p>
        </div>

        {/* Policy Overview */}
        <div className={`backdrop-blur-sm rounded-3xl p-8 mb-12 shadow-xl ${
          darkMode ? 'bg-gray-800/60' : 'bg-white/60'
        }`}>
          <h2 className={`text-3xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Overview
          </h2>
          <p className={`text-lg mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            CancerRisk ("we," "our," or "us") is committed to protecting your privacy and ensuring the security of your personal health information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our cancer risk assessment platform.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Lock className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Secure & Encrypted
              </h3>
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                All data is encrypted using industry-standard protocols
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Eye className="w-8 h-8 text-green-600" />
              </div>
              <h3 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Transparent
              </h3>
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Clear information about how we use your data
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                User Control
              </h3>
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                You control what data you share and how it's used
              </p>
            </div>
          </div>
        </div>

        {/* Information We Collect */}
        <div className={`backdrop-blur-sm rounded-3xl p-8 mb-12 shadow-xl ${
          darkMode ? 'bg-gray-800/60' : 'bg-white/60'
        }`}>
          <h2 className={`text-3xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Information We Collect
          </h2>
          
          <div className="space-y-8">
            <div>
              <h3 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Personal Information
              </h3>
              <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                We may collect the following personal information when you use our platform:
              </p>
              <ul className={`space-y-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Basic demographic information (age, gender, location)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Health and medical history information</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Lifestyle and behavioral factors</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Contact information (email address)</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Technical Information
              </h3>
              <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                We automatically collect certain technical information:
              </p>
              <ul className={`space-y-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Device information (browser type, operating system)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Usage data (pages visited, time spent)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>IP address and general location</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Cookies and similar tracking technologies</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* How We Use Information */}
        <div className={`backdrop-blur-sm rounded-3xl p-8 mb-12 shadow-xl ${
          darkMode ? 'bg-gray-800/60' : 'bg-white/60'
        }`}>
          <h2 className={`text-3xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            How We Use Your Information
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Primary Uses
              </h3>
              <ul className={`space-y-3 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <span>Generate personalized cancer risk assessments</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <span>Provide health recommendations and insights</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <span>Improve our assessment algorithms and platform</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <span>Respond to your inquiries and provide support</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Research & Development
              </h3>
              <ul className={`space-y-3 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <span>Conduct anonymous research to improve health outcomes</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <span>Develop new assessment tools and methodologies</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <span>Collaborate with medical researchers and institutions</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <span>Publish anonymized statistical data</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Data Security */}
        <div className={`backdrop-blur-sm rounded-3xl p-8 mb-12 shadow-xl ${
          darkMode ? 'bg-gray-800/60' : 'bg-white/60'
        }`}>
          <h2 className={`text-3xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Data Security & Protection
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Security Measures
              </h3>
              <ul className={`space-y-3 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <li className="flex items-start">
                  <Shield className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>End-to-end encryption for all data transmission</span>
                </li>
                <li className="flex items-start">
                  <Shield className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Secure cloud infrastructure with regular backups</span>
                </li>
                <li className="flex items-start">
                  <Shield className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Multi-factor authentication for staff access</span>
                </li>
                <li className="flex items-start">
                  <Shield className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Regular security audits and penetration testing</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Compliance
              </h3>
              <ul className={`space-y-3 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <li className="flex items-start">
                  <Database className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>HIPAA-compliant data handling practices</span>
                </li>
                <li className="flex items-start">
                  <Database className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>GDPR compliance for European users</span>
                </li>
                <li className="flex items-start">
                  <Database className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Regular compliance audits and certifications</span>
                </li>
                <li className="flex items-start">
                  <Database className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Staff training on privacy and security protocols</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Data Sharing */}
        <div className={`backdrop-blur-sm rounded-3xl p-8 mb-12 shadow-xl ${
          darkMode ? 'bg-gray-800/60' : 'bg-white/60'
        }`}>
          <h2 className={`text-3xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Data Sharing & Disclosure
          </h2>
          
          <p className={`text-lg mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
          </p>

          <div className="space-y-6">
            <div className={`p-4 rounded-lg border-l-4 border-blue-500 ${
              darkMode ? 'bg-gray-700/50' : 'bg-blue-50'
            }`}>
              <h3 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                With Your Consent
              </h3>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                We will only share your personal information with third parties when you have given us explicit consent to do so.
              </p>
            </div>

            <div className={`p-4 rounded-lg border-l-4 border-green-500 ${
              darkMode ? 'bg-gray-700/50' : 'bg-green-50'
            }`}>
              <h3 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Service Providers
              </h3>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                We may share information with trusted service providers who assist us in operating our platform, conducting research, or providing support services.
              </p>
            </div>

            <div className={`p-4 rounded-lg border-l-4 border-purple-500 ${
              darkMode ? 'bg-gray-700/50' : 'bg-purple-50'
            }`}>
              <h3 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Legal Requirements
              </h3>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                We may disclose information if required by law, court order, or government regulation, or to protect our rights and safety.
              </p>
            </div>

            <div className={`p-4 rounded-lg border-l-4 border-orange-500 ${
              darkMode ? 'bg-gray-700/50' : 'bg-orange-50'
            }`}>
              <h3 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Anonymized Research
              </h3>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                We may share anonymized, aggregated data for research purposes that cannot be used to identify individual users.
              </p>
            </div>
          </div>
        </div>

        {/* Your Rights */}
        <div className={`backdrop-blur-sm rounded-3xl p-8 mb-12 shadow-xl ${
          darkMode ? 'bg-gray-800/60' : 'bg-white/60'
        }`}>
          <h2 className={`text-3xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Your Rights & Choices
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Access & Control
              </h3>
              <ul className={`space-y-3 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-purple-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Access your personal information</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-purple-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Request correction of inaccurate data</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-purple-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Delete your account and associated data</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-purple-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Export your data in a portable format</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Communication Preferences
              </h3>
              <ul className={`space-y-3 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Opt out of marketing communications</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Control research participation</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Manage cookie preferences</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Set data retention preferences</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className={`backdrop-blur-sm rounded-3xl p-8 shadow-xl ${
          darkMode ? 'bg-gray-800/60' : 'bg-white/60'
        }`}>
          <h2 className={`text-3xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Contact Us
          </h2>
          
          <p className={`text-lg mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            If you have any questions about this Privacy Policy or our data practices, please contact us:
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Privacy Officer
              </h3>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Email: privacy@cancerrisk.com<br />
                Phone: +1 (555) 123-4567<br />
                Address: 123 Health Plaza, Suite 456<br />
                Medical District, NY 10001
              </p>
            </div>
            
            <div>
              <h3 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Data Protection Officer
              </h3>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Email: dpo@cancerrisk.com<br />
                For GDPR-related inquiries<br />
                Response time: Within 30 days
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage; 