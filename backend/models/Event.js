const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
  },
  datetime: { // renamed from "date" to match controller usage
    type: Date,
    required: [true, "Date are required"],
  },
  location: {
    type: String,
    required: [true, "Location is required"],
    trim: true,
  },
  description: {
    type: String,
    default: "",
    trim: true,
  }
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);
