const express = require('express');
const { createProject, addMember, getUserProjects, getProjectById } = require('../controllers/projetController');
const router = express.Router();

router.post('/project', createProject);
router.put('/:projectId/members', addMember);
router.get('/user/:userId',getUserProjects);
router.get('/:projectId', getProjectById);


module.exports = router;
