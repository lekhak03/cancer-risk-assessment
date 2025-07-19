import React from 'react';
import { Heart, Users, TrendingUp, Award, Globe, Zap, Activity } from 'lucide-react';
import SEO from './SEO';

interface AboutPageProps {
  darkMode: boolean;
}

const AboutPage: React.FC<AboutPageProps> = ({ darkMode }) => {
  return (
    <>
      <SEO 
        title="About CancerRisk | Our Mission & Expertise"
        description="Learn about CancerRisk's mission to provide accessible, accurate, and personalized cancer risk assessments. Meet our team of healthcare professionals and technology experts."
        keywords="about cancer risk, healthcare professionals, medical expertise, cancer research, health technology, patient care, medical assessment"
        url="/about"
      />
      <div className="min-h-screen pt-20 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className={`inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-8 shadow-lg`}>
              <Activity className="w-12 h-12 text-white" />
            </div>
            <h1 className={`text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent mb-6`}>
              About CancerRisk
            </h1>
            <p className={`text-xl max-w-3xl mx-auto leading-relaxed ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Empowering individuals with evidence-based cancer risk assessment tools to promote early detection and prevention.
            </p>
          </div>

          {/* Mission Section */}
          <div className={`backdrop-blur-sm rounded-3xl p-8 mb-16 shadow-xl ${
            darkMode ? 'bg-gray-800/60' : 'bg-white/60'
          }`}>
            <div className="text-center mb-8">
              <h2 className={`text-3xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Our Mission
              </h2>
              <p className={`text-lg max-w-4xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                To provide accessible, accurate, and personalized cancer risk assessments that empower individuals to take proactive steps toward their health and well-being.
              </p>
            </div>
          </div>

          {/* Values Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className={`backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
              darkMode ? 'bg-gray-800/60' : 'bg-white/60'
            }`}>
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Heart className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className={`text-xl font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Compassion
              </h3>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                We approach health with empathy and understanding, recognizing that every individual's journey is unique.
              </p>
            </div>

            <div className={`backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
              darkMode ? 'bg-gray-800/60' : 'bg-white/60'
            }`}>
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
              <h3 className={`text-xl font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Innovation
              </h3>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                We continuously evolve our assessment tools based on the latest medical research and technological advances.
              </p>
            </div>

            <div className={`backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
              darkMode ? 'bg-gray-800/60' : 'bg-white/60'
            }`}>
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Zap className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className={`text-xl font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Precision
              </h3>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Our assessments are built on validated scientific models and peer-reviewed research from leading institutions.
              </p>
            </div>

            <div className={`backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
              darkMode ? 'bg-gray-800/60' : 'bg-white/60'
            }`}>
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Users className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className={`text-xl font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Accessibility
              </h3>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                We believe everyone deserves access to quality health information, regardless of their background or location.
              </p>
            </div>
          </div>

          {/* Team Section */}
          <div className={`backdrop-blur-sm rounded-3xl p-8 mb-16 shadow-xl ${
            darkMode ? 'bg-gray-800/60' : 'bg-white/60'
          }`}>
            <div className="text-center mb-8">
              <h2 className={`text-3xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Our Expertise
              </h2>
              <p className={`text-lg max-w-4xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Our platform is developed by a team of healthcare professionals, data scientists, and technology experts committed to improving health outcomes.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Award className="w-10 h-10 text-blue-600" />
                </div>
                <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  Medical Expertise
                </h3>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Collaborations with leading oncologists and healthcare professionals ensure our assessments meet the highest medical standards.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Zap className="w-10 h-10 text-green-600" />
                </div>
                <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  Advanced Technology
                </h3>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Cutting-edge algorithms and machine learning models provide personalized and accurate risk assessments.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-purple-100 w-20 h-20 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Globe className="w-10 h-10 text-purple-600" />
                </div>
                <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  Global Reach
                </h3>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Our platform serves users worldwide, providing valuable health insights to diverse populations.
                </p>
              </div>
            </div>
          </div>

          {/* Commitment Section */}
          <div className={`backdrop-blur-sm rounded-3xl p-8 shadow-xl ${
            darkMode ? 'bg-gray-800/60' : 'bg-white/60'
          }`}>
            <div className="text-center">
              <h2 className={`text-3xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Our Commitment to You
              </h2>
              <div className="grid md:grid-cols-2 gap-8 text-left">
                <div>
                  <h3 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    Privacy & Security
                  </h3>
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                    Your health information is protected with enterprise-grade security measures. We never share your personal data without your explicit consent.
                  </p>
                  <ul className={`space-y-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      End-to-end encryption
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      HIPAA-compliant data handling
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      Regular security audits
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    Continuous Improvement
                  </h3>
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                    We continuously update our assessment models based on the latest medical research and user feedback.
                  </p>
                  <ul className={`space-y-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      Regular model updates
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      User feedback integration
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      Research collaboration
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage; 