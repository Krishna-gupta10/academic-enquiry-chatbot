const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { spawn } = require('child_process');
const User = require('../models/User');
const ChatMessage = require('../models/ChatMessage');


// ROUTE 1: Using POST to retrieve Bot message and suggested options from Python Script 
router.post('/chat', async (req, res) => {
  const userQuery = req.body.query;

  if (!userQuery || userQuery.trim().length === 0) {
    return res.status(400).json({ error: 'Please enter a valid query.' });
  }

  try {
    const chatbotResponsePromise = new Promise((resolve, reject) => {
      const pythonProcess = spawn('python', ['./backend/routes/chatbot.py', userQuery]);

      pythonProcess.stdout.on('data', (data) => {
        const responseString = data.toString();
        try {
          const responseObject = JSON.parse(responseString);
          resolve(responseObject);
        } catch (error) {
          reject(error);
        }
      });

      pythonProcess.stderr.on('data', (data) => {
        console.error(`Python script error: ${data.toString()}`);
        reject(new Error('Internal server error.'));
      });

      pythonProcess.on('close', (code) => {
        if (code !== 0) {
          console.error(`Python script exited with code ${code}`);
          reject(new Error('Internal server error.'));
        }
      });
    });

    const chatbotResponse = await chatbotResponsePromise;
    res.json(chatbotResponse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

router.post('/thumbsDownMessage', [
  body('text').isLength({ min: 1 }),
  body('sender').isLength({ min: 1 }),
], async (req, res) => {
  const { text, sender } = req.body;

  try {
    await ChatMessage.create({
      userQuery: text,
    });

    res.status(201).json({ message: 'Thumbs down feedback saved successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});



router.post('/userdetails', [
  body('name').isLength({ min: 5 }),
  body('email').isEmail(),
], async (req, res) => {

  const { name, email } = req.body;

  try {
    user = await User.create({
      name,
      email,
    });

    res.status(201).json('Thank you for providing your details!');
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

module.exports = router;


