const { admin, db } = require('./firebaseAdmin');

async function setupUserAnalysisSample() {
  const userId = 'demo_user_001'; // Use a real userId or sessionId in production
  const sampleAnalysis = {
    resumeFilePath: 'uploads/demo_resume.pdf',
    analysis: {
      overallScore: 85,
      skills: [
        { name: 'React', level: 'Advanced', category: 'Technical' },
        { name: 'Node.js', level: 'Advanced', category: 'Technical' }
      ],
      experienceLevel: 'Senior',
      strengths: ['Strong technical skills', 'Leadership'],
      weaknesses: ['Needs more DevOps experience'],
      suggestions: [
        {
          category: 'Skills',
          priority: 'High',
          suggestion: 'Learn Docker and Kubernetes',
          impact: 'Will improve job match by 20%'
        }
      ],
      job_roles: [
        { title: 'Senior Full-Stack Engineer', reasoning: 'Strong in both frontend and backend.' }
      ],
      keywordDensity: { react: 5, nodejs: 3 },
      atsCompatibility: 90
    },
    timestamp: admin.firestore.FieldValue.serverTimestamp()
  };

  await db.collection('userAnalyses').doc(userId).set(sampleAnalysis);
  console.log('Sample user analysis document created!');
}

setupUserAnalysisSample()
  .then(() => process.exit(0))
  .catch(err => {
    console.error('Error setting up user analysis sample:', err);
    process.exit(1);
  }); 