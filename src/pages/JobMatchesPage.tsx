import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import JobMatches from '../components/JobMatches';
import { JobMatch } from '../types';

interface JobMatchesPageProps {
  matches: JobMatch[];
}

const JobMatchesPage: React.FC<JobMatchesPageProps> = ({ matches }) => {
  return (
    <div className="py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Job Matches</h1>
            <p className="text-gray-600">AI-curated opportunities tailored to your profile</p>
          </div>
          
          <div className="flex space-x-4">
            <Link
              to="/analysis"
              className="border-2 border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:border-gray-400 hover:bg-gray-50 transition-all flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Analysis</span>
            </Link>
          </div>
        </div>

        {/* Job Application Tips */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
          <h3 className="font-semibold text-blue-900 mb-2">💡 Application Tips</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Focus on jobs with 70%+ match scores for better success rates</li>
            <li>• Customize your resume for each application using the missing skills insights</li>
            <li>• Use our floating AI Career Coach (bottom right) for interview prep and salary advice</li>
          </ul>
        </div>
      </div>

      <JobMatches matches={matches} />
    </div>
  );
};

export default JobMatchesPage;