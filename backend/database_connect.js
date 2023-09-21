const mongoose = require('mongoose');

const connectToMongo = () => {
    mongoose.connect('mongodb://127.0.0.1:27017/chatbot').then(() => {
        console.log("Connected to MongoDB!")
    });
}

module.exports = connectToMongo;