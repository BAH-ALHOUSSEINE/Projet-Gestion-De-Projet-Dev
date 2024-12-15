/**
 * Express router for managing sprints, categories, and tasks.
 * @module routes/routerSprint
 */

const express = require('express');
const router = express.Router();
const sprintController = require('../controllers/SprintController');
const categorieTacheController = require('../controllers/CategorieTacheController');
const tacheController = require('../controllers/taskController');

/**
 * Route to create a sprint.
 * @name POST/:projetId/sprintaj
 * @function
 * @memberof module:routes/routerSprint
 * @param {string} projetId - The ID of the project.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
router.post('/:projetId/sprintaj', sprintController.createSprint);

/**
 * Route to add a category to a sprint.
 * @name POST/:projetId/sprint/:sprintId/categorie
 * @function
 * @memberof module:routes/routerSprint
 * @param {string} projetId - The ID of the project.
 * @param {string} sprintId - The ID of the sprint.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
router.post('/:projetId/sprint/:sprintId/categorie', categorieTacheController.addCategorieToSprint);

/**
 * Route to add a task to a category in a sprint.
 * @name POST/:projetId/sprint/:sprintId/categorie/:categorieId/tache
 * @function
 * @memberof module:routes/routerSprint
 * @param {string} projetId - The ID of the project.
 * @param {string} sprintId - The ID of the sprint.
 * @param {string} categorieId - The ID of the category.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
router.post('/:projetId/sprint/:sprintId/categorie/:categorieId/tache', tacheController.addTacheToCategorie);

module.exports = router;