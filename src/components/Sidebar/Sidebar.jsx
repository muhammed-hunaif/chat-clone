import React, { useContext, useState } from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";

const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const { onSent, prevPrompts, setRecentPrompt, newchat, menuOpen, setMenuOpen } = useContext(Context);

  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    await onSent(prompt);
    setMenuOpen(false); // Close menu on mobile after selection
  };

  return (
    <>
      {menuOpen && <div className="sidebar-backdrop" onClick={() => setMenuOpen(false)}></div>}
      <div className={`Sidebar ${extended ? 'extended' : ''} ${menuOpen ? 'mobile-open' : ''}`}>
        <div className="top">
          <img
            onClick={() => setExtended((prev) => !prev)}
            className="icon-menu desktop-menu"
            src={assets.menu_icon}
            alt="menu"
          />
          <img
            onClick={() => setMenuOpen(false)}
            className="icon-menu mobile-close"
            src={assets.menu_icon}
            alt="close"
          />

          <div 
            onClick={() => {
              newchat();
              setMenuOpen(false);
            }} 
            className="new-chat"
          >
            <img src={assets.plus_icon} alt="new chat" className="icon" />
            {(extended || menuOpen) ? <p>New chat</p> : null}
          </div>

          {(extended || menuOpen) && (
            <div className="recent">
              <p className="recent-title">Recent</p>
              {prevPrompts.length === 0 && <p className="no-recent">No recent chats</p>}
              <div className="recent-list">
                {prevPrompts.map((item, index) => (
                  <div
                    className="recent-entry"
                    key={index}
                    onClick={() => loadPrompt(item)}
                  >
                    <img src={assets.message_icon} alt="recent chat" className="icon" />
                    <p>{item.length > 20 ? item.substring(0, 20) + "..." : item}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="bottom">
          <div className="bottom-item recent-entry">
            <img src={assets.question_icon} alt="help" className="icon" />
            {(extended || menuOpen) ? <p>Help</p> : null}
          </div>
          <div className="bottom-item recent-entry">
            <img src={assets.history_icon} alt="activity" className="icon" />
            {(extended || menuOpen) ? <p>Activity</p> : null}
          </div>
          <div className="bottom-item recent-entry">
            <img src={assets.setting_icon} alt="settings" className="icon" />
            {(extended || menuOpen) ? <p>Setting</p> : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
