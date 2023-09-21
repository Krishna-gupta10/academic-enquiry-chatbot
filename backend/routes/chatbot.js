const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { spawn } = require('child_process');
const User = require('../models/User');


router.post('/chat', async (req, res) => {
  const userQuery = req.body.query;

  if (!userQuery || userQuery.trim().length === 0) {
    return res.status(400).json({ error: 'Please enter a valid query.' });
  }


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

  try {
    const chatbotResponse = await chatbotResponsePromise;
    res.json(chatbotResponse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error.' });
  }


});

router.post('/userdetails', [
  body('name').isLength({ min: 5 }),
  body('email').isEmail(),
], async (req, res) => {

  let user = await User.findOne({ email: req.body.email });
  if (user) {
      return res.status(400).json("A User with this email address already exists!");
  }

  user = await User.create({
      name: req.body.name,
      email: req.body.email,
  }).then(()=> {
    res.json('Thankyou For Your Details!');
  });
});

module.exports = router;


