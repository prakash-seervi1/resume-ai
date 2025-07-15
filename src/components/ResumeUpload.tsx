import React, { useState, useRef } from 'react';
import { Upload, FileText, Loader2, Sparkles, CheckCircle } from 'lucide-react';
import { getPresignedUrl, uploadFileToGCS, analyzeResumeGCS } from '../services/aiService';
import { AnalysisResult } from '../types';

interface ResumeUploadProps {
  onAnalysisComplete: (result: AnalysisResult) => void;
  isAnalyzing: boolean;
  setIsAnalyzing: (analyzing: boolean) => void;
}

const ResumeUpload: React.FC<ResumeUploadProps> = ({ 
  onAnalysisComplete, 
  isAnalyzing, 
  setIsAnalyzing 
}) => {
  const [resumeText, setResumeText] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    try {
      if (selectedFile) {
        // 1. Get presigned URL
        const { url, filePath } = await getPresignedUrl(selectedFile.name, selectedFile.type);
        // 2. Upload file to GCS
        await uploadFileToGCS(url, selectedFile, selectedFile.type);
        // 3. Analyze the uploaded resume
        const { analysis } = await analyzeResumeGCS(filePath, selectedFile.type, 'demo_user_001');
        onAnalysisComplete(analysis);
      } else if (resumeText.trim()) {
        // Fallback: treat pasted text as a .txt file
        const blob = new Blob([resumeText], { type: 'text/plain' });
        const fakeFile = new File([blob], 'resume.txt', { type: 'text/plain' });
        const { url, filePath } = await getPresignedUrl(fakeFile.name, fakeFile.type);
        await uploadFileToGCS(url, fakeFile, fakeFile.type);
        const { analysis } = await analyzeResumeGCS(filePath, fakeFile.type, 'demo_user_001');
        onAnalysisComplete(analysis);
      }
    } catch (error) {
      console.error('Analysis failed:', error);
      // Optionally show error to user
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      setSelectedFile(files[0]);
      setResumeText('');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setResumeText('');
    }
  };

  const handleChooseFile = () => {
    fileInputRef.current?.click();
  };

  const sampleResume = `John Smith
Software Engineer
Email: john.smith@email.com | Phone: (555) 123-4567
LinkedIn: linkedin.com/in/johnsmith

PROFESSIONAL SUMMARY
Experienced Full-Stack Developer with 5+ years of expertise in React, Node.js, and cloud technologies. Proven track record of delivering scalable web applications and leading development teams.

TECHNICAL SKILLS
• Frontend: React, TypeScript, JavaScript, HTML5, CSS3, Tailwind CSS
• Backend: Node.js, Express, Python, Django, REST APIs
• Databases: PostgreSQL, MongoDB, Redis
• Cloud: AWS, Docker, Kubernetes, CI/CD
• Tools: Git, Jest, Webpack, Figma

PROFESSIONAL EXPERIENCE

Senior Software Engineer | TechCorp Inc. | 2021 - Present
• Led development of customer-facing web application serving 100K+ users
• Implemented microservices architecture reducing system latency by 40%
• Mentored junior developers and conducted code reviews
• Collaborated with product managers and designers on feature planning

Software Developer | StartupXYZ | 2019 - 2021
• Built responsive web applications using React and Node.js
• Developed RESTful APIs and integrated third-party services
• Optimized database queries improving performance by 30%
• Participated in agile development processes and sprint planning

EDUCATION
Bachelor of Science in Computer Science
University of Technology | 2015 - 2019

CERTIFICATIONS
• AWS Certified Solutions Architect
• Google Cloud Professional Developer`;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4">
          <Sparkles className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          AI-Powered Resume Analysis
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Upload your resume and get instant insights on skills, job matches, and improvement suggestions powered by advanced AI
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Upload Section */}
        <div className="space-y-6">
          <div
            className={`
              relative border-2 border-dashed rounded-xl p-8 text-center transition-colors
              ${dragActive 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-300 hover:border-gray-400'
              }
            `}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Upload Resume
            </h3>
            <p className="text-gray-600 mb-4">
              Drag and drop your resume file or click to browse
            </p>
            <button
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              onClick={handleChooseFile}
              type="button"
              disabled={isAnalyzing}
            >
              Choose File
            </button>
            <input
              type="file"
              accept=".pdf,.doc,.docx,.txt"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileChange}
              disabled={isAnalyzing}
            />
            {selectedFile && (
              <div className="mt-2 text-sm text-gray-700">
                Selected: {selectedFile.name}
              </div>
            )}
            <p className="text-xs text-gray-500 mt-2">
              Supports PDF, DOC, DOCX, TXT files up to 10MB
            </p>
          </div>

          <div className="text-center">
            <span className="text-gray-500">or</span>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Paste Resume Text
            </label>
            <textarea
              value={resumeText}
              onChange={(e) => {
                setResumeText(e.target.value);
                setSelectedFile(null);
              }}
              placeholder="Paste your resume content here..."
              className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              disabled={isAnalyzing}
            />
          </div>

          <button
            onClick={() => setResumeText(sampleResume)}
            className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2"
            type="button"
            disabled={isAnalyzing}
          >
            <FileText className="w-4 h-4" />
            <span>Use Sample Resume</span>
          </button>

          <button
            onClick={handleAnalyze}
            disabled={(!selectedFile && !resumeText.trim()) || isAnalyzing}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            type="button"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Analyzing Resume...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                <span>Analyze Resume</span>
              </>
            )}
          </button>
        </div>

        {/* Features Section */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-900">
            What You'll Get
          </h3>
          
          <div className="space-y-4">
            {[
              {
                icon: CheckCircle,
                title: 'Skills Analysis',
                description: 'AI extracts and categorizes your technical and soft skills'
              },
              {
                icon: CheckCircle,
                title: 'Job Matching',
                description: 'Find relevant opportunities with compatibility scores'
              },
              {
                icon: CheckCircle,
                title: 'ATS Optimization',
                description: 'Ensure your resume passes applicant tracking systems'
              },
              {
                icon: CheckCircle,
                title: 'Improvement Tips',
                description: 'Get actionable suggestions to enhance your resume'
              },
              {
                icon: CheckCircle,
                title: 'Career Coaching',
                description: 'AI-powered guidance for your career development'
              }
            ].map((feature, index) => (
              <div key={index} className="flex items-start space-x-3">
                <feature.icon className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-gray-900">{feature.title}</h4>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          {isAnalyzing && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
                <div>
                  <h4 className="font-medium text-blue-900">Processing Resume</h4>
                  <p className="text-sm text-blue-700">
                    AI is analyzing your resume for skills, experience, and optimization opportunities...
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeUpload;