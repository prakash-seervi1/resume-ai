import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import FloatingChatBot from './components/FloatingChatBot';
import LandingPage from './pages/LandingPage';
import ResumeUploadPage from './pages/ResumeUploadPage';
import AnalysisPage from './pages/AnalysisPage';
import JobMatchesPage from './pages/JobMatchesPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PrivacyPage from './pages/PrivacyPage';
import ResumeBuilderPage from './pages/ResumeBuilderPage';
import { AnalysisResult } from './types';
import { useLoadingStore } from './store/loadingStore';

function App() {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const loading = useLoadingStore((state) => state.loading);

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {loading && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur-sm">
            <div className="flex flex-col items-center">
              <svg className="animate-spin h-10 w-10 text-blue-600 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              <span className="text-blue-700 font-semibold text-lg">Loading...</span>
            </div>
          </div>
        )}
        <Header analysisResult={analysisResult} />
        
        <main className="min-h-screen">
          <Routes>
            {/* <Route path="/" element={<LandingPage />} /> */}
            <Route 
              path="/" 
              element={
                <ResumeUploadPage 
                  onAnalysisComplete={setAnalysisResult}
                />
              } 
            />
            <Route 
              path="/upload" 
              element={
                <ResumeUploadPage 
                  onAnalysisComplete={setAnalysisResult}
                />
              } 
            />
            <Route 
              path="/analysis" 
              element={
                analysisResult ? (
                  <AnalysisPage result={analysisResult} />
                ) : (
                  <Navigate to="/upload" replace />
                )
              } 
            />
            <Route 
              path="/jobs" 
              element={
                analysisResult ? (
                  <JobMatchesPage matches={analysisResult.jobMatches} />
                ) : (
                  <Navigate to="/upload" replace />
                )
              } 
            />
            <Route path="/resume-builder" element={<ResumeBuilderPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
          </Routes>
        </main>

        {/* Floating AI Career Coach */}
        <FloatingChatBot analysisResult={analysisResult} />

        {/* <Footer /> */}
      </div>
    </Router>
  );
}

export default App;