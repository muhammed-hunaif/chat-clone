import React, { useContext } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'

const Main = () => {
  const { onSent, recentPrompt, showResult, loading, resultData, setInput, input } = useContext(Context);

  // Helper to handle "Enter" key press
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && input && !loading) {
      onSent();
    }
  };

  return (
    <div className='main'>
      <div className='nav'>
        <p>Gemini</p>
        <img src={assets.user_icon} alt='' />
      </div>
      <div className='main-container'>
        {!showResult ? (
          <>
            <div className='greet'>
              <p><span>Hello, Hun.</span></p>
              <p>How can I help you today?</p>
            </div>
            <div className='cards'>
              <div className='card' onClick={() => setInput("Suggest beautiful places to see on an upcoming road trip")}>
                <p className='top'>Suggest beautiful places to see on an upcoming road trip</p>
                <img className='size' src={assets.compass_icon} alt='' />
              </div>
              <div className='card' onClick={() => setInput("Briefly summarize this concept: urban planning")}>
                <p className='top'>Briefly summarize this concept: urban planning</p>
                <img className='size' src={assets.bulb_icon} alt='' />
              </div>
              <div className='card' onClick={() => setInput("Brainstorm team bonding activities for our work retreat")}>
                <p className='top'>Brainstorm team bonding activities for our work retreat</p>
                <img className='size' src={assets.message_icon} alt='' />
              </div>
              <div className='card' onClick={() => setInput("Improve the readability of the following code")}>
                <p className='top'>Improve the readability of the following code </p>
                <img className='size' src={assets.code_icon} alt='' />
              </div>
            </div>
          </>
        ) : (
          <div className='result'>
            <div className='result-title'>
              <img src={assets.user_icon} alt='' />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt='' />
              {loading ? (
                <div className='loader'>
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}
            </div>
          </div>
        )}

        <div className='main-bottom'>
          <div className='search-box'>
            <input 
              onChange={(e) => setInput(e.target.value)} 
              onKeyDown={handleKeyDown}
              value={input}
              type='text' 
              placeholder='Enter your ques?' 
              disabled={loading} // Disable input while loading
            />
            <div>
              <img className='size' src={assets.gallery_icon} alt="" />
              <img className='size' src={assets.mic_icon} alt="" />
              {/* Only show send icon if there is input AND it is not loading */}
              {input && !loading ? (
                <img onClick={() => onSent()} className='size' src={assets.send_icon} alt="" />
              ) : null}
            </div>
          </div>
          <p className='bottom-info'>
            Gemini may display inaccurate info, including about people, so double-check its responses.
            Your privacy and Gemini Apps.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Main;