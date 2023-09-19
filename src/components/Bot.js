import React, { useState, useEffect, useRef } from 'react';
import './Bot.css';
import messageSound from './message.mp3';


export default function App() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [options, setOptions] = useState([]);
  const audio = useRef(null);


  useEffect(() => {
    setMessages([
      { text: "Hello, I am VishwaGuru!", sender: 'bot' },
      { text: 'Feel free to ask me anything about Vishwakarma Institute of Technology.', sender: 'bot' },
    ]);
  }, []);

  window.onload = function () {
    console.log("Website has been loaded or reloaded.");
    setTimeout(() => {
      setShowPopup(true);
    }, 2000);

  };


  const toggleBOT = () => {
    setShowPopup(false);

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
        .finally(() => {
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
      .finally(() => {
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
        <button className="showBOT btn-lg" onClick={toggleBOT}>
          VishwaGuru
        </button>
      </div>

      {showPopup && (
        <div className="alert alert-primary alert-dismissible fade show popup-message" role="alert">
          <div className="popup-text">
            Hey there! Maybe I can help you?
          </div>
          <button type="button-sm" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
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



          {isBotTyping &&
            <div className="message bot-message">
              Typing...
            </div>
          }

          <input type="text" id="message-input" placeholder="Type your message..." onKeyDown={handleKeyDown} value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} />
          <button className="mx-2" style={{ backgroundColor: 'white', border: 'none' }} id="send-button" onClick={handleChat}> <i className="fa fa-paper-plane-o" aria-hidden="true"></i>  </button>

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
