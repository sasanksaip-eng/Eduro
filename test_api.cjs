require('dotenv').config();

const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.REACT_APP_GEMINI_KEY}`;

const systemPrompt = `You are EduQuery AI, a helpful academic assistant for college students. 
You help with queries about: timetables, exams, results, fees, courses, syllabus, campus facilities, and admissions.
Keep answers clear, friendly, and concise.`;

const contents = [
  { role: "user", parts: [{ text: systemPrompt }] },
  { role: "model", parts: [{ text: "I'm EduQuery AI, ready to help!" }] },
  { role: "user", parts: [{ text: "hello" }] }
];

async function askAI() {
  console.log("Key loaded:", process.env.REACT_APP_GEMINI_KEY ? "YES ✅" : "NO ❌");
  console.log("URL:", GEMINI_URL);
  try {
    const response = await fetch(GEMINI_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents })
    });
    const data = await response.json();
    console.log("Response:", JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("Error:", err);
  }
}
askAI();
