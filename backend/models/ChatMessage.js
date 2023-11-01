const mongoose = require('mongoose');

const chatMessageSchema = new mongoose.Schema({
  userQuery: {
    type: String,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const ChatMessage = mongoose.model('ChatMessage', chatMessageSchema);

module.exports = ChatMessage;
