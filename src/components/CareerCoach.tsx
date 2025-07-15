import React, { useState } from 'react';
import { MessageCircle, Send, Bot, User, Lightbulb, TrendingUp, Target } from 'lucide-react';
import { AnalysisResult } from '../types';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

interface CareerCoachProps {
  analysisResult: AnalysisResult;
}

const CareerCoach: React.FC<CareerCoachProps> = ({ analysisResult }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: `Hello! I'm your AI Career Coach. I've analyzed your resume and I'm here to help you advance your career. Based on your ${analysisResult.experienceLevel.toLowerCase()}-level experience and ${analysisResult.overallScore}/100 resume score, I can provide personalized guidance on career development, skill improvement, and job search strategies. What would you like to discuss?`,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const quickQuestions = [
    "How can I improve my resume score?",
    "What skills should I focus on learning?",
    "How do I negotiate salary?",
    "What are the best job search strategies?",
    "How can I prepare for interviews?",
    "Should I consider a career change?"
  ];

  const generateResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('resume') || lowerMessage.includes('improve')) {
      return `Based on your resume analysis, here are key areas to improve:

• **Skills Enhancement**: Focus on ${analysisResult.suggestions.filter(s => s.category === 'Skills').length > 0 ? analysisResult.suggestions.find(s => s.category === 'Skills')?.suggestion : 'adding more relevant technical skills'}

• **ATS Optimization**: Your current ATS compatibility is ${analysisResult.atsCompatibility}%. Consider adding more industry keywords.

• **Experience Presentation**: Highlight quantifiable achievements and impact metrics.

Your strongest areas are: ${analysisResult.strengths.slice(0, 2).join(', ')}. Build on these while addressing: ${analysisResult.weaknesses.slice(0, 2).join(', ')}.`;
    }
    
    if (lowerMessage.includes('skill') || lowerMessage.includes('learn')) {
      const missingSkills = analysisResult.jobMatches.flatMap(job => job.missingSkills).slice(0, 5);
      return `Based on job market analysis, I recommend focusing on these high-demand skills:

**Priority Skills to Learn:**
${missingSkills.map(skill => `• ${skill}`).join('\n')}

**Learning Path:**
1. Start with online courses (Coursera, Udemy, Pluralsight)
2. Build practical projects to demonstrate skills
3. Contribute to open-source projects
4. Obtain relevant certifications

Your current ${analysisResult.experienceLevel.toLowerCase()}-level experience is a great foundation. Focus on 1-2 skills at a time for maximum impact.`;
    }
    
    if (lowerMessage.includes('salary') || lowerMessage.includes('negotiate')) {
      return `Salary negotiation strategies for ${analysisResult.experienceLevel.toLowerCase()}-level professionals:

**Research Phase:**
• Use Glassdoor, PayScale, and levels.fyi for market data
• Consider your location and industry standards
• Factor in your unique skills and achievements

**Negotiation Tips:**
• Wait for the offer before discussing salary
• Present your value proposition clearly
• Consider the total compensation package
• Be prepared to justify your ask with data

**Your Advantage:**
With a ${analysisResult.overallScore}/100 resume score and ${analysisResult.jobMatches.length} job matches, you have good market positioning. Highlight your strongest skills: ${analysisResult.strengths.slice(0, 2).join(', ')}.`;
    }
    
    if (lowerMessage.includes('interview') || lowerMessage.includes('prepare')) {
      return `Interview preparation tailored to your profile:

**Technical Preparation:**
• Review your key skills: ${analysisResult.skills.filter(s => s.category === 'Technical').slice(0, 4).map(s => s.name).join(', ')}
• Prepare STAR method examples for behavioral questions
• Practice coding challenges (if applicable)

**Common Questions to Prepare:**
• "Tell me about yourself" - craft a compelling narrative
• "Why are you interested in this role?"
• "Describe a challenging project you worked on"

**Your Strengths to Highlight:**
${analysisResult.strengths.map(strength => `• ${strength}`).join('\n')}

**Areas to Address Proactively:**
Be ready to discuss how you're improving in: ${analysisResult.weaknesses.slice(0, 2).join(', ')}.`;
    }
    
    return `That's a great question! As your AI career coach, I can help you with:

• **Resume optimization** - improving your current ${analysisResult.overallScore}/100 score
• **Skill development** - focusing on high-demand technologies
• **Job search strategy** - leveraging your ${analysisResult.jobMatches.length} current matches
• **Interview preparation** - highlighting your ${analysisResult.experienceLevel.toLowerCase()}-level experience
• **Career planning** - next steps for professional growth

What specific area would you like to explore further? I can provide personalized advice based on your resume analysis.`;
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: generateResponse(inputMessage),
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickQuestion = (question: string) => {
    setInputMessage(question);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 rounded-full p-2">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">AI Career Coach</h2>
              <p className="text-blue-100">Personalized guidance for your career growth</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="p-4 bg-gray-50 border-b">
          <div className="flex items-center space-x-2 mb-3">
            <Lightbulb className="w-4 h-4 text-yellow-500" />
            <span className="text-sm font-medium text-gray-700">Quick Questions:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {quickQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => handleQuickQuestion(question)}
                className="px-3 py-1 bg-white border border-gray-200 rounded-full text-sm text-gray-700 hover:bg-gray-100 transition-colors"
              >
                {question}
              </button>
            ))}
          </div>
        </div>

        {/* Messages */}
        <div className="h-96 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start space-x-3 ${
                message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
              }`}
            >
              <div className={`
                flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center
                ${message.type === 'user' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-600'
                }
              `}>
                {message.type === 'user' ? (
                  <User className="w-4 h-4" />
                ) : (
                  <Bot className="w-4 h-4" />
                )}
              </div>
              
              <div className={`
                max-w-xs lg:max-w-md px-4 py-2 rounded-lg
                ${message.type === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-900'
                }
              `}>
                <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                <div className={`
                  text-xs mt-1 opacity-70
                  ${message.type === 'user' ? 'text-blue-100' : 'text-gray-500'}
                `}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-gray-100 text-gray-900 px-4 py-2 rounded-lg">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-4 border-t">
          <div className="flex space-x-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask me anything about your career..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isTyping}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Career Insights */}
      <div className="mt-8 grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="flex items-center space-x-2 mb-3">
            <Target className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-gray-900">Career Goals</h3>
          </div>
          <p className="text-sm text-gray-600">
            Based on your {analysisResult.experienceLevel.toLowerCase()}-level experience, 
            focus on leadership skills and strategic thinking for career advancement.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="flex items-center space-x-2 mb-3">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <h3 className="font-semibold text-gray-900">Market Trends</h3>
          </div>
          <p className="text-sm text-gray-600">
            Your skills align well with current market demands. 
            Consider expanding into emerging technologies for competitive advantage.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="flex items-center space-x-2 mb-3">
            <Lightbulb className="w-5 h-5 text-yellow-600" />
            <h3 className="font-semibold text-gray-900">Next Steps</h3>
          </div>
          <p className="text-sm text-gray-600">
            Improve your resume score from {analysisResult.overallScore}/100 by addressing 
            the high-priority suggestions in your analysis.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CareerCoach;