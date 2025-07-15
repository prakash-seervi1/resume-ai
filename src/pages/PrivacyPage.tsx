import React from 'react';
import { Shield, Lock, Eye, Database, UserCheck, AlertTriangle } from 'lucide-react';

const PrivacyPage: React.FC = () => {
  const sections = [
    {
      icon: Database,
      title: 'Information We Collect',
      content: [
        'Resume content and text you provide for analysis',
        'Account information (name, email) if you create an account',
        'Usage analytics to improve our AI models',
        'Technical data (IP address, browser type) for security'
      ]
    },
    {
      icon: Eye,
      title: 'How We Use Your Information',
      content: [
        'Analyze your resume and provide personalized recommendations',
        'Match you with relevant job opportunities',
        'Improve our AI algorithms and service quality',
        'Send important updates about your analysis results'
      ]
    },
    {
      icon: Lock,
      title: 'Data Security',
      content: [
        'Enterprise-grade encryption for all data transmission',
        'Secure cloud storage with regular security audits',
        'Limited access controls for our technical team',
        'Regular security updates and vulnerability assessments'
      ]
    },
    {
      icon: UserCheck,
      title: 'Your Rights',
      content: [
        'Access and download your personal data at any time',
        'Request deletion of your resume and analysis data',
        'Opt out of marketing communications',
        'Update or correct your personal information'
      ]
    }
  ];

  return (
    <div className="py-12">
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-6">
          <Shield className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Privacy Policy
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed">
          Your privacy is our priority. Learn how we collect, use, and protect your personal information.
        </p>
        <p className="text-sm text-gray-500 mt-4">
          Last updated: January 15, 2024
        </p>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Overview */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-12">
          <h2 className="text-xl font-semibold text-blue-900 mb-3">Privacy Overview</h2>
          <p className="text-blue-800 mb-4">
            Smart Resume Analyzer is committed to protecting your privacy and ensuring the security of your personal information. 
            This policy explains how we handle your data when you use our AI-powered career services.
          </p>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4 text-blue-600" />
              <span className="text-blue-800">Data Encrypted</span>
            </div>
            <div className="flex items-center space-x-2">
              <Lock className="w-4 h-4 text-blue-600" />
              <span className="text-blue-800">Secure Storage</span>
            </div>
            <div className="flex items-center space-x-2">
              <UserCheck className="w-4 h-4 text-blue-600" />
              <span className="text-blue-800">Your Control</span>
            </div>
          </div>
        </div>

        {/* Main Sections */}
        <div className="space-y-12">
          {sections.map((section, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-3">
                  <section.icon className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">{section.title}</h2>
              </div>
              <ul className="space-y-3">
                {section.content.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start space-x-3">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Data Retention */}
        <div className="bg-white rounded-xl shadow-sm border p-8 mt-12">
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-3">
              <Database className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Data Retention</h2>
          </div>
          <div className="space-y-4 text-gray-700">
            <p>
              We retain your personal information only as long as necessary to provide our services and comply with legal obligations:
            </p>
            <ul className="space-y-2 ml-4">
              <li>• <strong>Resume data:</strong> Stored until you request deletion or 2 years of inactivity</li>
              <li>• <strong>Analysis results:</strong> Kept for 1 year to enable result comparison</li>
              <li>• <strong>Account information:</strong> Maintained while your account is active</li>
              <li>• <strong>Usage analytics:</strong> Anonymized and aggregated for service improvement</li>
            </ul>
          </div>
        </div>

        {/* Third-Party Services */}
        <div className="bg-white rounded-xl shadow-sm border p-8 mt-12">
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-3">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Third-Party Services</h2>
          </div>
          <div className="space-y-4 text-gray-700">
            <p>
              We use trusted third-party services to enhance our platform. These services have their own privacy policies:
            </p>
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Google Cloud AI</h3>
                <p className="text-sm text-gray-600">
                  Powers our resume analysis and natural language processing capabilities.
                </p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Analytics Services</h3>
                <p className="text-sm text-gray-600">
                  Help us understand how users interact with our platform to improve the experience.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-8 mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Questions About Privacy?</h2>
          <p className="text-gray-700 mb-6">
            If you have any questions about this privacy policy or how we handle your data, 
            please don't hesitate to contact us.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="mailto:privacy@smartresume.ai"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors text-center"
            >
              Email Privacy Team
            </a>
            <a
              href="/contact"
              className="border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors text-center"
            >
              Contact Support
            </a>
          </div>
        </div>

        {/* Updates Notice */}
        <div className="text-center mt-12 p-6 bg-gray-50 rounded-lg">
          <p className="text-gray-600">
            We may update this privacy policy from time to time. We'll notify you of any significant changes 
            via email or through our platform. Your continued use of our services after changes indicates 
            your acceptance of the updated policy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;