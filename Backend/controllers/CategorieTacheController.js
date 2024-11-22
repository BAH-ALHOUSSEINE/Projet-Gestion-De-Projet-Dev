const Sprint = require('../models/Sprint');

// Ajouter une catégorie de tâches à un sprint
exports.addCategorieToSprint = async (req, res) => {
  try {
    const { sprintId } = req.params;
    const { nom, taches } = req.body;

    console.log(sprintId);

    const sprint = await Sprint.findById(sprintId);
    if (!sprint) {
      return res.status(404).json({ message: 'Sprint non trouvé' });
    }

    // Ajouter une nouvelle catégorie
    sprint.categorie_tache.push({ nom, taches });
    const updatedSprint = await sprint.save();

    res.status(200).json(updatedSprint);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de l\'ajout de la catégorie', error });
  }
};