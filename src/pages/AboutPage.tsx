import React from 'react';
import { Brain, Target, Users, Award, Zap, CheckCircle } from 'lucide-react';

const AboutPage: React.FC = () => {
  const team = [
    {
      name: 'Dr. Sarah Chen',
      role: 'AI Research Director',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      bio: 'PhD in Machine Learning from Stanford. Former Google AI researcher with 10+ years in NLP and career analytics.'
    },
    {
      name: 'Michael Rodriguez',
      role: 'Product Manager',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      bio: 'Former HR executive at Fortune 500 companies. Expert in talent acquisition and career development strategies.'
    },
    {
      name: 'Emily Johnson',
      role: 'Lead Engineer',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      bio: 'Full-stack engineer with expertise in AI/ML systems. Previously built recommendation engines at Netflix.'
    }
  ];

  const values = [
    {
      icon: Brain,
      title: 'AI-First Approach',
      description: 'We leverage cutting-edge artificial intelligence to provide insights that were previously impossible.'
    },
    {
      icon: Users,
      title: 'Human-Centered Design',
      description: 'Technology serves people. Every feature is designed with user experience and career success in mind.'
    },
    {
      icon: Target,
      title: 'Results-Driven',
      description: 'We measure success by your career advancement and job search effectiveness.'
    },
    {
      icon: CheckCircle,
      title: 'Transparency',
      description: 'Clear explanations of how our AI works and why we make specific recommendations.'
    }
  ];

  return (
    <div className="py-12">
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-6">
          <Brain className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          About Smart Resume Analyzer
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed">
          We're on a mission to democratize career success through artificial intelligence. 
          Our platform empowers professionals at every stage to optimize their resumes, 
          discover opportunities, and accelerate their career growth.
        </p>
      </section>

      {/* Mission Section */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-gray-600 mb-4">
                In today's competitive job market, talented professionals often struggle to present 
                their skills effectively. Traditional resume advice is generic and outdated.
              </p>
              <p className="text-gray-600 mb-6">
                We believe everyone deserves access to personalized, data-driven career guidance. 
                Our AI analyzes millions of successful resumes and job postings to provide 
                insights that were previously available only to top-tier career consultants.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">50,000+ resumes analyzed and improved</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">95% of users report improved job search results</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Average 40% increase in interview callbacks</span>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">50K+</div>
                  <div className="text-sm text-gray-600">Resumes Analyzed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">95%</div>
                  <div className="text-sm text-gray-600">Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">10K+</div>
                  <div className="text-sm text-gray-600">Job Matches</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600 mb-2">4.9/5</div>
                  <div className="text-sm text-gray-600">User Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border p-6">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-3 w-12 h-12 mb-4">
                  <value.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600">
              Experts in AI, career development, and human resources
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border p-6 text-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Technology</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built on cutting-edge AI and machine learning technologies to provide 
              the most accurate and actionable career insights.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                <Brain className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Natural Language Processing</h3>
              <p className="text-gray-600">Advanced NLP models extract and analyze skills, experience, and achievements from resumes.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                <Target className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Machine Learning</h3>
              <p className="text-gray-600">ML algorithms trained on millions of job postings to provide accurate job matching and scoring.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                <Zap className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Real-time Analytics</h3>
              <p className="text-gray-600">Live job market data and trends to keep recommendations current and relevant.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;