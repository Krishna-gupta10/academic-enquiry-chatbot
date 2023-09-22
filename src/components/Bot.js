import React, { useState, useEffect, useRef } from 'react';
import './Bot.css';
import messageSound from './message.mp3';
import logo from './chatbot.png';

export default function App() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [options, setOptions] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [userData, setUserData] = useState(false);
  const audio = useRef(null);
  const chatMessagesRef = useRef(null);

  useEffect(() => {
    setMessages([
      { text: "Hello, I am VishwaGuru!", sender: 'bot' },
      { text: 'Let us get started with your Name and Email! It helps me to remember you :)', sender: 'bot' },
    ]);

    setTimeout(() => {
      setUserData(true);
    }, 100);
  }, []);

  useEffect(() => {
    scrollChatToBottom();
  }, [messages]);

  const scrollChatToBottom = () => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  };

  let popupTimeout;
  window.onload = function () {
    console.log("Website has been loaded or reloaded.");
    popupTimeout = setTimeout(() => {
      setShowPopup(true);
    }, 500);

  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleUserDetails = () => {
    if (name.trim() === '' || email.trim() === '') {
      console.error("Name and email are required.");
      return;
    }

    fetch("http://localhost:5000/api/chatbot/userdetails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
      }),
    })
      .then((response) => {
        if (response.status === 201) {
          console.log("User details saved successfully");

          const botMessage = {
            text: `Thanks for the information, ${name}. Please feel free to ask me about VIIT.`,
            sender: 'bot',
          };
          setMessages((prevMessages) => [...prevMessages, botMessage]);
          setUserData(false);
        } else if (response.status === 400) {
          console.error("Failed to save user details. A user with this email already exists.");
        } else {
          console.error("Failed to save user details. Server responded with status:", response.status);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const toggleBOT = () => {
    clearTimeout(popupTimeout);
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

      fetch("http://localhost:5000/api/chatbot/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: inputMessage, selected_option: null }),
      })
        .then((response) => response.json())
        .then((data) => {
          audio.current.play();
          const botMessage = { text: `Dear ${name}, ${data.response}`, sender: 'bot' };
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
    const userMessage = { text: option, sender: 'user' };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    setIsBotTyping(true);

    fetch("http://localhost:5000/api/chatbot/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: option, selected_option: option }),
    })
      .then((response) => response.json())
      .then((data) => {
        audio.current.play();
        const botMessage = { text: `Dear ${name}, ${data.response}`, sender: 'bot' };
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

  const handleKeyDown1 = (event) => {
    if (event.key === 'Enter') {
      handleChat();
    }
  };

  const handleKeyDown2 = (event) => {
    if (event.key === 'Enter') {
      handleUserDetails();
    }
  };

  return (
    <>
      <div className="container" id="blur">
        <br />
        <img src = {logo} onClick={toggleBOT} className= "showBOT-logo" alt="Click Here"></img>
      </div>

      {showPopup && (
        <div className="alert alert-primary popup-message" role="alert">
          <div className="popup-text">
            Hey there! Maybe I can help you?
          </div>
        </div>
      )}

      <div id="chatbot">
        <nav className="navbar my-3" style={{ backgroundColor: '#2f86b9' }}>
          <div className="container-fluid">
            <a className="navbar-brand" style={{ color: '#fff' }} href="/">
              <i className="fa fa-android" aria-hidden="true"></i> VishwaGuru
            </a>
          </div>
        </nav>

        <div className="chat-container">
          <div className="chat-messages" id="chat-messages" ref={chatMessagesRef}>
            {messages.map((message, index) => (
              <div
                key={index}
                className={`message ${message.sender === 'user' ? 'user-message' : 'other-message'}`}
              >
                {message.text}
              </div>
            ))}

            {userData && (
              <div className="input-container">
                <input
                  className="input-details"
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={handleNameChange}
                />
                <input
                  className="input-details"
                  type="email"
                  placeholder="Your Email"
                  value={email}
                  onChange={handleEmailChange}
                  onKeyDown={handleKeyDown2}
                />
                <button className="btn-sm btn-primary" id="send-button" onClick={handleUserDetails}>
                  Submit
                </button>
              </div>
            )}

            {!isBotTyping && options.length > 0 && (
              <div>
                Suggestions: <br />
                {options.map((option, index) => (
                  <button
                    key={index}
                    className={`chat-options`}
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
        </div>

        {!userData && (

          <div className="my-1 message-input">
            <input type="text" id="message-input" placeholder="Type your message..." onKeyDown={handleKeyDown1} value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} />
            <button className="mx-2 send-button" id="send-button" onClick={handleChat}> <i className="fa fa-paper-plane-o" aria-hidden="true"></i>  </button>
          </div>

        )}

        <br />
        <button className="closeBOT" onClick={toggleBOT}>
          ❌
        </button>
      </div>

      <audio ref={audio} src={messageSound} preload="auto" />
    </>
  );
}