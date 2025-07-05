import { GoogleGenerativeAI, GenerativeModel } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model: GenerativeModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function summarizeText(text: string): Promise<string> {
  try {
    const prompt = `
Summarize the following PDF content into clear, concise, and informative notes. Focus on capturing key ideas, important concepts, definitions, and any step-by-step processes if present. 

Structure the summary using:
- Bullet points for clarity
- Headings/subheadings if topics change
- Preserve important terminology
- Be concise but informative

Here is the content:  ${text} 
`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Gemini API Error:', error);
    throw error;
  }
}