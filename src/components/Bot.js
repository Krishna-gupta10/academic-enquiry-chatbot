import React, { useState, useEffect } from 'react';
import './Bot.css';

export default function App() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  useEffect(() => {
    setMessages([
      { text: "Hello, I am Bot", sender: 'bot' },
      { text: 'Feel free to ask me anything.', sender: 'bot' },
    ]);
  }, []);

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

      fetch("http://localhost:5000/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: inputMessage }),
      })
        .then((response) => response.json())
        .then((data) => {
          const botMessage = { text: data.response, sender: 'bot' };
          setMessages((prevMessages) => [...prevMessages, botMessage]);
        })
        .catch((error) => {
          console.error("Error:", error);
        
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
          iShowBot
        </button>
      </div>

      <div id="chatbot">
        <nav className="navbar bg-body-tertiary my-3">
          <div className="container-fluid">
            <a className="navbar-brand" href="/">
              *insert image / logo here*
              iAmBot
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

          <input type="text" id="message-input" placeholder="Type your message..." onKeyDown={handleKeyDown} value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} />
          <i className="bi bi-send"></i>
          <button style={{ backgroundColor: 'green', color: 'white' }} className="mx-3" id="send-button" onClick={handleChat}> Send <i className="bi bi-send"></i> </button>
        </div>

        <br />
        <button className="closeBOT" onClick={toggleBOT}>
          iCloseBot
        </button>
      </div>
    </>
  );
}
