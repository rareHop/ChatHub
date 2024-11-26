import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  sender: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  isAI: {
    type: Boolean,
    default: false,
  },
});

export const Message = mongoose.model('Message', messageSchema);