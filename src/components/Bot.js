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
      { text: "Hello, I am VIKAS!", sender: 'bot' },
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

  const redirectToLink = (link) => {
    if (link) {
      window.open(link, '_blank');
    } else {
      console.error('No link provided for redirection.');
    }
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
        text: 'Different Facicilites Provided @VIIT Are:', sender: 'bot'
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
      setMenu2Options(['B.tech-Civil', 'B.tech-Computer', 'B.tech-Electronics & Telecomunication ', 'B.tech-Information Technology', 'B.tech-Mechanical Engineering', 'B.tech-AI & DS','B.tech-CSE[AI]','B.tech-CSE[AI & ML]','B.tech-CSE[IOT,CS&BT]','B.tech-CE[Software Engineer]','B.tech-CSE[Data Science]', 'Go Back', 'Main Menu']);

    } else if (option === 'M.Tech') {
      const userMessage = { text: 'M.Tech', sender: 'user' };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      const botMessage = ({ text: 'We Offer a Variety of programs For M.tech Enthusiast:', sender: "bot" });
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setCurrentMenu('two');
      setMenu2Options(['M.Tech-Civil', 'M.Tech-Computer', 'M.Tech-Electronics & Telecomunication ', 'M.Tech-Mechanical', 'Go Back', 'Main Menu']);

    } else if (option === 'PHD') {
      const userMessage = { text: 'PHD', sender: 'user' };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      const botMessage = ({ text: 'In phd we offer are having branches like Mechanical Engineering, Civil, Computer Engineering, Electronics & Telecomunication Engineering\n for more details click here', sender: "bot",link:"https://www.viit.ac.in/admissions/phd-admissions" });
      redirectToLink('https://www.viit.ac.in/admissions/phd-admissions');
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setCurrentMenu('two');
      setMenu2Options(['Go Back', 'Main Menu']);
    }

    else if (option === 'Summary of placements') {
      const userMessage = { text: 'Summary of placements', sender: 'user' };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      const botMessage = ({ text: 'Click here for the information you\'ve been looking for', sender: "bot", link: 'https://www.viit.ac.in/placement-i2ic/placement-summary' });
      redirectToLink('https://www.viit.ac.in/placement-i2ic/placement-summary');
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setCurrentMenu('two');
      setMenu2Options(['Go Back', 'Main Menu']);

    } else if (option === 'Differents Recruiters') {
      const userMessage = { text: 'Differents Recruiters', sender: 'user' };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      const botMessage = ({ text: 'We\'ve a variety of recruiter\'s like:\nAccenture\tLoreal\tNVIDIA\tTech Mahindra\nHere\'s a list of all:', sender: "bot", link: 'https://www.viit.ac.in/placement-i2ic/our-recruiters-i2ic' });
      redirectToLink('https://www.viit.ac.in/placement-i2ic/our-recruiters-i2ic');
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setCurrentMenu('two');
      setMenu2Options(['Go Back', 'Main Menu']);

    } else if (option === 'Academic Calendar') {
      const userMessage = { text: 'Academic Calendar', sender: 'user' };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      const botMessage = ({ text: 'We have a properly managed and updated calander you can access it by clicking here', sender: "bot", link:"https://www.viit.ac.in/images/Academics/Institute_Calendar_Sem-I_AY_2023-24.pdf" });
      redirectToLink('https://www.viit.ac.in/images/Academics/Institute_Calendar_Sem-I_AY_2023-24.pdf');
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setMenu2Options(['Go Back', 'Main Menu']);

    } else if (option === 'Academic Structure') {
      const userMessage = { text: 'Academic Structure', sender: 'user' };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      const botMessage = ({ text: 'Click Here For the Academic Structure', sender: "bot", link: 'https://www.viit.ac.in/images/Academics/structure/Academic-structures_AY_2023-24.pdf' });
      redirectToLink('https://www.viit.ac.in/images/Academics/structure/Academic-structures_AY_2023-24.pdf');
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setCurrentMenu('two');
      setMenu2Options(['Go Back', 'Main Menu']);
    }
    else if (option === 'Syllabus') {
      const userMessage = { text: 'Syllabus', sender: 'user' };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      const botMessage = ({ text: 'Select the Branch for the Particular Syllabus', sender: "bot" });
      setCurrentMenu('two');
      setMenu2Options(['Civil', 'Computer Engineering', 'Electronics & Telecomunication Engineering', 'Information Technology', 'Mechanical Engineering', 'AI & DS','CSE[AI]','CSE[AI & ML]','CSE[IOT,CS&BT]','CE[Software Engineer]','CSE[Data Science]', 'Go Back', 'Main Menu']);
    }
    else if (option === 'Academic Council') {
      const userMessage = { text: 'Academic Council', sender: 'user' };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      const botMessage = ({ text: 'Click here', sender: "bot", link: 'https://www.viit.ac.in/academicjuly2020/academic-board-council' });
      redirectToLink('https://www.viit.ac.in/academicjuly2020/academic-board-council');
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setCurrentMenu('two');
      setMenu2Options(['Go Back', 'Main Menu']);
    }
    else if (option === 'Accomodation') {
      const userMessage = { text: 'Accomodation', sender: 'user' };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      const botMessage = ({ text: 'Click here', sender: "bot", link: 'https://www.viit.ac.in/images/Admissions/Hostel-Fees/VIIT-Hostel-Fee-Structure-2023-24.pdf' });
      redirectToLink('https://www.viit.ac.in/images/Admissions/Hostel-Fees/VIIT-Hostel-Fee-Structure-2023-24.pdf');
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setCurrentMenu('two');
      setMenu2Options(['Go Back', 'Main Menu']);
    }
    else if (option === 'Different Research & development Opportunities') {
      const userMessage = { text: 'Different Research & development Opportunities', sender: 'user' };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      const botMessage = ({ text: 'Click here', sender: "bot", link: 'https://www.viit.ac.in/research-and-development-cerd/r-d-scheme' });
      redirectToLink('https://www.viit.ac.in/research-and-development-cerd/r-d-scheme');
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
    if (option === 'B.tech-Civil') {
      const userMessage = { text: 'Civil', sender: 'user' };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      const botMessage = ({ text: 'In Civil we offer a total of 60 seats.\n For more details CLick Here', sender: "bot" ,link:'https://www.viit.ac.in/departments/civil/about-departmentcivil'});redirectToLink('https://www.viit.ac.in/departments/civil/about-departmentcivil');
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setCurrentMenu('two');
      setMenu2Options(['Go Back', 'Main Menu']);
      
    } else if (option === 'B.tech-Computer') {
      const userMessage = { text: 'Computer Engineering', sender: 'user' };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      const botMessage = ({ text: 'In Computer Engineering we offer a total of 240 seats.\n For more details CLick Here', sender: "bot" ,link:'https://www.viit.ac.in/departments/computer/department-profile-comp'});
      redirectToLink('https://www.viit.ac.in/departments/computer/department-profile-comp');
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setCurrentMenu('two');
      setMenu2Options(['Go Back', 'Main Menu']);

    } else if (option === 'B.tech-Electronics & Telecomunication ') {
      const userMessage = { text: 'Electronics & Telecomunication Engineering', sender: 'user' };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      const botMessage = ({ text: 'In Electronics & Telecomunication Engineering we offer a total of 180 seats.\n For more details CLick Here', sender: "bot",link:'https://www.viit.ac.in/departments/e-tc/department-profile-entc' });
      redirectToLink('https://www.viit.ac.in/departments/e-tc/department-profile-entc');
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setCurrentMenu('two');
      setMenu2Options(['Go Back', 'Main Menu']);
      
    }
     else if (option === 'B.tech-Information Technology') {
      const userMessage = { text: 'Information Technology', sender: 'user' };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      const botMessage = ({ text: 'In Information Technology we offer a total of 180 seats.\n For more details CLick Here', sender: "bot",link:'https://www.viit.ac.in/departments/information-technology-ug/department-profile' });
      redirectToLink('https://www.viit.ac.in/departments/information-technology-ug/department-profile');
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setCurrentMenu('two');
      setMenu2Options(['Go Back', 'Main Menu']);
      
    }
    else if (option === 'B.tech-Mechanical Engineering') {
      const userMessage = { text: 'Mechanical Engineering', sender: 'user' };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      const botMessage = ({ text: 'In Mechanical Engineering we offer a total of 120 seats.\n For more details CLick Here', sender: "bot",link:'https://www.viit.ac.in/departments/mechanical/about-departmentmech' });
      redirectToLink('https://www.viit.ac.in/departments/mechanical/about-departmentmech');
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setCurrentMenu('two');
      setMenu2Options(['Go Back', 'Main Menu']);
      
    }
    else if (option === 'B.tech-AI & DS') {
      const userMessage = { text: 'AI & DS', sender: 'user' };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      const botMessage = ({ text: 'In AI & DS Engineering we offer a total of 180 seats.\n For more details CLick Here', sender: "bot",link:'https://www.viit.ac.in/departments/ai-and-ds/about-department-aids' });
      redirectToLink('https://www.viit.ac.in/departments/ai-and-ds/about-department-aids');
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setCurrentMenu('two');
      setMenu2Options(['Go Back', 'Main Menu']);
      
    }
    else if (option === 'B.tech-CSE[AI]') {
      const userMessage = { text: 'CSE[AI]', sender: 'user' };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      const botMessage = ({ text: 'The CSE[AI] department focuses on innovation, research, and entrepreneurship, aiming to cultivate a dynamic learning environment and produce socially responsible AI professionals with interdisciplinary expertise and career readiness for diverse roles in data-driven industries.', sender: "bot",link:'https://www.viit.ac.in/departments/cse-ai' });
      redirectToLink('https://www.viit.ac.in/departments/cse-ai');
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setCurrentMenu('two');
      setMenu2Options(['Go Back', 'Main Menu']);
      
    }
    else if (option === 'B.tech-CSE[AI & ML]') {
      const userMessage = { text: 'CSE[AI & ML]', sender: 'user' };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      const botMessage = ({ text: 'In CSE[AI & ML] we offer a total of  60 seats.\n For more details CLick Here', sender: "bot",link:'https://www.viit.ac.in/departments/cse-ai-ml' });
      redirectToLink('https://www.viit.ac.in/departments/cse-ai-ml');
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setCurrentMenu('two');
      setMenu2Options(['Go Back', 'Main Menu']);
      
    }
    else if (option === 'B.tech-CSE[IOT,CS&BT]') {
      const userMessage = { text: 'CSE[IOT,CS&BT]', sender: 'user' };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      const botMessage = ({ text: 'In CSE[IOT,CS&BT] a specialized undergraduate program (B.Tech CSE) focusing on IoT, Cyber Security, and Blockchain. Graduates gain expertise in these transformative technologies, addressing the rising global demand for secure IoT ecosystems, robust cybersecurity, and the revolutionary impact of blockchain. The markets for IoT, cybersecurity, and blockchain are poised for substantial growth, reflecting their bright future.', sender: "bot",link:'https://www.viit.ac.in/departments/cse-iot-cs-bt' });
      redirectToLink('https://www.viit.ac.in/departments/cse-iot-cs-bt');
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setCurrentMenu('two');
      setMenu2Options(['Go Back', 'Main Menu']);
      
    }
    else if (option === 'B.tech-CE[Software Engineer]') {
      const userMessage = { text: 'CE[Software Engineer]', sender: 'user' };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      const botMessage = ({ text: 'In CE[Software Engineer] we offers a unique blend of hardware and software knowledge, preparing graduates for versatile roles like software developers or systems analysts. The program includes hands-on projects, an industry-aligned curriculum, and fosters problem-solving skills. With a global demand for skilled software engineers, VIIT\'s program, guided by dedicated faculty, provides a distinctive and world-class education.', sender: "bot",link:'https://www.viit.ac.in/departments/ce-se' });
      redirectToLink('https://www.viit.ac.in/departments/ce-se');
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setCurrentMenu('two');
      setMenu2Options(['Go Back', 'Main Menu']);
      
    }
    else if (option === 'B.tech-CSE[Data Science]') {
      const userMessage = { text: 'CSE[Data Science]', sender: 'user' };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      const botMessage = ({ text: 'From 2023–2024, the institute offers a 60-capacity B.Tech CSE (Data Science) program, combining computer science, statistics, and mathematics. Designed for analytical minds, it prepares graduates for rewarding careers in AI and Data Science across various industries.e', sender: "bot",link:'https://www.viit.ac.in/departments/cse-ds' });
      redirectToLink('https://www.viit.ac.in/departments/cse-ds');
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setCurrentMenu('two');
      setMenu2Options(['Go Back', 'Main Menu']);
      
    }
    else if (option === 'M.Tech-Civil') {
      const userMessage = { text: 'Civil', sender: 'user' };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      const botMessage = ({ text: 'In Civil we offer a total of 6 seats.\n For more details CLick Here', sender: "bot" ,link:'https://www.viit.ac.in/departments/civil/about-departmentcivil'});
      redirectToLink('https://www.viit.ac.in/departments/civil/about-departmentcivil');
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setCurrentMenu('two');
      setMenu2Options(['Go Back', 'Main Menu']);
      

    } else if (option === 'M.Tech-Computer') {
      const userMessage = { text: 'Computer Engineering', sender: 'user' };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      const botMessage = ({ text: 'In Computer Engineering we offer a total of 6 seats.\n For more details CLick Here', sender: "bot" ,link:'https://www.viit.ac.in/departments/computer/department-profile-comp'});
      redirectToLink('https://www.viit.ac.in/departments/computer/department-profile-comp');
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setCurrentMenu('two');
      setMenu2Options(['Go Back', 'Main Menu']);

    } else if (option === 'M.Tech-Electronics & Telecomunication ') {
      const userMessage = { text: 'Electronics & Telecomunication Engineering', sender: 'user' };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      const botMessage = ({ text: 'In Electronics & Telecomunication Engineering we offer a total of 6 seats.\n For more details CLick Here', sender: "bot",link:'https://www.viit.ac.in/departments/e-tc/department-profile-entc' });
      redirectToLink('https://www.viit.ac.in/departments/e-tc/department-profile-entc');
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setCurrentMenu('two');
      setMenu2Options(['Go Back', 'Main Menu']);
      
    }
    else if (option === 'M.Tech-Mechanical') {
      const userMessage = { text: 'Mechanical Engineering', sender: 'user' };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      const botMessage = ({ text: 'In Mechanical Engineering we offer a total of 6 seats.\n For more details CLick Here', sender: "bot",link:'https://www.viit.ac.in/departments/mechanical/about-departmentmech' });
      redirectToLink('https://www.viit.ac.in/departments/mechanical/about-departmentmech');
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setCurrentMenu('two');
      setMenu2Options(['Go Back', 'Main Menu']);
    }  
    else if (option === 'Civil') {
      const userMessage = { text: 'Civil Engineering', sender: 'user' };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      const botMessage = ({ text: 'Click Here for details about Syllabus of Civil Engineering', sender: "bot",link:'https://www.viit.ac.in/departments/civil/about-departmentcivil' });
      redirectToLink('https://www.viit.ac.in/departments/civil/about-departmentcivil');
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setCurrentMenu('two');
      setMenu2Options(['Go Back', 'Main Menu']);
      
    }
    else if (option === 'Computer Engineering') {
      const userMessage = { text: 'Computer Engineering', sender: 'user' };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      const botMessage = ({ text: 'Click Here for details about Syllabus of Computer Engineering', sender: "bot",link:'https://www.viit.ac.in/departments/computer/syllabus' });
      redirectToLink('https://www.viit.ac.in/departments/computer/syllabus');
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setCurrentMenu('two');
      setMenu2Options(['Go Back', 'Main Menu']);
      
    }
    else if (option === 'Electronics & Telecomunication Engineering') {
      const userMessage = { text:  'Electronics & Telecomunication Engineering', sender: 'user' };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      const botMessage = ({ text: 'Click Here for details about Syllabus of Electronics & Telecomunication Engineering', sender: "bot",link:'https://www.viit.ac.in/departments/e-tc/syllabus' });
      redirectToLink('https://www.viit.ac.in/departments/e-tc/syllabus');
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setCurrentMenu('two');
      setMenu2Options(['Go Back', 'Main Menu']);
      
    }
    else if (option === 'Information Technology') {
      const userMessage = { text: 'Information Technology', sender: 'user' };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      const botMessage = ({ text: 'Click Here for details about Syllabus of Information Technology', sender: "bot",link:'https://www.viit.ac.in/departments/information-technology-ug/syllabus' });
      redirectToLink('https://www.viit.ac.in/departments/information-technology-ug/syllabus');
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setCurrentMenu('two');
      setMenu2Options(['Go Back', 'Main Menu']);
      
    }
    else if (option ==='Mechanical Engineering') {
      const userMessage = { text: 'Mechanical Engineering', sender: 'user' };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      const botMessage = ({ text: 'Click Here for details about Syllabus of Mechanical Engineering', sender: "bot",link:'https://www.viit.ac.in/departments/mechanical/syllabus' });
      redirectToLink('https://www.viit.ac.in/departments/mechanical/syllabus');
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setCurrentMenu('two');
      setMenu2Options(['Go Back', 'Main Menu']);
      
    }
    else if (option === 'AI & DS') {
      const userMessage = { text: 'AI & DS', sender: 'user' };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      const botMessage = ({ text: 'Click Here for details about Syllabus of AI & DS', sender: "bot",link:'https://www.viit.ac.in/departments/ai-and-ds/aids-syllabus' });
      redirectToLink('https://www.viit.ac.in/departments/ai-and-ds/aids-syllabus');
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setCurrentMenu('two');
      setMenu2Options(['Go Back', 'Main Menu']);
      
    }
    else if (option === 'CSE[AI]') {
      const userMessage = { text: 'CSE[AI]', sender: 'user' };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      const botMessage = ({ text: 'Click Here for details about Syllabus of CSE[AI]', sender: "bot",link:'https://www.viit.ac.in/departments/cse-ai/syllabus-cse-ai' });
      redirectToLink('https://www.viit.ac.in/departments/cse-ai/syllabus-cse-ai');
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setCurrentMenu('two');
      setMenu2Options(['Go Back', 'Main Menu']);
      
    }
    else if (option === 'CSE[AI & ML]') {
      const userMessage = { text: 'CSE[AI & ML]', sender: 'user' };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      const botMessage = ({ text: 'Click Here for details about Syllabus of CSE[AI & ML]', sender: "bot",link:'https://www.viit.ac.in/departments/cse-ai-ml/syllabus-cse-ai-ml' });
      redirectToLink('https://www.viit.ac.in/departments/cse-ai-ml/syllabus-cse-ai-ml');
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setCurrentMenu('two');
      setMenu2Options(['Go Back', 'Main Menu']);
      
    }
    else if (option === 'CSE[IOT,CS&BT]') {
      const userMessage = { text: 'CSE[IOT,CS&BT]', sender: 'user' };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      const botMessage = ({ text: 'Click Here for details about Syllabus of CSE[IOT,CS&BT]', sender: "bot",link:'https://www.viit.ac.in/departments/cse-iot-cs-bt/syllabus-iot-cs-bt' });
      redirectToLink('https://www.viit.ac.in/departments/cse-iot-cs-bt/syllabus-iot-cs-bt');
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setCurrentMenu('two');
      setMenu2Options(['Go Back', 'Main Menu']);
      
    }
    else if (option === 'CE[Software Engineer]') {
      const userMessage = { text: 'CE[Software Engineer]', sender: 'user' };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      const botMessage = ({ text: 'Click Here for details about Syllabus of CE[Software Engineer]', sender: "bot",link:'https://www.viit.ac.in/departments/ce-se/syllabus-ce-se' });
      redirectToLink('https://www.viit.ac.in/departments/ce-se/syllabus-ce-se');
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setCurrentMenu('two');
      setMenu2Options(['Go Back', 'Main Menu']);
      
    }
    else if (option === 'CSE[Data Science]') {
      const userMessage = { text: 'CSE[Data Science]', sender: 'user' };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      const botMessage = ({ text: 'Click Here for details about Syllabus of CSE[Data Science]', sender: "bot",link:'https://www.viit.ac.in/departments/cse-ds/syllabus-cse-ds' });
      redirectToLink('https://www.viit.ac.in/departments/cse-ds/syllabus-cse-ds');
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setCurrentMenu('two');
      setMenu2Options(['Go Back', 'Main Menu']);
      
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
        { text: "Hello, I am VIKAS!", sender: 'bot' },
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
      { text: "Hello, I am VIKAS!", sender: 'bot' },
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
              <i className="fa fa-android" aria-hidden="true"></i> VIKAS
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