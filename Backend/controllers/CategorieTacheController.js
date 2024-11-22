const Project = require('../models/Project');

// Ajouter une catégorie de tâches à un sprint
exports.addCategorieToSprint = async (req, res) => {
  try {
    const { projetId,sprintId } = req.params;
    const { nom, taches } = req.body;

    console.log(sprintId);

    

    const projet = await Project.findById(projetId);
    if (!projet) {
      return res.status(404).json({ message: 'Projet non trouvé' });
    }

     const sprint = projet.sprints.id(sprintId);

     if (!sprint) {
      return res.status(404).json({ message: 'Sprint non trouvé' });
    }

    sprint.categorie_tache.push({ nom, taches });
    const updatedSprint = await projet.save();

    res.status(200).json(updatedSprint);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de l\'ajout de la catégorie', error });
  }
};