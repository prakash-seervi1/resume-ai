import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Brain, Menu, X, Star, TrendingUp } from 'lucide-react';
import { AnalysisResult } from '../types';

interface HeaderProps {
  analysisResult: AnalysisResult | null;
}

const Header: React.FC<HeaderProps> = ({ analysisResult }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    // { name: 'Home', href: '/' },
    { name: 'Upload Resume', href: '/upload' },
    // { name: 'Analysis', href: '/analysis', disabled: !analysisResult },
    // { name: 'Job Matches', href: '/jobs', disabled: !analysisResult },
    { name: 'Resume Builder', href: '/resume-builder' },
    // { name: 'About', href: '/about' },
    // { name: 'Contact', href: '/contact' },
  ];

  const isActive = (href: string) => location.pathname === href;

  const getJobRolesCount = (result: Record<string, any>) => {
    if (Array.isArray(result.jobMatches)) return result.jobMatches.length;
    if (Array.isArray(result.job_roles)) return result.job_roles.length;
    return 0;
  };

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Smart Resume Analyzer</h1>
              <p className="text-sm text-gray-500 hidden sm:block">AI-Powered Career Intelligence</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`
                  px-3 py-2 rounded-md text-sm font-medium transition-colors
                  ${item.disabled 
                    ? 'text-gray-400 cursor-not-allowed' 
                    : isActive(item.href)
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }
                `}
                onClick={(e) => item.disabled && e.preventDefault()}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Resume Stats (Desktop) */}
          {analysisResult && (
            <div className="hidden lg:flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-medium text-gray-700">
                  Score: {analysisResult.overallScore}/100
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium text-gray-700">
                  {getJobRolesCount(analysisResult)} Jobs
                </span>
              </div>
            </div>
          )}

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-50"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t">
            <div className="space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`
                    block px-3 py-2 rounded-md text-base font-medium transition-colors
                    ${item.disabled 
                      ? 'text-gray-400 cursor-not-allowed' 
                      : isActive(item.href)
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                    }
                  `}
                  onClick={(e) => {
                    if (item.disabled) e.preventDefault();
                    setIsMenuOpen(false);
                  }}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Mobile Resume Stats */}
            {analysisResult && (
              <div className="mt-4 pt-4 border-t">
                <div className="flex items-center justify-between px-3">
                  <div className="flex items-center space-x-2">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm font-medium text-gray-700">
                      Resume Score: {analysisResult.overallScore}/100
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-medium text-gray-700">
                      {getJobRolesCount(analysisResult)} Job Matches
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;