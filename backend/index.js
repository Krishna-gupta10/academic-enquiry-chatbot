const express = require('express');
const bodyParser = require('body-parser');
const chatbotRoute = require('./routes/chatbot.js'); // Adjust the path as needed

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());

// Use the chatbot route
app.use('/', chatbotRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
