
const mongoose = require('mongoose');

const busSchema = new mongoose.Schema({
  routeName: {
    type: String,
    required: [true, "Route name is required"],
    trim: true,
  },
  departureTime: {
    type: String, // could use Date if you prefer
    required: [true, "Departure time is required"],
  },
  note: {
    type: String,
    default: "",
    trim: true,
  }
}, { timestamps: true });

module.exports = mongoose.model('Bus', busSchema);
