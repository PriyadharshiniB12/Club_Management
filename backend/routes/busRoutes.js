const express = require('express');
const router = express.Router();
const { addBus, getBuses, deleteBus } = require('../controllers/busController');

router.post('/', addBus);
router.get('/', getBuses);
router.delete('/:id', deleteBus);

module.exports = router;
