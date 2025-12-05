//attendancecontroller.js
console.log("Attendance Controller Loaded");
const Attendance = require('../models/Attendance');

// Haversine formula to calculate distance in km
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the earth in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI/180) * Math.cos(lat2 * Math.PI/180) *
    Math.sin(dLon/2) * Math.sin(dLon/2)
  ;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

function isWithinRadius(userLat, userLng, eventLat, eventLng, radiusKm = 0.1) {
  const distance = getDistanceFromLatLonInKm(userLat, userLng, eventLat, eventLng);
  return distance <= radiusKm;
}

// @desc Mark attendance for a student
exports.markAttendance = async (req, res) => {
  try {
    const { studentId, eventId, userLat, userLng, eventLat, eventLng } = req.body;

    if (!studentId || !eventId) {
      return res.status(400).json({ message: "studentId and eventId are required" });
    }

    let status = 'Absent';
    if (userLat && userLng && eventLat && eventLng) {
      const present = isWithinRadius(userLat, userLng, eventLat, eventLng);
      status = present ? 'Present' : 'Absent';
    }

    // Prevent duplicate attendance
    const existing = await Attendance.findOne({ studentId, eventId });
    if (existing) {
      return res.status(409).json({ message: "Attendance already marked" });
    }

    const record = await Attendance.create({ studentId, eventId, status });
    return res.status(201).json(record);
  } catch (err) {
    console.error("Mark Attendance Error:", err);
    return res.status(500).json({ message: "Failed to mark attendance" });
  }
};

// @desc Get all attendance records
exports.getAllAttendance = async (req, res) => {
  try {
    const records = await Attendance.find().sort({ createdAt: -1 });
    return res.json(records);
  } catch (err) {
    console.error("Get All Attendance Error:", err);
    return res.status(500).json({ message: "Failed to fetch attendance" });
  }
};

// @desc Get attendance by event
exports.getAttendanceByEvent = async (req, res) => {
  const { eventId } = req.params;
  if (!eventId) return res.status(400).json({ message: "eventId is required" });

  try {
    const data = await Attendance.find({ eventId });
    return res.json(data);
  } catch (err) {
    console.error("Get Attendance By Event Error:", err);
    return res.status(500).json({ message: "Failed to fetch attendance" });
  }
};

// @desc Get attendance by student
exports.getAttendanceByStudent = async (req, res) => {
  const { studentId } = req.params;
  if (!studentId) return res.status(400).json({ message: "studentId is required" });

  try {
    const data = await Attendance.find({ studentId });
    return res.json(data);
  } catch (err) {
    console.error("Get Attendance By Student Error:", err);
    return res.status(500).json({ message: "Failed to fetch attendance" });
  }
};
