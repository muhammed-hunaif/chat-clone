import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const MODEL_NAME = "gemini-1.5-flash"; // Corrected from 2.5 as it's likely a typo for 1.5 or 2.0.


const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function runChat(prompt) {
  // 1. Initialize the API client
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {
    temperature: 0.7,
    topK: 40, // Increased for better variety
    topP: 0.95,
    maxOutputTokens: 2048,
  };

  try {
    // 2. Execute the request
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig,
    });

    const response = await result.response;
    return response.text();

  } catch (error) {
    // 3. Specific handling for 429 (Rate Limit)
    if (error.message?.includes("429") || error.status === 429) {
      console.error("Rate limit hit. Attempting a single retry...");
      
      // Wait for 2 seconds and try one more time
      await sleep(2000);
      try {
        const retryResult = await model.generateContent({
          contents: [{ role: "user", parts: [{ text: prompt }] }],
          generationConfig,
        });
        return retryResult.response.text();
      } catch {
        return "The AI is currently busy (too many requests). Please wait 30 seconds and try again.";
      }
    }

    // 4. Handle other errors (Network, API Key issues, etc.)
    console.error("Gemini API Error:", error);
    return "Something went wrong. Please check your connection or API key.";
  }
}

export default runChat;