const Sprint = require('../models/Sprint');

// Créer un nouveau sprint
exports.createSprint = async (req, res) => {
  try {
    const { date_debut, date_fin, status, categorie_tache } = req.body;

    const newSprint = new Sprint({
      date_debut,
      date_fin,
      status,
      categorie_tache // Catégories et tâches associées
    });

    const savedSprint = await newSprint.save();
    res.status(201).json(savedSprint);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création du sprint', error });
  }
};