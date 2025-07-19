import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, Shield, Users } from 'lucide-react';

interface ContactPageProps {
  darkMode: boolean;
}

const ContactPage: React.FC<ContactPageProps> = ({ darkMode }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Contact form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen pt-20 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className={`inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-8 shadow-lg`}>
            <Mail className="w-12 h-12 text-white" />
          </div>
          <h1 className={`text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent mb-6`}>
            Contact Us
          </h1>
          <p className={`text-xl max-w-3xl mx-auto leading-relaxed ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Have questions about our cancer risk assessment? We're here to help. Reach out to our team for support, feedback, or partnership opportunities.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className={`backdrop-blur-sm rounded-3xl p-8 shadow-xl ${
              darkMode ? 'bg-gray-800/60' : 'bg-white/60'
            }`}>
              <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Get in Touch
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className={`font-semibold mb-1 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                      Email Support
                    </h3>
                    <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-1`}>
                      support@cancerrisk.com
                    </p>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      We typically respond within 24 hours
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className={`font-semibold mb-1 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                      Phone Support
                    </h3>
                    <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-1`}>
                      +1 (555) 123-4567
                    </p>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Monday - Friday, 9 AM - 6 PM EST
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className={`font-semibold mb-1 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                      Office Location
                    </h3>
                    <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-1`}>
                      123 Health Plaza, Suite 456<br />
                      Medical District, NY 10001
                    </p>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      By appointment only
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className={`font-semibold mb-1 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                      Business Hours
                    </h3>
                    <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-1`}>
                      Monday - Friday: 9:00 AM - 6:00 PM EST<br />
                      Saturday: 10:00 AM - 2:00 PM EST<br />
                      Sunday: Closed
                    </p>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Emergency support available 24/7
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Support Categories */}
            <div className={`backdrop-blur-sm rounded-3xl p-8 shadow-xl ${
              darkMode ? 'bg-gray-800/60' : 'bg-white/60'
            }`}>
              <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                How Can We Help?
              </h2>
              
              <div className="space-y-4">
                <div className={`p-4 rounded-lg border-l-4 border-blue-500 ${
                  darkMode ? 'bg-gray-700/50' : 'bg-blue-50'
                }`}>
                  <h3 className={`font-semibold mb-1 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    Technical Support
                  </h3>
                  <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Issues with assessment completion, account access, or platform functionality
                  </p>
                </div>

                <div className={`p-4 rounded-lg border-l-4 border-green-500 ${
                  darkMode ? 'bg-gray-700/50' : 'bg-green-50'
                }`}>
                  <h3 className={`font-semibold mb-1 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    Medical Questions
                  </h3>
                  <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Questions about assessment methodology, results interpretation, or health recommendations
                  </p>
                </div>

                <div className={`p-4 rounded-lg border-l-4 border-purple-500 ${
                  darkMode ? 'bg-gray-700/50' : 'bg-purple-50'
                }`}>
                  <h3 className={`font-semibold mb-1 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    Privacy & Security
                  </h3>
                  <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Concerns about data protection, privacy policies, or security measures
                  </p>
                </div>

                <div className={`p-4 rounded-lg border-l-4 border-orange-500 ${
                  darkMode ? 'bg-gray-700/50' : 'bg-orange-50'
                }`}>
                  <h3 className={`font-semibold mb-1 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    Partnership & Business
                  </h3>
                  <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Collaboration opportunities, enterprise solutions, or business inquiries
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className={`backdrop-blur-sm rounded-3xl p-8 shadow-xl ${
            darkMode ? 'bg-gray-800/60' : 'bg-white/60'
          }`}>
            <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Send us a Message
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className={`w-full px-4 py-3 rounded-lg border transition-colors duration-300 ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-purple-500 focus:ring-purple-500'
                  }`}
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label htmlFor="email" className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className={`w-full px-4 py-3 rounded-lg border transition-colors duration-300 ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-purple-500 focus:ring-purple-500'
                  }`}
                  placeholder="Enter your email address"
                />
              </div>

              <div>
                <label htmlFor="subject" className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Subject *
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className={`w-full px-4 py-3 rounded-lg border transition-colors duration-300 ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white focus:border-purple-500 focus:ring-purple-500' 
                      : 'bg-white border-gray-300 text-gray-900 focus:border-purple-500 focus:ring-purple-500'
                  }`}
                >
                  <option value="">Select a subject</option>
                  <option value="technical-support">Technical Support</option>
                  <option value="medical-questions">Medical Questions</option>
                  <option value="privacy-security">Privacy & Security</option>
                  <option value="partnership-business">Partnership & Business</option>
                  <option value="feedback">Feedback</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className={`w-full px-4 py-3 rounded-lg border transition-colors duration-300 resize-none ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-purple-500 focus:ring-purple-500'
                  }`}
                  placeholder="Please describe your inquiry in detail..."
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
              >
                <Send className="w-5 h-5" />
                <span>Send Message</span>
              </button>
            </form>

            <div className={`mt-6 p-4 rounded-lg ${
              darkMode ? 'bg-gray-700/50' : 'bg-blue-50'
            }`}>
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <Shield className="w-4 h-4 inline mr-2" />
                Your information is protected and will only be used to respond to your inquiry.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className={`backdrop-blur-sm rounded-3xl p-8 mt-16 shadow-xl ${
          darkMode ? 'bg-gray-800/60' : 'bg-white/60'
        }`}>
          <div className="text-center mb-8">
            <h2 className={`text-3xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Frequently Asked Questions
            </h2>
            <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Quick answers to common questions
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className={`text-lg font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                How accurate are the risk assessments?
              </h3>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Our assessments are based on validated scientific models and peer-reviewed research. However, they are for educational purposes and should not replace professional medical advice.
              </p>
            </div>

            <div>
              <h3 className={`text-lg font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Is my health data secure?
              </h3>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Yes, we use enterprise-grade encryption and follow HIPAA guidelines to protect your personal health information. We never share your data without explicit consent.
              </p>
            </div>

            <div>
              <h3 className={`text-lg font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Can I use this for medical diagnosis?
              </h3>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                No, our assessments are for educational and screening purposes only. Always consult with healthcare professionals for medical diagnosis and treatment decisions.
              </p>
            </div>

            <div>
              <h3 className={`text-lg font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                How long does the assessment take?
              </h3>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                The quick assessment takes about 5 minutes, while the comprehensive assessment takes 15-20 minutes. You can save your progress and return later.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage; 