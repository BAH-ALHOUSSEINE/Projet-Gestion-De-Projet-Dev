const User = require('../models/User');
const jwt = require('jsonwebtoken');

/**
 * Registers a new user.
 *
 * @param {Object} req - The request object.
 * @param {Object} req.body - The body of the request.
 * @param {string} req.body.nom - The last name of the user.
 * @param {string} req.body.prenom - The first name of the user.
 * @param {string} req.body.email - The email of the user.
 * @param {string} req.body.password - The password of the user.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the user is registered.
 */
const register = async (req, res) => {
  try {
    const { nom, prenom, email, password } = req.body;

    // Vérifie si tous les champs sont présents
   

    // Vérifie si l'adresse email existe déjà dans la bdd
    const existing_mail = await User.findOne({ email });
    if (existing_mail) {
      return res.status(400).json({ error: 'L\'email est déjà utilisé Veuillez choisir un autre email ' }); // Email déjà pris
    }

    const user = new User({ nom, prenom, email, password });
    await user.save();
    res.status(201).json({ message: 'Utilisateur créé avec succès' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



/**
 * Handles user login.
 *
 * @param {Object} req - The request object.
 * @param {Object} req.body - The body of the request.
 * @param {string} req.body.email - The email of the user.
 * @param {string} req.body.password - The password of the user.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves to void.
 *
 * @throws {Error} - If there is an error during the login process.
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Recherche de l'utilisateur par email
    const user = await User.findOne({ email });

    // Vérification de l'existence de l'utilisateur et du mot de passe
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ error: 'Identifiants invalides' });
    }

    // Génération du token
    const token = jwt.sign({ _id: user._id }, '777', { expiresIn: '1h' }); // Expires dans 1 heure

    // Retourner le token et l'ID de l'utilisateur
    res.json({ token, userId: user._id });
  } catch (error) {
    // Gestion des erreurs
    console.error("Erreur lors de la connexion :", error);
    res.status(500).json({ error: error.message });
  }
};


module.exports = { register, login };
