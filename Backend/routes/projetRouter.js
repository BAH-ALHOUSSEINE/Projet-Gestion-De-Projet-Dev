const express = require('express');
const { createProject, addMember, getUserProjects, getProjectById,getSprintByprojetId } = require('../controllers/projetController');
const router = express.Router();

router.post('/project', createProject);
router.post('/:projectId/members', addMember);
router.get('/user/:userId',getUserProjects);
router.get('/:projectId', getProjectById);
router.get('/:projectId/sprints',getSprintByprojetId );


module.exports = router;
