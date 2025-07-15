export interface Skill {
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  category: 'Technical' | 'Soft' | 'Language' | 'Certification';
}

export interface JobMatch {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  matchScore: number;
  requiredSkills: string[];
  matchingSkills: string[];
  missingSkills: string[];
  description: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Remote';
}

export interface ImprovementSuggestion {
  category: 'Skills' | 'Experience' | 'Education' | 'Format' | 'Keywords';
  priority: 'High' | 'Medium' | 'Low';
  suggestion: string;
  impact: string;
}

export interface AnalysisResult {
  overallScore: number;
  skills: Skill[];
  experienceLevel: 'Entry' | 'Mid' | 'Senior' | 'Executive';
  strengths: string[];
  weaknesses: string[];
  suggestions: ImprovementSuggestion[];
  jobMatches: JobMatch[];
  keywordDensity: { [key: string]: number };
  atsCompatibility: number;
}