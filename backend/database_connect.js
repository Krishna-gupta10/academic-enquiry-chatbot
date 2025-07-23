const mongoose = require('mongoose');

const connectToMongo = () => {
    mongoose.connect('mongodb+srv://chatbotuser:chatbotuser123@chatbot.rrkujzv.mongodb.net/').then(() => {
        console.log("Connected to MongoDB!")
    });
}

module.exports = connectToMongo;