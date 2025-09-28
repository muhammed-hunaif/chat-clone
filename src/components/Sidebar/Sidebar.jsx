import React, { useContext, useState } from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";

const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const { prevPrompts, setRecentPrompt, setResultData, setShowResult,newchat} = useContext(Context);

  return (
    <div className="Sidebar">
      <div className="top">
        <img
          onClick={() => setExtended((prev) => !prev)}
          className="icon-menu"
          src={assets.menu_icon}
          alt="menu"
        />

        <div onClick={()=>newchat()} className="new-chat" >
          <img src={assets.plus_icon} alt="new chat" className="icon" />
          {extended && <p>New chat</p>}
        </div>

        {extended && (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {prevPrompts.length === 0 && <p className="no-recent">No recent chats</p>}
            {prevPrompts.map((item, index) => (
              <div
                className="recent-entry"
                key={index}
                onClick={() => {
                  setRecentPrompt(item.prompt);
                  setResultData(item.answer); // only show previous answer
                  setShowResult(true);
                }}
              >
                <img src={assets.message_icon} alt="recent chat" className="icon" />
                <p>{item.prompt.length > 25 ? item.prompt.substring(0, 25) + "..." : item.prompt}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="help" className="icon" />
          {extended && <p>Help</p>}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="activity" className="icon" />
          {extended && <p>Activity</p>}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="settings" className="icon" />
          {extended && <p>Setting</p>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
