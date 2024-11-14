const User = require('../models/User');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  try {
    const { nom, prenom, email, password } = req.body;

    // Vérifie si tous les champs sont présents
    if (!nom || !prenom || !email || !password) {
      return res.status(400).json({ error: 'Tous les champs sont requis' });
    }

    // Vérifie si l'adresse email existe déjà dans la bdd
    const existing_mail = await User.findOne({ email });
    if (existing_mail) {
      return res.status(400).json({ error: 'L\'email est déjà utilisé' }); // Email déjà pris
    }

    const user = new User({ nom, prenom, email, password });
    await user.save();
    res.status(201).json({ message: 'Utilisateur créé avec succès' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Identifiants invalides' });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { register, login };
