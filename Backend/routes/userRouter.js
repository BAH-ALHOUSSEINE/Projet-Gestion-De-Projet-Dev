/**
 * Express router to handle user-related routes.
 * @module routes/userRouter
 */

const express = require('express');
const router = express.Router();

const { getUserById } = require('../controllers/userController'); // Ensure the path is correct

/**
 * Route to get a user by ID.
 * @name get/:userId
 * @function
 * @memberof module:routes/userRouter
 * @param {string} userId - The ID of the user to retrieve.
 * @param {function} getUserById - Controller function to handle the request.
 * @returns {Object} 200 - User object
 * @returns {Error}  404 - User not found
 */
router.get('/:userId', getUserById);

module.exports = router;
