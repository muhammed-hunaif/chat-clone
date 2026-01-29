// import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

// const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
// const MODEL_NAME = "models/gemini-1.5-flash"; // this one is safe


// console.log("API KEY:", API_KEY);
// if (!API_KEY) console.error("❌ API key is missing. Check your .env file!");

// const genAI = new GoogleGenerativeAI(API_KEY);

// export async function runChat(prompt) {
//   try {
//     const model = genAI.getGenerativeModel({ model: MODEL_NAME });

//     const generationConfig = { temperature: 0.9, topK: 1, topP: 1, maxOutputTokens: 2048 };
//     const safetySettings = [
//       { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
//       { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
//       { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
//       { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
//     ];

//     const chat = model.startChat({ generationConfig, safetySettings, history: [] });

//     const result = await chat.sendMessage(prompt);
//     const response = result.response;

//     console.log("Gemini response:", response.text());
//     return response.text();
//   } catch (err) {
//     console.error("runChat error:", err);
//     return "⚠️ Something went wrong or daily quota exceeded.";
//   }
// }

// export default runChat;


import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const MODEL_NAME = "gemini-2.5-flash";


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
      } catch (retryError) {
        return "The AI is currently busy (too many requests). Please wait 30 seconds and try again.";
      }
    }

    // 4. Handle other errors (Network, API Key issues, etc.)
    console.error("Gemini API Error:", error);
    return "Something went wrong. Please check your connection or API key.";
  }
}

export default runChat;