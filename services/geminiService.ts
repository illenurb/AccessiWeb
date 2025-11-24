import { GoogleGenAI } from "@google/genai";
import { GEMINI_SYSTEM_INSTRUCTION } from '../constants';

let client: GoogleGenAI | null = null;

const getClient = () => {
  if (!client) {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      console.error("API_KEY not found in environment variables");
      throw new Error("API Key missing");
    }
    client = new GoogleGenAI({ apiKey });
  }
  return client;
};

export const sendMessageToGemini = async (history: { role: string; parts: { text: string }[] }[], newMessage: string) => {
  try {
    const ai = getClient();
    const model = 'gemini-2.5-flash';

    // We use generateContent for a stateless approach or maintain history manually.
    // For a chat experience, we can construct the prompt with history.
    
    // Converting history format to what the model expects if using chat.
    // However, to keep it simple and robust, we will use a chat session.
    
    const chat = ai.chats.create({
      model: model,
      config: {
        systemInstruction: GEMINI_SYSTEM_INSTRUCTION,
      },
      history: history.map(h => ({
        role: h.role,
        parts: h.parts
      }))
    });

    const result = await chat.sendMessage({ message: newMessage });
    return result.text;
  } catch (error) {
    console.error("Error communicating with Gemini:", error);
    return "I'm having trouble connecting to the accessibility server right now. Please try again later.";
  }
};
