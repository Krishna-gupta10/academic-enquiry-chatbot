const mongoose = require('mongoose');

const chatMessageSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  userQuery: {
    type: String,
  },
  botResponse: {
    type: String,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const ChatMessage = mongoose.model('ChatMessage', chatMessageSchema);

module.exports = ChatMessage;