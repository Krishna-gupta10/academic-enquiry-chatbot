const express = require('express');
const bodyParser = require('body-parser');
const chatbotRoute = require('./routes/chatbot.js');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());

// Routes
app.use('/', chatbotRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
