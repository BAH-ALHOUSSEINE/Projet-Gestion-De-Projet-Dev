const express = require('express');
const router = express.Router();
const sprintController = require('../controllers/SprintController');
const categorieTacheController = require('../controllers/CategorieTacheController');
const tacheController = require('../controllers/taskController');

// Route pour créer un sprint
router.post('/sprintaj', sprintController.createSprint);

// Route pour ajouter une catégorie à un sprint
router.post('/:sprintId/categorie', categorieTacheController.addCategorieToSprint);

// Route pour ajouter une tâche à une catégorie dans un sprint
router.post('/:sprintId/categorie/:categorieId/tache', tacheController.addTacheToCategorie);

module.exports = router;