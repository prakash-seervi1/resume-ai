import React from 'react';
import ResumeUpload from '../components/ResumeUpload';
import { AnalysisResult } from '../types';
import { useNavigate } from 'react-router-dom';

interface ResumeUploadPageProps {
  onAnalysisComplete: (result: AnalysisResult) => void;
}

const ResumeUploadPage: React.FC<ResumeUploadPageProps> = ({ onAnalysisComplete }) => {
  const navigate = useNavigate();

  const handleAnalysisComplete = (result: AnalysisResult) => {
    onAnalysisComplete(result);
    navigate('/analysis');
  };

  return (
    <div className="py-8">
      <ResumeUpload 
        onAnalysisComplete={handleAnalysisComplete}
        isAnalyzing={false}
        setIsAnalyzing={() => {}}
      />
    </div>
  );
};

export default ResumeUploadPage;