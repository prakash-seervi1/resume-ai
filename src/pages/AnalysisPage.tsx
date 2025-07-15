import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Target } from 'lucide-react';
import AnalysisResults from '../components/AnalysisResults';
import { AnalysisResult } from '../types';

interface AnalysisPageProps {
  result: AnalysisResult;
}

const AnalysisPage: React.FC<AnalysisPageProps> = ({ result }) => {
  return (
    <div className="py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Resume Analysis Complete</h1>
          <p className="text-gray-600">Your comprehensive AI-powered resume evaluation</p>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Link
            to="/jobs"
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all flex items-center justify-center space-x-2"
          >
            <Target className="w-5 h-5" />
            <span>View Job Matches</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <AnalysisResults result={result} />
    </div>
  );
};

export default AnalysisPage;