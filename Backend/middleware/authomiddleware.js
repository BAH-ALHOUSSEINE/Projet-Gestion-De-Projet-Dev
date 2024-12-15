
const jwt = require('jsonwebtoken');
const User = require('../models/User');
/**
 * Middleware to protect routes by verifying JWT token.
 * 
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {void}
 */
 
const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Accès non autorisé' });
    }
  }
  if (!token) {
    return res.status(401).json({ message: 'Accès non autorisé, aucun token fourni' });
  }
};


/**
 * Function to authenticate a user using a JWT token.
 * 
 * @param {string} token - JWT token.
 * @returns {string} - Decoded user ID.
 */
function authenticateUser (token ) {
  // Décoder et vérifier le token
  const decoded = jwt.verify(token, '777');
  const userId = decoded._id;
  return userId;
};

module.exports = { protect, authenticateUser };
