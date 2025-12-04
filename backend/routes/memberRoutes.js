const express = require('express');
const router = express.Router();
const {
  getAllMembers,
  createMember,
  getMemberById,
  updateMember,
  deleteMember
} = require('../controllers/memberController');

router.get('/', getAllMembers);
router.post('/', createMember);
router.get('/:id', getMemberById);
router.put('/:id', updateMember);
router.delete('/:id', deleteMember);

module.exports = router;
