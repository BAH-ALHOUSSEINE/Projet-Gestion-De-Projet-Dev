const express = require('express');
const { addTacheToCategorie, updateTache } = require('../controllers/taskController');
const { protect } = require('../middleware/authomiddleware');
const router = express.Router();

router.put('/:projetId/sprints/:sprintId/categories/:categorieId/tasks/:tacheId', updateTache);


module.exports = router;
