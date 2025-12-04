// const Announcement = require('../models/Announcement');

// // @desc Get all announcements
// exports.getAnnouncements = async (req, res) => {
//   try {
//     const announcements = await Announcement.find().sort({ createdAt: -1 });
//     res.json(announcements);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // @desc Create a new announcement
// exports.createAnnouncement = async (req, res) => {
//   const { title } = req.body;
//   try {
//     const newAnnouncement = new Announcement({ title });
//     await newAnnouncement.save();
//     res.status(201).json(newAnnouncement);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// // @desc Delete an announcement
// exports.deleteAnnouncement = async (req, res) => {
//   try {
//     const removed = await Announcement.findByIdAndDelete(req.params.id);
//     if (!removed) return res.status(404).json({ message: 'Not found' });
//     res.json({ message: 'Deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // @desc Update an announcement
// exports.updateAnnouncement = async (req, res) => {
//   try {
//     const updated = await Announcement.findByIdAndUpdate(
//       req.params.id,
//       { title: req.body.title },
//       { new: true }
//     );
//     if (!updated) return res.status(404).json({ message: 'Not found' });
//     res.json(updated);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };


// controllers/announcementController.js
const Announcement = require('../models/Announcement');

// @desc Get all announcements
exports.getAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ createdAt: -1 });
    return res.json(announcements);
  } catch (error) {
    console.error("Get Announcements Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// @desc Create new announcement
exports.createAnnouncement = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title || title.trim() === "") {
      return res.status(400).json({ message: "Title is required" });
    }

    const newAnnouncement = new Announcement({ title });
    await newAnnouncement.save();

    return res.status(201).json(newAnnouncement);
  } catch (error) {
    console.error("Create Announcement Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// @desc Delete an announcement
exports.deleteAnnouncement = async (req, res) => {
  try {
    const deleted = await Announcement.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Announcement not found" });
    }

    return res.json({ message: "Deleted successfully" });
  } catch (error) {
    console.error("Delete Announcement Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// @desc Update announcement
exports.updateAnnouncement = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title || title.trim() === "") {
      return res.status(400).json({ message: "Title is required" });
    }

    const updated = await Announcement.findByIdAndUpdate(
      req.params.id,
      { title },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Announcement not found" });
    }

    return res.json(updated);
  } catch (error) {
    console.error("Update Announcement Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
