const Project = require('../models/Project');

// Créer un nouveau sprint
exports.createSprint = async (req, res) => {
  const { projetId } = req.params;
  const { date_debut, date_fin, status,categorie_tache } = req.body;

  try {
    const project = await Project.findById(projetId);
    if (!project) {
      return res.status(404).json({ message: 'Projet introuvable' });
    }

    const newSprint = {
      date_debut,
      date_fin,
      status,
      categorie_tache // Catégories et tâches associées
    };

    // Ajouter le sprint au projet
    project.sprints.push(newSprint);
    await project.save();
    res.status(201).json({
      message: 'Sprint ajouté avec succès',
      sprint: newSprint,
    });  
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création du sprint', error });
  }
};