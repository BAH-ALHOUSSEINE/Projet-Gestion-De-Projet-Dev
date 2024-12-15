const User = require('../models/User'); // Assurez-vous que le chemin vers le modèle User est correct


/**
 * Get a user by ID.
 *
 * @param {Object} req - The request object.
 * @param {Object} req.params - The request parameters.
 * @param {string} req.params.userId - The ID of the user to retrieve.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves to void.
 */
exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Recherche de l'utilisateur par son ID
    const user = await User.findById(userId).select('-password'); // Sélectionne tous les champs sauf le mot de passe

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    // Retourner l'utilisateur trouvé
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};
