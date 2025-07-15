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

function App() {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <Header analysisResult={analysisResult} />
        
        <main className="min-h-screen">
          <Routes>
            <Route path="/" element={<LandingPage />} />
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

        <Footer />
      </div>
    </Router>
  );
}

export default App;