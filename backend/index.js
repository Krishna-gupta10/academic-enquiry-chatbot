const express = require('express');
const app = express();
const port = 5000;

// Middleware: Parse JSON request bodies
app.use(express.json());

// Routes available at /api/chatbot
app.use('/api/chatbot', require('./routes/chatbot.js'));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
