const express = require('express');
const router = express.Router();
const { PythonShell } = require('python-shell');

// Define a route to handle chatbot requests
router.post('/chatbot', (req, res) => {
  const userQuery = req.body.query;

  if (!userQuery || userQuery.trim().length === 0) {
    return res.status(400).json({ error: 'Please enter a valid query.' });
  }

  // Run the Python script with user input
  const options = {
    scriptPath: __dirname, // Adjust this path as needed
    args: [userQuery],
  };

  PythonShell.run('chatbot.py', options, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error.' });
    }

    const chatbotResponse = results[0];
    res.json({ response: chatbotResponse });
  });
});

module.exports = router;
