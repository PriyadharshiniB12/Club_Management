// const Member = require('../models/Member');
// const Event = require('../models/Event');
// const Announcement = require('../models/Announcement');

// const getDashboardStats = async (req, res) => {
//   try {
//     // Basic counts
//     const memberCount = await Member.countDocuments();
//     const eventCount = await Event.countDocuments();
//     const announcementCount = await Announcement.countDocuments();

//     // Roles distribution (for pie chart)
//     const roles = await Member.aggregate([
//       { $group: { _id: "$role", count: { $sum: 1 } } }
//     ]);

//     // Events per month (for bar chart)
//     const eventsPerMonth = await Event.aggregate([
//       {
//         $group: {
//           _id: { $month: "$datetime" },
//           count: { $sum: 1 }
//         }
//       },
//       { $sort: { "_id": 1 } }
//     ]);

//     res.json({
//       members: memberCount,
//       events: eventCount,
//       announcements: announcementCount,
//       roles,             // Pie chart data
//       eventsPerMonth     // Bar chart data
//     });

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to fetch dashboard stats' });
//   }
// };

// module.exports = { getDashboardStats };

const Member = require('../models/Member');
const Event = require('../models/Event');
const Announcement = require('../models/Announcement');

// @desc Get dashboard statistics
const getDashboardStats = async (req, res) => {
  try {
    // Total counts
    const [memberCount, eventCount, announcementCount] = await Promise.all([
      Member.countDocuments(),
      Event.countDocuments(),
      Announcement.countDocuments()
    ]);

    // Roles distribution for pie chart
    const roles = await Member.aggregate([
      { $group: { _id: "$role", count: { $sum: 1 } } }
    ]);

    // Events per month for bar chart
    const eventsPerMonth = await Event.aggregate([
      {
        $group: {
          _id: { $month: "$datetime" },
          count: { $sum: 1 }
        }
      },
      { $sort: { "_id": 1 } }
    ]);

    return res.json({
      members: memberCount,
      events: eventCount,
      announcements: announcementCount,
      roles,           // Pie chart data
      eventsPerMonth   // Bar chart data
    });
  } catch (error) {
    console.error("Dashboard Stats Error:", error);
    return res.status(500).json({ message: "Failed to fetch dashboard stats" });
  }
};

module.exports = { getDashboardStats };
