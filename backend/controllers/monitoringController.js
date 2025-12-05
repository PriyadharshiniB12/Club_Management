const Attendance = require('../models/Attendance');
const Member = require('../models/Member');

// @desc Get students with frequent absences
const getFrequentlyAbsentStudents = async (req, res) => {
  try {
    const threshold = Number(req.query.threshold) || 3; // Optional threshold via query

    const pipeline = [
      { $match: { status: 'Absent' } }, // Match absent records
      { $group: { _id: '$studentId', absences: { $sum: 1 } } }, // Count absences per student
      { $match: { absences: { $gte: threshold } } }, // Filter by threshold
      {
        $lookup: {
          from: 'members',           // Collection name in MongoDB
          localField: '_id',
          foreignField: '_id',
          as: 'student'
        }
      },
      { $unwind: '$student' },
      {
        $project: {
          _id: 0,
          studentId: '$student._id',
          name: '$student.name',
          role: '$student.role',
          absences: 1
        }
      }
    ];

    const result = await Attendance.aggregate(pipeline);
    return res.json(result);
  } catch (error) {
    console.error("Monitoring Error:", error);
    return res.status(500).json({ message: 'Failed to fetch monitoring data' });
  }
};

module.exports = { getFrequentlyAbsentStudents };
