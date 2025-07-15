const { onRequest } = require('firebase-functions/v2/https');
const cors = require('./corsMiddleware');
const { Storage } = require('@google-cloud/storage');
const path = require('path');
const os = require('os');
const fs = require('fs');
const { VertexAI } = require('@google-cloud/vertexai');
const pdfParse = require('pdf-parse');
const { BUCKET_NAME, PROJECT_ID, LOCATION } = require('./config');
const { db } = require('./firebaseAdmin');

const storage = new Storage();

const vertexAI = new VertexAI({
  project: PROJECT_ID,
  location: LOCATION,
});

const geminiModel = vertexAI.getGenerativeModel({
  model: 'gemini-2.5-pro',
  generationConfig: { temperature: 0.4 },
});

// PDF/text extraction implementation
async function extractTextFromFile(localFilePath, contentType) {
  if (contentType === 'application/pdf' || localFilePath.endsWith('.pdf')) {
    const dataBuffer = fs.readFileSync(localFilePath);
    const data = await pdfParse(dataBuffer);
    return data.text;
  } else {
    // Assume plain text
    return fs.readFileSync(localFilePath, 'utf8');
  }
}

// Actual Gemini/Vertex AI integration
async function analyzeWithGemini(resumeText) {
  const prompt = `
You are an expert career consultant. Analyze the following resume text and return a JSON object with these exact keys:

{
  "overallScore": number (0-100, ATS score based on resume quality),
  "skills": [ { "name": string, "level": "Beginner|Intermediate|Advanced|Expert", "category": "Technical|Soft|Language|Certification" } ],
  "experienceLevel": "Entry|Mid|Senior|Executive",
  "strengths": [string],
  "weaknesses": [string],
  "suggestions": [
    {
      "category": string,
      "priority": "High|Medium|Low",
      "suggestion": string,
      "impact": string
    }
  ],
  "job_roles": [
    {
      "title": string,
      "reasoning": string
    }
  ],
  "keywordDensity": { [keyword: string]: number },
  "atsCompatibility": number (0-100)
}

If you do not have data for a field, return a reasonable default (empty array, 0, or empty string).
Return ONLY the JSON object, no markdown or explanation.

Resume:
"""
${resumeText}
"""
`;
  const result = await geminiModel.generateContent({
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
    generationConfig: { temperature: 0.4 }
  });
  let text = result.response?.candidates?.[0]?.content?.parts?.[0]?.text || '';
  let jsonMatch = text.match(/```json\s*([\s\S]*?)```/i) || text.match(/({[\s\S]*})/);
  let analysis;
  try {
    if (jsonMatch) {
      analysis = JSON.parse(jsonMatch[1]);
    } else {
      analysis = JSON.parse(text);
    }
  } catch (e) {
    analysis = {};
  }
  // Always provide all fields
  const defaultAnalysis = {
    overallScore: 0,
    skills: [],
    experienceLevel: '',
    strengths: [],
    weaknesses: [],
    suggestions: [],
    job_roles: [],
    keywordDensity: {},
    atsCompatibility: 0
  };
  analysis = { ...defaultAnalysis, ...analysis };
  // Defensive: ensure arrays/objects
  if (!Array.isArray(analysis.suggestions)) analysis.suggestions = [];
  if (!Array.isArray(analysis.job_roles)) analysis.job_roles = [];
  if (!Array.isArray(analysis.skills)) analysis.skills = [];
  if (!Array.isArray(analysis.strengths)) analysis.strengths = [];
  if (!Array.isArray(analysis.weaknesses)) analysis.weaknesses = [];
  if (!analysis.keywordDensity || typeof analysis.keywordDensity !== 'object') analysis.keywordDensity = {};
  return analysis;
}

async function buildResumeWithGemini(resumeText) {
  const prompt = `
You are an expert resume writer and career coach. Using the following user-provided details, generate a complete, ATS-optimized resume in professional format.

Return a JSON object with these keys:
{
  "name": string,
  "title": string,
  "contact": string,
  "summary": string,
  "skills": [
    { "name": string, "category": string }
  ],
  "experience": [
    { "title": string, "company": string, "location": string, "date": string, "details": [string] }
  ],
  "education": [
    { "degree": string, "school": string, "date": string }
  ],
  "projects": [
    { "name": string, "description": string }
  ],
  "certifications": [string],
  "suggestions": [string],
  "atsScore": number (0-100, estimate of ATS compatibility)
}

For the "skills" field, return an array of objects with:
  { "name": string, "category": string }
If the user is a Software Engineer, use categories like "Frontend", "Backend", "Cloud/DevOps", "Tools", "Testing", etc. If another profession, use categories relevant to that field.

- Fill in any missing sections with reasonable, generic content and highlight them for the user to edit (e.g., [ADD YOUR EXPERIENCE HERE]).
- Suggest improvements for any weak or missing areas, especially those that would improve ATS score.

User Details:
"""
${resumeText}
"""
Return ONLY the JSON object, no markdown or explanation.
`;
  const result = await geminiModel.generateContent({
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
    generationConfig: { temperature: 0.4 }
  });
  let text = result.response?.candidates?.[0]?.content?.parts?.[0]?.text || '';
  let jsonMatch = text.match(/```json\s*([\s\S]*?)```/i) || text.match(/({[\s\S]*})/);
  let output;
  try {
    if (jsonMatch) {
      output = JSON.parse(jsonMatch[1]);
    } else {
      output = JSON.parse(text);
    }
  } catch (e) {
    output = {};
  }
  // Defensive defaults
  const defaultOutput = {
    name: '',
    title: '',
    contact: '',
    summary: '',
    skills: [],
    experience: [],
    education: [],
    projects: [],
    certifications: [],
    suggestions: [],
    atsScore: 0
  };
  output = { ...defaultOutput, ...output };
  if (!Array.isArray(output.suggestions)) output.suggestions = [];
  if (!Array.isArray(output.skills)) output.skills = [];
  if (!Array.isArray(output.experience)) output.experience = [];
  if (!Array.isArray(output.education)) output.education = [];
  if (!Array.isArray(output.projects)) output.projects = [];
  if (!Array.isArray(output.certifications)) output.certifications = [];
  if (typeof output.atsScore !== 'number') output.atsScore = 0;
  if (typeof output.name !== 'string') output.name = '';
  if (typeof output.title !== 'string') output.title = '';
  if (typeof output.contact !== 'string') output.contact = '';
  if (typeof output.summary !== 'string') output.summary = '';
  // Defensive: ensure skills are array of objects with name and category
  output.skills = (output.skills || []).filter(s => s && typeof s === 'object' && typeof s.name === 'string' && typeof s.category === 'string');
  return output;
}

module.exports = onRequest(
  {
    memory: '2GiB',
    timeoutSeconds: 300,
    region: 'us-central1',
  },
  (req, res) => {
    cors(req, res, async () => {
      if (req.method !== 'POST') {
        return res.status(405).send('Method Not Allowed');
      }
      const { filePath, contentType, userId, type, resumeText, mode } = req.body;
      if (!userId) {
        return res.status(400).json({ error: 'userId is required' });
      }
      try {
        let extractedText = '';
        let filePathToStore = filePath || null;
        if (type === 'text') {
          if (!resumeText || !resumeText.trim()) {
            return res.status(400).json({ error: 'resumeText is required for text type' });
          }
          extractedText = resumeText;
        } else {
          if (!filePath) {
            return res.status(400).json({ error: 'filePath is required' });
          }
          // Download file from GCS
          const bucket = storage.bucket(BUCKET_NAME);
          const file = bucket.file(filePath);
          const tempFilePath = path.join(os.tmpdir(), path.basename(filePath));
          await file.download({ destination: tempFilePath });

          // Extract text
          extractedText = await extractTextFromFile(tempFilePath, contentType);

          // Clean up temp file
          fs.unlinkSync(tempFilePath);
        }

        // Use different prompt for build mode
        if (mode === 'build') {
          const buildResult = await buildResumeWithGemini(extractedText);
          return res.json(buildResult);
        }

        // Analyze with Gemini (default)
        const analysis = await analyzeWithGemini(extractedText);

        // Store/update analysis in Firestore
        await db.collection('userAnalyses').doc(userId).set({
          resumeFilePath: filePathToStore,
          analysis,
          timestamp: new Date()
        });

        return res.json({ analysis });
      } catch (error) {
        console.error('Error analyzing resume:', error);
        return res.status(500).json({ error: 'Failed to analyze resume' });
      }
    });
  }
); 