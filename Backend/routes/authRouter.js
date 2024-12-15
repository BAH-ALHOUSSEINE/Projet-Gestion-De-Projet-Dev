const express = require('express');
const { register, login } = require('../controllers/authController.js');
const router = express.Router();

/**
 * Route for user registration.
 * @name post/register
 * @function
 * @memberof module:routes/authRouter
 * @inner
 * @param {string} path - Express path
 * @param {function} register - Controller function for user registration
 */

router.post('/register', register);

/**
 * Route for user login.
 * @name post/login
 * @function
 * @memberof module:routes/authRouter
 * @inner
 * @param {string} path - Express path
 * @param {function} login - Controller function for user login
 */
router.post('/login', login);

module.exports = router;
