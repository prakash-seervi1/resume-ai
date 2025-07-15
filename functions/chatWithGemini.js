const { onRequest } = require('firebase-functions/v2/https');
const cors = require('./corsMiddleware');
const { VertexAI } = require('@google-cloud/vertexai');
const { PROJECT_ID, LOCATION } = require('./config');
const { db } = require('./firebaseAdmin');

const vertexAI = new VertexAI({ project: PROJECT_ID, location: LOCATION });
const geminiModel = vertexAI.getGenerativeModel({
  model: 'gemini-2.5-pro',
  generationConfig: { temperature: 0.4 },
});

module.exports = onRequest(
  {
    memory: '2GiB',
    timeoutSeconds: 120,
    region: 'us-central1',
  },
  (req, res) => {
    cors(req, res, async () => {
      if (req.method !== 'POST') {
        return res.status(405).send('Method Not Allowed');
      }
      const { userId, message } = req.body;
      if (!userId || !message) {
        return res.status(400).json({ error: 'userId and message are required' });
      }
      try {
        // Fetch latest analysis for this user
        const doc = await db.collection('userAnalyses').doc(userId).get();
        const analysis = doc.exists ? doc.data().analysis : null;
        let context = '';
        if (analysis) {
          context = `Here is the user's resume analysis: ${JSON.stringify(analysis)}\n`;
        }
        const prompt = `
${context}
You are an AI Career Coach. Respond conversationally and helpfully to the user's message below.

User: "${message}"
`;
        const result = await geminiModel.generateContent({
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.4 }
        });
        const reply = result.response?.candidates?.[0]?.content?.parts?.[0]?.text || '';
        res.json({ reply });
      } catch (error) {
        console.error('Gemini chat error:', error);
        res.status(500).json({ error: 'Failed to get Gemini response' });
      }
    });
  }
); 