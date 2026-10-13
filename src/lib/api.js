import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_KEY)

export async function askAI(userMessage, chatHistory = []) {
const model = genAI.getGenerativeModel({ model: 'gemini-3.5-flash-lite' })

  const systemPrompt = `You are EduQuery AI, a helpful academic assistant for college students. 
You help with queries about timetables, exams, results, fees, courses, syllabus, campus facilities, and admissions. 
Keep answers clear, friendly, and concise.`

  try {
    const chat = model.startChat({
      history: [
        { role: 'user', parts: [{ text: systemPrompt }] },
        { role: 'model', parts: [{ text: 'I am EduQuery AI, ready to help!' }] },
      ],
      generationConfig: { maxOutputTokens: 500 }
    })

    const result = await chat.sendMessage(userMessage)
    return result.response.text()

  } catch (err) {
    console.error('AI Error:', err)
    throw err
  }
}