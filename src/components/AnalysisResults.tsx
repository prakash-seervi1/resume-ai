import React from 'react';
import { Star, TrendingUp, AlertTriangle, CheckCircle, Target, Award, Brain } from 'lucide-react';
import { AnalysisResult } from '../types';

interface AnalysisResultsProps {
  result: AnalysisResult;
}

const AnalysisResults: React.FC<AnalysisResultsProps> = ({ result }) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-green-100';
    if (score >= 60) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSkillLevelColor = (level: string) => {
    switch (level) {
      case 'Expert': return 'bg-purple-100 text-purple-800';
      case 'Advanced': return 'bg-blue-100 text-blue-800';
      case 'Intermediate': return 'bg-green-100 text-green-800';
      case 'Beginner': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header with Overall Score */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Resume Analysis Results</h2>
            <p className="text-gray-600">Comprehensive AI-powered evaluation of your resume</p>
          </div>
          <div className={`${getScoreBg(result.overallScore)} rounded-full p-4`}>
            <div className="text-center">
              <div className={`text-3xl font-bold ${getScoreColor(result.overallScore)}`}>
                {result.overallScore}
              </div>
              <div className="text-sm text-gray-600">Overall Score</div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="bg-blue-100 rounded-full p-3 w-12 h-12 mx-auto mb-2">
              <Award className="w-6 h-6 text-blue-600" />
            </div>
            <div className="font-semibold text-gray-900">{result.experienceLevel}</div>
            <div className="text-sm text-gray-600">Experience Level</div>
          </div>
          <div className="text-center">
            <div className="bg-green-100 rounded-full p-3 w-12 h-12 mx-auto mb-2">
              <Target className="w-6 h-6 text-green-600" />
            </div>
            <div className="font-semibold text-gray-900">{result.atsCompatibility}%</div>
            <div className="text-sm text-gray-600">ATS Compatible</div>
          </div>
          <div className="text-center">
            <div className="bg-purple-100 rounded-full p-3 w-12 h-12 mx-auto mb-2">
              <Brain className="w-6 h-6 text-purple-600" />
            </div>
            <div className="font-semibold text-gray-900">{(result.skills || []).length}</div>
            <div className="text-sm text-gray-600">Skills Identified</div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Skills Analysis */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Star className="w-5 h-5 text-yellow-500" />
            <h3 className="text-lg font-semibold text-gray-900">Skills Analysis</h3>
          </div>
          
          <div className="space-y-4">
            {['Technical', 'Soft', 'Language', 'Certification'].map(category => {
              const categorySkills = (result.skills || []).filter(skill => skill.category === category);
              if (categorySkills.length === 0) return null;
              
              return (
                <div key={category}>
                  <h4 className="font-medium text-gray-700 mb-2">{category} Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {categorySkills.map((skill, index) => (
                      <span
                        key={index}
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getSkillLevelColor(skill.level)}`}
                      >
                        {skill.name} ({skill.level})
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Strengths & Weaknesses */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center space-x-2 mb-4">
            <TrendingUp className="w-5 h-5 text-green-500" />
            <h3 className="text-lg font-semibold text-gray-900">Strengths & Areas for Improvement</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-green-700 mb-2 flex items-center space-x-1">
                <CheckCircle className="w-4 h-4" />
                <span>Strengths</span>
              </h4>
              <ul className="space-y-1">
                {((result.strengths || [])).map((strength, index) => (
                  <li key={index} className="text-sm text-gray-600 flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>{strength}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-orange-700 mb-2 flex items-center space-x-1">
                <AlertTriangle className="w-4 h-4" />
                <span>Areas for Improvement</span>
              </h4>
              <ul className="space-y-1">
                {((result.weaknesses || [])).map((weakness, index) => (
                  <li key={index} className="text-sm text-gray-600 flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>{weakness}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Improvement Suggestions */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Target className="w-5 h-5 text-blue-500" />
          <h3 className="text-lg font-semibold text-gray-900">Improvement Suggestions</h3>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
          {((result.suggestions || [])).map((suggestion, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <span className="font-medium text-gray-900">{suggestion.category}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(suggestion.priority)}`}>
                  {suggestion.priority}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-2">{suggestion.suggestion}</p>
              <p className="text-xs text-gray-500">
                <strong>Impact:</strong> {suggestion.impact}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Keyword Density */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Brain className="w-5 h-5 text-purple-500" />
          <h3 className="text-lg font-semibold text-gray-900">Keyword Analysis</h3>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(result.keywordDensity || {}).map(([keyword, count]) => (
            <div key={keyword} className="text-center">
              <div className="text-2xl font-bold text-gray-900">{count}</div>
              <div className="text-sm text-gray-600 capitalize">{keyword}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalysisResults;