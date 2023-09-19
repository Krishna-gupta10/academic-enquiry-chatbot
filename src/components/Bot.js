import React, { useState, useEffect, useRef } from 'react';
import './Bot.css';
import messageSound from './message.mp3';
import vishwaguruImage from './botimg.jpg';

export default function App() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [options, setOptions] = useState([]);
  const audio = useRef(null);

  useEffect(() => {
    setMessages([
      { text: "Hello, I am VishwaGuru!", sender: 'bot' },
      { text: 'Feel free to ask me anything about Vishwakarma Institute of Technology.', sender: 'bot' },
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

      setIsBotTyping(true);

      fetch("http://localhost:5000/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: inputMessage, selected_option: null }),
      })
        .then((response) => response.json())
        .then((data) => {
          audio.current.play();
          const botMessage = { text: data.response, sender: 'bot' };
          setMessages((prevMessages) => [...prevMessages, botMessage]);

          if (data.options) {
            setOptions(data.options);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        })
        .finally(()=> {
          setIsBotTyping(false);
        });
    }
  };

  const handleOptionClick = (option) => {
    const botMessage = { text: option, sender: 'user' };
    setMessages((prevMessages) => [...prevMessages, botMessage]);

    setIsBotTyping(true);

    fetch("http://localhost:5000/chatbot", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: option, selected_option: option }),
    })
      .then((response) => response.json())
      .then((data) => {
        audio.current.play();
        const botMessage = { text: data.response, sender: 'bot' };
        setMessages((prevMessages) => [...prevMessages, botMessage]);

        if (data.options) {
          setOptions(data.options);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(()=> {
        setIsBotTyping(false);
      });
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
        <nav className="navbar my-3" style={{ backgroundColor: '#2f86b9' }}>
          <div className="container-fluid">
            <a className="navbar-brand" href="/">
              <span style={{ display: 'flex', alignItems: 'center' }}>
                <img
                  src={vishwaguruImage}
                  alt="VishwaGuru"
                  style={{ height: '40px', width: 'auto', marginRight: '10px' }}
                />
                VishwaGuru
              </span>
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

            {options.length > 0 && (
              <div className="option-container show slide-in">
                {options.map((option, index) => (
                  <button
                    key={index}
                    className="option-button show"
                    onClick={() => handleOptionClick(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>

          {isBotTyping && (
            <div className="message bot-message">Typing...</div>
          )}

          <input
            type="text"
            id="message-input"
            placeholder="Type your message..."
            onKeyDown={handleKeyDown}
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
          />
          <button style={{ backgroundColor: 'white', color: 'blue' }} className="mx-2" id="send-button" onClick={handleChat}> <i class="fa fa-send-o"></i>  
          </button>
        </div>

        <br />
        <button className="closeBOT" onClick={toggleBOT}>
        <button type="button" class="btn-close" aria-label="Close"></button>
        </button>
      </div>

      <audio ref={audio} src={messageSound} preload="auto" />
    </>
  );
}
