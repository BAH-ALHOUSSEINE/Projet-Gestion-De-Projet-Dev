/**
 * @fileoverview Routes for project-related operations.
 * @module routes/projetRouter
 */

const express = require('express');
const { createProject, addMember, getUserProjects, getProjectById, getSprintByprojetId, deleteprojet, deleteprojetmembre } = require('../controllers/projetController');
const router = express.Router();

/**
 * Route to create a new project.
 * @name POST /project
 * @function
 * @memberof module:routes/projetRouter
 * @inner
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
router.post('/project', createProject);

/**
 * Route to add a member to a project.
 * @name POST /:projectId/members
 * @function
 * @memberof module:routes/projetRouter
 * @inner
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
router.post('/:projectId/members', addMember);

/**
 * Route to get projects of a user.
 * @name GET /user/:userId
 * @function
 * @memberof module:routes/projetRouter
 * @inner
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
router.get('/user/:userId', getUserProjects);

/**
 * Route to get a project by its ID.
 * @name GET /:projectId
 * @function
 * @memberof module:routes/projetRouter
 * @inner
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
router.get('/:projectId', getProjectById);

/**
 * Route to delete a project by its ID.
 * @name DELETE /:projectId
 * @function
 * @memberof module:routes/projetRouter
 * @inner
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
router.delete('/:projectId', deleteprojet);

/**
 * Route to delete a project member by project ID and user email.
 * @name DELETE /:projectId/:emailuser
 * @function
 * @memberof module:routes/projetRouter
 * @inner
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
router.delete('/:projectId/:emailuser', deleteprojetmembre);

/**
 * Route to get sprints by project ID.
 * @name GET /:projectId/sprints
 * @function
 * @memberof module:routes/projetRouter
 * @inner
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
router.get('/:projectId/sprints', getSprintByprojetId);

module.exports = router;