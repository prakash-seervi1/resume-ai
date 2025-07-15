const functions = require('firebase-functions');
const cors = require('./corsMiddleware');
const { Storage } = require('@google-cloud/storage');
const crypto = require('crypto');
const { BUCKET_NAME } = require('./config');

const storage = new Storage();

module.exports = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== 'POST') {
      return res.status(405).send('Method Not Allowed');
    }
    const { filename, contentType } = req.body;
    if (!filename || !contentType) {
      return res.status(400).json({ error: 'filename and contentType are required' });
    }
    try {
      const uniqueId = crypto.randomBytes(8).toString('hex');
      const filePath = `uploads/${uniqueId}_${filename}`;
      const bucket = storage.bucket(BUCKET_NAME);
      const file = bucket.file(filePath);
      const [url] = await file.getSignedUrl({
        version: 'v4',
        action: 'write',
        expires: Date.now() + 10 * 60 * 1000,
        contentType,
      });
      return res.json({ url, filePath });
    } catch (error) {
      console.error('Error generating presigned URL:', error);
      return res.status(500).json({ error: 'Failed to generate presigned URL' });
    }
  });
}); 