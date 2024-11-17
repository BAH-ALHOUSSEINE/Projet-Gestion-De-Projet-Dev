const express = require('express');
const { createProject, addMember, getProjects } = require('../controllers/projetController');
const { protect } = require('../middleware/authomiddleware');
const router = express.Router();

// Route pour récupérer les projets d'un utilisateur
router.get('/', protect, getProjects);

// Route pour créer un projet
router.post('/', protect, createProject);

// Route pour ajouter un membre à un projet
router.put('/:projectId/members', protect, addMember);

module.exports = router;
