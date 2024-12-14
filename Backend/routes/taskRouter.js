const express = require('express');
const { addTacheToCategorie, updateTache, deleteTache } = require('../controllers/taskController');
const { protect } = require('../middleware/authomiddleware');
const router = express.Router();

router.put('/:projetId/sprints/:sprintId/categories/:categorieId/tasks/:tacheId', updateTache);

router.delete(
    '/:projetId/sprints/:sprintId/categories/:categorieId/tasks/:tacheId',
    deleteTache
  );


module.exports = router;
