import { useLoadingStore } from '../store/loadingStore';

const PRESIGNED_URL_ENDPOINT = "https://us-central1-project-drishti-mvp-31f1b.cloudfunctions.net/getPresignedUrl";
const ANALYZE_RESUME_ENDPOINT = "https://us-central1-project-drishti-mvp-31f1b.cloudfunctions.net/analyzeResume";

export async function getPresignedUrl(filename: string, contentType: string) {
  const setLoading = useLoadingStore.getState().setLoading;
  setLoading(true);
  try {
    const res = await fetch(PRESIGNED_URL_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ filename, contentType }),
    });
    if (!res.ok) throw new Error("Failed to get presigned URL");
    return res.json(); // { url, filePath }
  } finally {
    setLoading(false);
  }
}

export async function uploadFileToGCS(url: string, file: File, contentType: string) {
  const setLoading = useLoadingStore.getState().setLoading;
  setLoading(true);
  try {
    const res = await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": contentType },
      body: file,
    });
    if (!res.ok) throw new Error("Failed to upload file to GCS");
  } finally {
    setLoading(false);
  }
}

export async function analyzeResumeGCS(filePath: string, contentType: string, userId?: string) {
  const setLoading = useLoadingStore.getState().setLoading;
  setLoading(true);
  try {
    const body: Record<string, unknown> = { filePath, contentType };
    if (userId) body.userId = userId;
    const res = await fetch(ANALYZE_RESUME_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error("Failed to analyze resume");
    return res.json(); // { analysis }
  } finally {
    setLoading(false);
  }
}

export async function analyzeResumeText(resumeText: string, userId?: string) {
  const setLoading = useLoadingStore.getState().setLoading;
  setLoading(true);
  try {
    const body: Record<string, unknown> = { type: 'text', resumeText, mode: 'build' };
    if (userId) body.userId = userId;
    const res = await fetch(ANALYZE_RESUME_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error("Failed to analyze resume text");
    return res.json(); // { formattedResume, suggestions, atsScore }
  } finally {
    setLoading(false);
  }
}

const CHAT_WITH_GEMINI_ENDPOINT = "https://us-central1-project-drishti-mvp-31f1b.cloudfunctions.net/chatWithGemini";

export async function chatWithGemini(message: string, userId: string) {
  // No global loading for chat bot
  const res = await fetch(CHAT_WITH_GEMINI_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, userId }),
  });
  if (!res.ok) throw new Error("Failed to get Gemini reply");
  return res.json(); // { reply }
}