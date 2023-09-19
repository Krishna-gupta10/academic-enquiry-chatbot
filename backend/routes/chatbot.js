const express = require('express');
const router = express.Router();
const { spawn } = require('child_process');


router.post('/chatbot', async (req, res) => {
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

module.exports = router;