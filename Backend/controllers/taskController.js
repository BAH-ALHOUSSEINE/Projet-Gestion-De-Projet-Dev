const Sprint = require('../models/Sprint');

// Ajouter une tâche à une catégorie de tâches dans un sprint
exports.addTacheToCategorie = async (req, res) => {
  try {
    const { sprintId, categorieId } = req.params;
    const { date_echeance ,description_tache,id_membre, status, priorite } = req.body;

    const sprint = await Sprint.findById(sprintId);
    if (!sprint) {
      return res.status(404).json({ message: 'Sprint non trouvé' });
    }

    // Trouver la catégorie
    const categorie = sprint.categorie_tache.id(categorieId);
    if (!categorie) {
      return res.status(404).json({ message: 'Catégorie non trouvée' });
    }

    // Ajouter une nouvelle tâche
    categorie.taches.push({ date_echeance, description_tache, id_membre, status, priorite });
    const updatedSprint = await sprint.save();

    res.status(200).json(updatedSprint);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de l\'ajout de la tâche', error });
  }
};
