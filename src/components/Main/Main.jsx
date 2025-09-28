import React, { useContext } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'

const Main = () => {


  const { onSent, recentPrompt, showResult, loading, resultData, setInput, input } = useContext(Context)

  return (
    <div className='main'>
      <div className='nav'>
        <p>Gemini</p>
        <img src={assets.user_icon} alt=''></img>
      </div>
      <div className='main-container'>
        {!showResult
           ?<>
            <div className='greet'>
          <p><span>Hello,Hun.</span></p>
          <p>How can i help you today?</p>
        </div>
        <div className='cards'>
          <div className='card'>
            <p className='top'>Suggest beatiful places to see on an upcoming road trip</p>
            <img className='size' src={assets.compass_icon} alt=''></img>
          </div>
          <div className='card'>
            <p className='top'>Briefly summarize this concept: urban planning</p>
            <img className='size' src={assets.bulb_icon} alt=''></img>
          </div>
          <div className='card'>
            <p className='top'>Brainstorm team bonding activities for our work retreat</p>
            <img className='size' src={assets.message_icon} alt=''></img>
          </div>
          <div className='card'>
            <p className='top'>Improve the redability of the following code </p>
            <img className='size' src={assets.code_icon} alt=''></img>
          </div>
        </div>
           </>
         :<div className='result'>
            <div className='result-title'>
              <img src={assets.user_icon} alt=''></img>
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img  src={assets.gemini_icon} alt=''></img>
              {loading
              ?<div className='loader'>
                <hr />
                <hr />
                <hr />
              </div>
              : <p dangerouslySetInnerHTML={{__html:resultData}}></p>
              }
             
            </div>
          </div>
        }
       

        <div className='main-bottom'>
          <div className='search-box'>
            <input onChange={(e) => setInput(e.target.value)} value={input}
              type='text' placeholder='Enter your ques?'></input>
            <div >
              <img className='size' src={assets.gallery_icon} alt="" />
              <img className='size' src={assets.mic_icon} alt="" />
              {input?<img onClick={() => onSent()} className='size' src={assets.send_icon} alt="" />:null}
              

            </div>

          </div>
          <p className='bottom-info'>
            Gemini may dsiplay inacurate info, including about people,so double-check its reponses.
            Your privacy and Gemini Apps.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Main;