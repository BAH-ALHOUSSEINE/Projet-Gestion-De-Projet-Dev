const express = require('express');
const { createProject, addMember } = require('../controllers/projetController');
const { protect } = require('../middleware/authomiddleware');
const router = express.Router();

router.post('/', protect, createProject);
router.put('/:projectId/members', protect, addMember);

module.exports = router;
