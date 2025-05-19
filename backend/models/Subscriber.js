const mongoose = require("mongoose");

const subscriberShema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    uniqure: true,
    trim: true,
    lowercase: true,
  },
  subscribedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Subscriber", subscriberShema);
