const express = require('express');
const { addTacheToCategorie } = require('../controllers/taskController');
const { protect } = require('../middleware/authomiddleware');
const router = express.Router();

router.post('/:projectId/tasks', protect, addTacheToCategorie);

module.exports = router;
