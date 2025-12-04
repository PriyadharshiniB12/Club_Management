const express = require('express');
const router = express.Router();
const {
  markAttendance,
  getAllAttendance,
  getAttendanceByEvent,
  getAttendanceByStudent,
} = require('../controllers/attendanceController');

router.post('/mark', markAttendance);
router.get('/', getAllAttendance);
router.get('/event/:eventId', getAttendanceByEvent);
router.get('/student/:studentId', getAttendanceByStudent);

module.exports = router;
