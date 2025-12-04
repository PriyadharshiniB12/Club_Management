const express = require('express');
const router = express.Router();
const { getFrequentlyAbsentStudents } = require('../controllers/monitoringController');

router.get('/frequent-absentees', getFrequentlyAbsentStudents);

module.exports = router;
