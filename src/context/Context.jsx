import { createContext, useState } from "react";
import runChat from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPreviousPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  // Typing effect function
  const delayPara = (index, nextWord) => {
    setTimeout(() => {
      setResultData((prev) => prev + nextWord);
    }, 75 * index);
  };

  const newchat = () => {
    setLoading(false);
    setShowResult(false);
  };

  const onSent = async (prompt) => {
    setResultData(""); // Clear old result
    setLoading(true);
    setShowResult(true);

    let response;
    // Logic to decide which prompt to use
    let currentPrompt = prompt !== undefined ? prompt : input;

    if (prompt !== undefined) {
      setRecentPrompt(prompt);
    } else {
      setRecentPrompt(input);
      setPreviousPrompts((prev) => [...prev, input]); // Storing only the prompt
    }

    try {
      response = await runChat(currentPrompt);
      
      // Response Formatting (** for Bold, * for New Line)
      let responseArray = response.split("**");
      let newResponse = ""; 
      for (let i = 0; i < responseArray.length; i++) {
        if (i === 0 || i % 2 !== 1) {
          newResponse += responseArray[i];
        } else {
          newResponse += "<b>" + responseArray[i] + "</b>";
        }
      }

      // Replace single * with line break
      let newResponse2 = newResponse.split("*").join("<br>");
      
      // Start typing animation
      let newResponseArray = newResponse2.split(" ");
      for (let i = 0; i < newResponseArray.length; i++) {
        const nextWord = newResponseArray[i];
        delayPara(i, nextWord + " ");
      }

    } catch (err) {
      setResultData("⚠️ Error: Could not fetch response. Try again.");
      console.error(err);
    } finally {
      setLoading(false);
      setInput("");
    }
  };

  const contextValue = {
    prevPrompts,
    setPreviousPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    setShowResult,
    loading,
    resultData,
    setResultData,
    input,
    setInput,
    newchat
  };

  return <Context.Provider value={contextValue}>{props.children}</Context.Provider>;
};

export default ContextProvider;