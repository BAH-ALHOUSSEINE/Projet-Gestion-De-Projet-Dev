const express = require('express');
const { createProject, addMember } = require('../controllers/projetController');
const { protect } = require('../middleware/authomiddleware');
const router = express.Router();

router.post('/', protect, createProject);
router.put('/:projectId/members', protect, addMember);

// Route pour récupérer les projets d'un utilisateur
router.get('/', async (req, res) => {
    try {
      const projets = await Projet.find(); // Modifier si vous filtrez par utilisateur
      res.json(projets);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  // Route pour créer un projet
  router.post('/', async (req, res) => {
    const projet = new Projet({
      nom_projet: req.body.nom_projet,
      // Ajoutez d'autres propriétés nécessaires
    });
  
    try {
      const nouveauProjet = await projet.save();
      res.status(201).json(nouveauProjet);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
module.exports = router;