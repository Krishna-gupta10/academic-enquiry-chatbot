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
  const [showExitModal, setShowExitModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const [menuOptions, setMenuOptions] = useState([]);
  const [menu1Options, setMenu1Options] = useState([]);
  const [menu2Options, setMenu2Options] = useState([]);

  const [currentMenu, setCurrentMenu] = useState('main');
  const [showFeedback, setShowFeedback] = useState(false);
  const [originalUserMessage, setOriginalUserMessage] = useState('');
  const audio = useRef(null);
  const chatMessagesRef = useRef(null);

  useEffect(() => {
    setMessages([
      { text: "Hello, I am VishwaGuru!", sender: 'bot' },
      { text: 'Let us get started with your Name and Email! It helps me to remember you :)', sender: 'bot' },
    ]);

    setTimeout(() => {
      setUserData(true);
    }, 100)
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
    popupTimeout = setTimeout(() => {
      setShowPopup(true);
    }, 500);

  };

  const startSpeechRecognition = () => {
    if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }

    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

    recognition.onstart = () => {
      console.log('Speech recognition started');
    };

    recognition.onend = () => {
      console.log('Speech recognition ended');
    };

    recognition.onresult = (event) => {
      const speechResult = event.results[0][0].transcript;
      setInputMessage(speechResult);
      handleChat();
    };

    recognition.start();
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // Handle Menu
  const handleMenuOptionClick = (option) => {
    if (option === 'Courses Offered') {
      const userMessage = { text: 'Courses Offered', sender: 'user' };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      const botMessage = {
        text: 'We Offer the following courses: ', sender: 'bot'
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setCurrentMenu('one');
      setMenu1Options(['B.Tech', 'M.Tech', 'PHD', 'Go Back']);

    } else if (option === 'Placements') {
      const userMessage = { text: 'Placements', sender: 'user' };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      const botMessage = {
        text: 'How Can we Help you regarding Placements \nWe can Provide you with the overall:', sender: 'bot'
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setCurrentMenu('one');
      setMenu1Options(['Summary of placements', 'Differents Recruiters', 'Go Back']);

    } else if (option === 'Academics') {
      const userMessage = { text: 'Academics', sender: 'user' };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      const botMessage = {
        text: 'Informations That Might Be usefull to you regarding Academics:', sender: 'bot'
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setCurrentMenu('one');
      setMenu1Options(['Academic Calendar', 'Academic Structure', 'Syllabus', 'Academic Council', 'Go Back']);

    } else if (option === 'Facilities') {
      const userMessage = { text: 'Facilities', sender: 'user' };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      const botMessage = {
        text: 'Different Facilities Provided @VIIT Are:', sender: 'bot'
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setCurrentMenu('one');
      setMenu1Options(['Accomodation', 'Lab\'s', 'Different Research & development Opportunities', 'Go Back']);
    }
  };

  const handleFirstMenuOptionClick = (option) => {
    if (option === 'B.Tech') {
      const userMessage = { text: 'B.Tech', sender: 'user' };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      const botMessage = ({ text: 'Courses Offered in B.tech Are:', sender: "bot" });
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setCurrentMenu('two');
      setMenu2Options(['Civil', 'Computer Engineer', 'Electronics & Telecomunication Engineering', 'Information Technology', 'Mechanical Engineering', 'AI & DS', 'Go Back', 'Main Menu']);

    } else if (option === 'M.Tech') {
      const userMessage = { text: 'M.Tech', sender: 'user' };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      const botMessage = ({ text: 'We Offer a Variety of programs For M.tech Enthusiast:', sender: "bot" });
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setCurrentMenu('two');
      setMenu2Options(['Civil', 'Computer Engineering', 'Electronics & Telecomunication Engineering', 'Mechanical Engineering', 'Go Back', 'Main Menu']);

    } else if (option === 'PHD') {
      const userMessage = { text: 'PHD', sender: 'user' };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      const botMessage = ({ text: 'Read more at "mujhenahipata.com"', sender: "bot" });
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setCurrentMenu('two');
      setMenu2Options(['Mechanical Engineering', 'Civil', 'Computer Engineering', 'Electronics & Telecomunication Engineering', 'Go Back', 'Main Menu']);
    }

    else if (option === 'Summary of placements') {
      const userMessage = { text: 'Summary of placements', sender: 'user' };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      const botMessage = ({ text: 'Click here for the information you\'ve been looking for', sender: "bot", link: 'https://www.viit.ac.in/placement-i2ic/placement-summary' });
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setCurrentMenu('two');
      setMenu2Options(['Go Back', 'Main Menu']);

    } else if (option === 'Differents Recruiters') {
      const userMessage = { text: 'Differents Recruiters', sender: 'user' };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      const botMessage = ({ text: 'We\'ve a variety of recruiter\'s like:\nAccenture\tLoreal\tNVIDIA\tTech Mahindra\nHere\'s a list of all:', sender: "bot", link: 'https://www.viit.ac.in/placement-i2ic/our-recruiters-i2ic' });
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setCurrentMenu('two');
      setMenu2Options(['Go Back', 'Main Menu']);

    } else if (option === 'Academic Calendar') {
      const userMessage = { text: 'Academic Calendar', sender: 'user' };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      const botMessage = ({ text: 'Click Here For the Academic calender:', sender: "bot", link: 'https://www.viit.ac.in/images/Academics/Institute_Calendar_Sem-I_AY_2023-24.pdf' });
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setMenu2Options(['Go Back', 'Main Menu']);

    } else if (option === 'Academic Structure') {
      const userMessage = { text: 'Academic Structure', sender: 'user' };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      const botMessage = ({ text: 'Click Here For the Academic Structure', sender: "bot", link: 'https://www.viit.ac.in/images/Academics/structure/Academic-structures_AY_2023-24.pdf' });
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setCurrentMenu('two');
      setMenu2Options(['Go Back', 'Main Menu']);
    }
    else if (option === 'Syllabus') {
      const userMessage = { text: 'Syllabus', sender: 'user' };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      const botMessage = ({ text: 'Select the Branch for the Particular Syllabus', sender: "bot", link: 'https://www.viit.ac.in/images/Academics/structure/Academic-structures_AY_2023-24.pdf' });
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setCurrentMenu('two');
      setMenu2Options(['Civil', 'Computer Engineering', 'Electronics & Telecomunication Engineering', 'Information Technology', 'Mechanical Engineering', 'AI & DS', 'Go Back', 'Main Menu']);
    }
    else if (option === 'Academic Council') {
      const userMessage = { text: 'Academic Council', sender: 'user' };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      const botMessage = ({ text: 'Click here', sender: "bot", link: 'https://www.viit.ac.in/academicjuly2020/academic-board-council' });
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setCurrentMenu('two');
      setMenu2Options(['Go Back', 'Main Menu']);
    }
    else if (option === 'Accomodation') {
      const userMessage = { text: 'Accomodation', sender: 'user' };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      const botMessage = ({ text: 'Click here', sender: "bot", link: 'https://www.viit.ac.in/images/Admissions/Hostel-Fees/VIIT-Hostel-Fee-Structure-2023-24.pdf' });
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setCurrentMenu('two');
      setMenu2Options(['Go Back', 'Main Menu']);
    }
    else if (option === 'Different Research & development Opportunities') {
      const userMessage = { text: 'Different Research & development Opportunities', sender: 'user' };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      const botMessage = ({ text: 'Click here', sender: "bot", link: 'https://www.viit.ac.in/research-and-development-cerd/r-d-scheme' });
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setCurrentMenu('two');
      setMenu2Options(['Go Back', 'Main Menu']);
    }
    else if (option === 'Go Back') {
      const userMessage = { text: 'Go Back', sender: 'user' };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      setCurrentMenu('main');
    }
  };

  const handleSecondMenuOptionClick = (option) => {
    if (option === 'Civil') {
      const userMessage = { text: 'Civil', sender: 'user' };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      const botMessage = ({ text: 'Courses Offered in B.tech Are:', sender: "bot" });
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setCurrentMenu('two');
      setMenu2Options(['Civil', 'Computer Engineer', 'Electronics & Telecomunication Engineering', 'Information Technology', 'Mechanical Engineering', 'AI & DS']);

    } else if (option === 'Computer Engineering') {
      const userMessage = { text: 'M.Tech', sender: 'user' };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      const botMessage = ({ text: 'We Offer a Variety of programs For M.tech Enthusiast:', sender: "bot" });
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setCurrentMenu('two');
      setMenu2Options(['Civil', 'Computer Engineering', 'Electronics & Telecomunication Engineering', 'Mechanical Engineering']);

    } else if (option === 'PHD') {
      const userMessage = { text: 'PHD', sender: 'user' };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      const botMessage = ({ text: 'Read more at "mujhenahipata.com"', sender: "bot" });
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setCurrentMenu('two');
      setMenu2Options(['Mechanical Engineering', 'Civil', 'Computer Engineering', 'Electronics & Telecomunication Engineering']);
    }
    else if (option === 'Go Back') {
      const userMessage = { text: 'Go Back', sender: 'user' };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      setCurrentMenu('one');
    }
    else if (option === 'Main Menu') {
      const userMessage = { text: 'Go Back', sender: 'user' };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      setCurrentMenu('main');
    }
  };



  // INPUT USER NAME AND EMAIL
  const handleUserDetails = (e) => {
    e.preventDefault();

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

          setShowMenu(true);
          setMenuOptions(['Courses Offered', 'Placements', 'Academics', 'Facilities']);
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

  const openLinkInNewTab = (e, link) => {
    e.preventDefault();
    window.open(link, '_blank');
  };

  const toggleBOT = () => {
    clearTimeout(popupTimeout);
    setShowPopup(false);

    let blur = document.getElementById('blur');
    blur.classList.toggle('active');

    let chatbot = document.getElementById('chatbot');
    chatbot.classList.toggle('active');
  };


  // Chatbot's Reply Logic
  const handleChat = () => {
    setShowMenu(false);
    setShowFeedback(false);
    if (inputMessage.trim() !== '') {
      setOriginalUserMessage(inputMessage);
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
            setShowFeedback(true);
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

  // If a sugestion is clicked
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
          setShowFeedback(true);
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

  // FEEDBACK HANDLING FUNCTIONS
  const handleThumbsUpFeedback = () => {
    setShowFeedback(false);
    const botMessage = {
      text: 'Thankyou for the feedback!',
      sender: 'bot',
    }
    setMessages((prevMessages) => [...prevMessages, botMessage]);

  }

  const handleThumbsDownFeedback = () => {
    setShowFeedback(false);
    const userMessage = { text: originalUserMessage, sender: 'user' };
    console.log(userMessage);

    fetch("http://localhost:5000/api/chatbot/thumbsDownMessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userMessage),
    })
      .then((response) => {
        if (response.status === 201) {
          console.log("Thumbs down message sent successfully:", userMessage);
          const botMessage = {
            text: 'Thank you for the feedback! I will try to improve next time...',
            sender: 'bot',
          };
          setMessages((prevMessages) => [...prevMessages, botMessage]);
        } else {
          console.error("Failed to send thumbs down message. Server responded with status:", response.status);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  // IF USER EXITS CHATBOT
  const handleToggleExitModal = () => {
    if (messages.length === 2) {
      setMessages([
        { text: "Hello, I am VishwaGuru!", sender: 'bot' },
        { text: 'Let us get started with your Name and Email! It helps me to remember you :)', sender: 'bot' },
      ]);
      setInputMessage('');
      setName('');
      setEmail('');
      setUserData(true);
      setShowExitModal(false);
      setOptions([]);
      const blur = document.getElementById('blur');
      blur.classList.remove('active');
      const chatbot = document.getElementById('chatbot');
      chatbot.classList.remove('active');
    } else {
      setShowExitModal(true);
    }
  };

  const handleExitYes = () => {
    setMessages([
      { text: "Hello, I am VishwaGuru!", sender: 'bot' },
      { text: 'Let us get started with your Name and Email! It helps me to remember you :)', sender: 'bot' },
    ]);
    setInputMessage('');
    setName('');
    setEmail('');
    setUserData(true);
    setShowExitModal(false);
    setOptions([]);
    const blur = document.getElementById('blur');
    blur.classList.remove('active');
    const chatbot = document.getElementById('chatbot');
    chatbot.classList.remove('active');
    setShowExitModal(false);
  };

  return (
    <>
      <div className="container" id="blur">
        <br />
        <img src={logo} onClick={toggleBOT} className="showBOT-logo" alt="Click Here"></img>
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
              <button className="closeBOT" onClick={handleToggleExitModal}>
                ❌
              </button>
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
                {message.link ? (
                  <a href={message.link} target="_blank" onClick={(e) => openLinkInNewTab(e, message.link)}>
                    {message.text}
                  </a>
                ) : (
                  message.text
                )}

              </div>
            ))}

            {showFeedback && (
              <div>
                <button onClick={handleThumbsUpFeedback} className="btn btn-success btn-sm mx-2 mb-2"><i className="fa fa-thumbs-up" aria-hidden="true"></i></button>
                <button onClick={handleThumbsDownFeedback} className="btn btn-warning btn-sm mb-2"><i className="fa fa-thumbs-down" aria-hidden="true"></i></button>
              </div>
            )}

            {userData && (
              <form onSubmit={handleUserDetails}>
                <div className="input-container">
                  <input
                    className="input-details"
                    type="text"
                    placeholder="Your Name"
                    value={name}
                    onChange={handleNameChange}
                    required
                  />
                  <input
                    className="input-details"
                    type="email"
                    placeholder="Your Email"
                    value={email}
                    onChange={handleEmailChange}
                    required
                  />
                  <button className="btn-sm btn-primary" id="send-button">
                    Submit
                  </button>
                </div>
              </form>

            )}

            {!userData && showMenu && currentMenu === 'main' &&
              <div className="menu">
                <ul>
                  {menuOptions.map((option, index) => (
                    <li key={index}>
                      <button className={`chat-options`} onClick={() => handleMenuOptionClick(option)}>{option}</button>
                    </li>
                  ))}
                </ul>
              </div>
            }
            {!userData && showMenu && currentMenu === 'one' &&
              <div className="sub-menu">
                <ul>
                  {menu1Options.map((option, index) => (
                    <li key={index}>
                      <button className={`chat-options`} onClick={() => handleFirstMenuOptionClick(option)}>{option}</button>
                    </li>
                  ))}
                </ul>
              </div>
            }

            {!userData && showMenu && currentMenu === 'two' &&
              <div className="sub-menu">
                <ul>
                  {menu2Options.map((option, index) => (
                    <li key={index}>
                      <button className={`chat-options`} onClick={() => handleSecondMenuOptionClick(option)}>{option}</button>
                    </li>
                  ))}
                </ul>
              </div>
            }

            {!isBotTyping && options.length > 0 && (
              <div className=''>
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

            {isBotTyping && (
              <div className="message bot-message">Typing...</div>
            )}
          </div>

          {!userData && (
            <div className="my-1 message-input">
              <input type="text" className="mx-2" id="message-input" placeholder="Type your message..." onKeyDown={handleKeyDown1} value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} />
              <button className="mx-1 send-button" id="send-button" onClick={handleChat}> <i className="fa fa-paper-plane-o" aria-hidden="true"></i>  </button>
              <button className="mx-1 speech-button" id="speech-button" onClick={startSpeechRecognition}> <i className="fa fa-microphone" aria-hidden="true"></i> </button>
            </div>
          )}

          <br />
          {/* <button className="closeBOT" onClick={handleToggleExitModal}>
              ❌
            </button> */}
        </div>
      </div >

      <audio ref={audio} src={messageSound} preload="auto" />

      {
        showExitModal && (
          <div className="exit-modal">
            <div className="exit-modal-content">
              <div className="exit-modal-header">
                <h4>Are you sure you want to exit?Your chat won't be stored.</h4>
              </div>
              <div className="exit-modal-footer">
                <button onClick={handleExitYes} className="exit-yes-button">Yes</button>
                <button onClick={() => setShowExitModal(false)} className="exit-no-button">No</button>
              </div>
            </div>
          </div>
        )
      }
    </>
  );
}