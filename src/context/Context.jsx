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

  const delayPara = (index, nextWord) => {
    setTimeout(() => {
      setResultData((prev) => prev + nextWord);
    }, 75 * index);
  };

  const newchat = () =>{
    setLoading(false)
    setShowResult(false)
  } 


  const onSent = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);

    let response;
    let currentPrompt = prompt !== undefined ? prompt : input;

    if (prompt === undefined) setRecentPrompt(input);
    else setRecentPrompt(prompt);

    try {
      response = await runChat(currentPrompt);
    } catch (err) {
      setResultData("⚠️ Something went wrong. Maybe daily quota exceeded.");
      setLoading(false);
      return;
    }

   
    if (prompt === undefined) {
      setPreviousPrompts((prev) => [
        ...prev,
        { prompt: input, answer: response },
      ]);
    }

    
    let responseArray = response.split("**");
    let newResponse = " ";
    for (let i = 0; i < responseArray.length; i++) {
      if (i === 0 || i % 2 !== 1) newResponse += responseArray[i];
      else newResponse += "<b>" + responseArray[i] + "</b>";
    }
    let newResponse2 = newResponse.split("*").join("</br>");
    let newResponseArray = newResponse2.split(" ");
    for (let i = 0; i < newResponseArray.length; i++) {
      const nextWord = newResponseArray[i];
      delayPara(i, nextWord + " ");
    }

    setLoading(false);
    setInput(""); 
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
