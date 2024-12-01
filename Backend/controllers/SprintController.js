const Project = require('../models/Project');
const User = require('../models/User');
const mongoose = require('mongoose');

// Créer un nouveau sprint
exports.createSprint = async (req, res) => {
  console.log("Création d'un sprint côté serveur");
  const { projetId } = req.params;
  const { date_debut, date_fin, status, categorie_tache } = req.body;

  try {

    const project = await Project.findById(projetId);
    if (!project) {
      return res.status(404).json({ message: 'Projet introuvable' });
    }

    const newSprint = { date_debut, date_fin, status, categorie_tache };
    console.log("new sprint : ", newSprint);

    project.sprints = [...project.sprints, newSprint];

    // console.log("Avant sauvegarde :", project);
    await project.save();
    // console.log("Après sauvegarde :", project);

    res.status(201).json({
      message: 'Sprint ajouté avec succès',
      sprint: newSprint,
    });
    console.log("Création réussie");
  } catch (error) {
    console.error("Erreur lors de la création du sprint :", error);
    res.status(500).json({ message: 'Erreur lors de la création du sprint', error });
  }
};