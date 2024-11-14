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
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ error: 'Identifiants invalides' });
    }
    
    //const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    //const decoded = jwt.verify(token, process.env.JWT_SECRET); // Vérifier et décoder le token
    //const user1 = await User.findById(decoded.id); // Récupérer l'utilisateur via l'ID dans le token
/*
    if (!user1) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
*/
    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { register, login };
