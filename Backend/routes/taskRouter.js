const express = require('express');
const { createTask } = require('../controllers/taskController');
const { protect } = require('../middleware/authomiddleware');
const router = express.Router();

router.post('/:projectId/tasks', protect, createTask);

module.exports = router;
