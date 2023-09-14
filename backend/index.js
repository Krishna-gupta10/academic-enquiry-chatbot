const express = require('express');
const bodyParser = require('body-parser');
const chatbotRoute = require('./routes/chatbot.js');
const cors = require('cors'); 

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/', chatbotRoute);

app.listen(port, () => {
  console.log(`ChatBot Server is running on port ${port}`);
});
