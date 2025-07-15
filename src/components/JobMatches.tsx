import React, { useState } from 'react';
import { MapPin, DollarSign, Clock, Building, Star, ExternalLink, Filter, Search } from 'lucide-react';
import { JobMatch } from '../types';

interface JobMatchesProps {
  matches: JobMatch[];
}

const JobMatches: React.FC<JobMatchesProps> = ({ matches }) => {
  const [sortBy, setSortBy] = useState<'matchScore' | 'salary' | 'title'>('matchScore');
  const [filterType, setFilterType] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const getMatchColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const filteredAndSortedMatches = matches
    .filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           job.company.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === 'all' || job.type === filterType;
      return matchesSearch && matchesType;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'matchScore':
          return b.matchScore - a.matchScore;
        case 'salary':
          return parseInt(b.salary.replace(/\D/g, '')) - parseInt(a.salary.replace(/\D/g, ''));
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Job Matches</h2>
            <p className="text-gray-600">AI-curated opportunities based on your resume</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600">{matches.length}</div>
            <div className="text-sm text-gray-600">Matches Found</div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search jobs or companies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="matchScore">Sort by Match Score</option>
            <option value="salary">Sort by Salary</option>
            <option value="title">Sort by Title</option>
          </select>
          
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Types</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Remote">Remote</option>
          </select>
        </div>
      </div>

      {/* Job Cards */}
      <div className="space-y-4">
        {filteredAndSortedMatches.map((job) => (
          <div key={job.id} className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getMatchColor(job.matchScore)}`}>
                    {job.matchScore}% Match
                  </span>
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                  <div className="flex items-center space-x-1">
                    <Building className="w-4 h-4" />
                    <span>{job.company}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <DollarSign className="w-4 h-4" />
                    <span>{job.salary}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{job.type}</span>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4 line-clamp-2">{job.description}</p>
              </div>
              
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                <span>Apply</span>
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Required Skills</h4>
                <div className="flex flex-wrap gap-1">
                  {job.requiredSkills.slice(0, 4).map((skill, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                      {skill}
                    </span>
                  ))}
                  {job.requiredSkills.length > 4 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                      +{job.requiredSkills.length - 4} more
                    </span>
                  )}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-green-700 mb-2">Matching Skills</h4>
                <div className="flex flex-wrap gap-1">
                  {job.matchingSkills.slice(0, 4).map((skill, index) => (
                    <span key={index} className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">
                      {skill}
                    </span>
                  ))}
                  {job.matchingSkills.length > 4 && (
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">
                      +{job.matchingSkills.length - 4} more
                    </span>
                  )}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-red-700 mb-2">Skills to Learn</h4>
                <div className="flex flex-wrap gap-1">
                  {job.missingSkills.slice(0, 4).map((skill, index) => (
                    <span key={index} className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded">
                      {skill}
                    </span>
                  ))}
                  {job.missingSkills.length > 4 && (
                    <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded">
                      +{job.missingSkills.length - 4} more
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredAndSortedMatches.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border p-12 text-center">
          <Filter className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No matches found</h3>
          <p className="text-gray-600">Try adjusting your search terms or filters</p>
        </div>
      )}
    </div>
  );
};

export default JobMatches;