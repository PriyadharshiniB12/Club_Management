// const mongoose = require('mongoose');

// const memberSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   rollNumber: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   email: String,
//   phone: String,
//   department: String,
//   year: Number,
//   role: {
//     type: String,
//     enum: ['President', 'Vice President', 'Secretary', 'Member'],
//     default: 'Member',
//   },
//   joinedDate: {
//     type: Date,
//     default: Date.now,
//   },
// });

// const Member = mongoose.model('Member', memberSchema);

// module.exports = Member;

const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  rollNumber: {
    type: String,
    required: [true, "Roll number is required"],
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    trim: true
  },
  department: {
    type: String,
    trim: true
  },
  year: Number,
  role: {
    type: String,
    enum: ['President', 'Vice President', 'Secretary', 'Member'],
    default: 'Member',
  },
  joinedDate: {
    type: Date,
    default: Date.now,
  },
  avatarUrl: {
    type: String,
    default: ""
  }
}, { timestamps: true });

module.exports = mongoose.model('Member', memberSchema);
