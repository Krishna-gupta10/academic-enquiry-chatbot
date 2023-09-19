import React, { useState, useEffect, useRef } from 'react';
import './Bot.css';
import messageSound from './message.mp3';

export default function App() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const audio = useRef(null);

  useEffect(() => {
    setMessages([
      { text: "Hello, I am VishwaGuru!", sender: 'bot' },
      { text: 'Feel free to ask me anything about Vishwakarma Institute of Technology.', sender: 'bot' },
    ]);
  }, []);

  window.onload = function() {
    console.log("Website has been loaded or reloaded.");
    setTimeout(() => {
      setShowPopup(true);
    }, 2000);
    
};


  const toggleBOT = () => {
    let blur = document.getElementById('blur');
    blur.classList.toggle('active');

    let chatbot = document.getElementById('chatbot');
    chatbot.classList.toggle('active');
  };

  const handleChat = () => {
    if (inputMessage.trim() !== '') {
      const userMessage = { text: inputMessage, sender: 'user' };
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setInputMessage('');

      setIsBotTyping(true);

      fetch("http://localhost:5000/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: inputMessage }),
      })
        .then((response) => response.json())
        .then((data) => {
          audio.current.play();
          const botMessage = { text: data.response, sender: 'bot' };
          setMessages((prevMessages) => [...prevMessages, botMessage]);
        })
        .catch((error) => {
          console.error("Error:", error);

        })
        .finally(() => {
          setIsBotTyping(false);
        });
    }
  };

  

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleChat();
    }
  };

  return (
    <>
      <div className="container" id="blur">
        <br />
        <button className="showBOT" onClick={toggleBOT}>
          VishwaGuru
        </button>
      </div>

      {showPopup && (
            <span className="popup-message">
              <div className="popup-text">Hello, please click me for assistance!</div>
            </span>
          )}

      <div id="chatbot">
        <nav className="navbar my-3" style={{ backgroundColor: '#2f86b9' }}>
          <div className="container-fluid">
            <a className="navbar-brand" style={{ color: '#fff' }} href="/">
              VishwaGuru
            </a>
          </div>
        </nav>

        <div className="chat-container">
          <div className="chat-messages" id="chat-messages">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`message ${message.sender === 'user' ? 'user-message' : 'other-message'}`}
              >
                {message.text}
              </div>
            ))}
          </div>

          {isBotTyping &&
            <div className="message bot-message">
              Typing...
            </div>
          }

          <input type="text" id="message-input" placeholder="Type your message..." onKeyDown={handleKeyDown} value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} />
          <button style={{ backgroundColor: 'green', color: 'white' }} className="my-2" id="send-button" onClick={handleChat}> Send  </button>

        </div>

        <br />
        <button className="closeBOT" onClick={toggleBOT} >
          ❌
        </button>
        
      </div>

      <audio ref={audio} src={messageSound} preload="auto" />
    </>
  );
}
