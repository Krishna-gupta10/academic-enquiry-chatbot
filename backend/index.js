const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 

const connectToMongo = require('./database_connect.js');
connectToMongo();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/chatbot', require('./routes/chatbot.js'));
app.listen(port, () => {
  console.log(`ChatBot Server is running on port ${port}`);
});
