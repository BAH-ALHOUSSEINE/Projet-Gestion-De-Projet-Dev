const express = require('express');
const { createProject, addMember, getUserProjects } = require('../controllers/projetController');
const router = express.Router();

router.post('/project', createProject);
router.put('/:projectId/members', addMember);


module.exports = router;
