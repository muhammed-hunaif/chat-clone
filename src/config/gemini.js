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

// Use the correct model ID (no "models/" prefix here)
const MODEL_NAME = "gemini-2.0-flash";

async function runChat(prompt) {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {
    temperature: 0.7,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
  };

  // Correct way to call
  const result = await model.generateContent({
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    generationConfig,
  });

  return result.response.text();
}

export default runChat;


