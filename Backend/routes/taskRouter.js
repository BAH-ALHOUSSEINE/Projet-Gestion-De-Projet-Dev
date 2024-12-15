/**
 * Express router for handling task-related routes.
 * @module routes/taskRouter
 */

const express = require('express');
const { addTacheToCategorie, updateTache, deleteTache } = require('../controllers/taskController');
const router = express.Router();

/**
 * Route to update a task.
 * @name put/:projetId/sprints/:sprintId/categories/:categorieId/tasks/:tacheId
 * @function
 * @memberof module:routes/taskRouter
 * @param {string} req.params.projetId - The ID of the project.
 * @param {string} req.params.sprintId - The ID of the sprint.
 * @param {string} req.params.categorieId - The ID of the category.
 * @param {string} req.params.tacheId - The ID of the task.
 * @param {function} updateTache - Controller function to update the task.
 */

router.put('/:projetId/sprints/:sprintId/categories/:categorieId/tasks/:tacheId', updateTache);

/**
 * Route to delete a task.
 * @name delete/:projetId/sprints/:sprintId/categories/:categorieId/tasks/:tacheId
 * @function
 * @memberof module:routes/taskRouter
 * @param {string} req.params.projetId - The ID of the project.
 * @param {string} req.params.sprintId - The ID of the sprint.
 * @param {string} req.params.categorieId - The ID of the category.
 * @param {string} req.params.tacheId - The ID of the task.
 * @param {function} deleteTache - Controller function to delete the task.
 */

router.delete('/:projetId/sprints/:sprintId/categories/:categorieId/tasks/:tacheId', deleteTache);

module.exports = router;
