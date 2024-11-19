const User = require('../models/User');
const jwt = require('jsonwebtoken');

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

const login = async (req, res) => {
  console.log("test console log login")
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ error: 'Identifiants invalides' });
    }
    const token = jwt.sign({ _id: user._id }, '777', { expiresIn: '1h' }); // Expires dans 1 heure
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = { register, login };
