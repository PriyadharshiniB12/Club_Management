// const mongoose = require('mongoose');

// const attendanceSchema = new mongoose.Schema({
//   studentId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Member',
//     required: true
//   },
//   eventId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Event',
//     required: true
//   },
//   status: {
//     type: String,
//     enum: ['present', 'absent'],
//     default: 'absent'
//   },
//   timestamp: {
//     type: Date,
//     default: Date.now
//   }
// });

// module.exports = mongoose.model('Attendance', attendanceSchema);

const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Member',
    required: [true, "Student ID is required"],
  },
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: [true, "Event ID is required"],
  },
  status: {
    type: String,
    enum: ['Present', 'Absent'],
    default: 'Absent',
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

module.exports = mongoose.model('Attendance', attendanceSchema);
