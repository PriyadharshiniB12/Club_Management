const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
  },
}, { timestamps: true }); // automatically adds createdAt & updatedAt

module.exports = mongoose.model('Announcement', announcementSchema);
