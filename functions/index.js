// GCP project, region, and bucket are configured in each function file as per project requirements.
const functions = require('firebase-functions');
const { Storage } = require('@google-cloud/storage');
const crypto = require('crypto');

const getPresignedUrl = require('./getPresignedUrl');
const analyzeResume = require('./analyzeResume');
const chatWithGemini = require('./chatWithGemini');

// Initialize Firebase

// Initialize Google Cloud Storage
const storage = new Storage();
const BUCKET_NAME = 'proejct-resume-ai';

/**
 * HTTP function to generate a presigned URL for uploading a file to GCS.
 * Expects a JSON body: { filename: string, contentType: string }
 * Returns: { url: string, filePath: string }
 */
exports.getPresignedUrl = getPresignedUrl;
exports.analyzeResume = analyzeResume; 
exports.chatWithGemini = chatWithGemini;