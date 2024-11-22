const Projet = require('../models/Project');

// Ajouter une tâche à une catégorie de tâches dans un sprint
exports.addTacheToCategorie = async (req, res) => {
  try {
    const { projetId, sprintId, categorieId } = req.params;
    const { date_echeance, description_tache, id_membre, status, priorite } = req.body;

    // Vérification des données d'entrée
    if (!date_echeance || !description_tache || !id_membre || !status || !priorite) {
      return res.status(400).json({ message: 'Tous les champs doivent être renseignés' });
    }

    // Recherche du projet
    const projet = await Projet.findById(projetId);
    if (!projet) {
      return res.status(404).json({ message: 'Projet non trouvé' });
    }

    // Recherche du sprint dans le projet
    const sprint = projet.sprints.id(sprintId);
    if (!sprint) {
      return res.status(404).json({ message: 'Sprint non trouvé' });
    }

    // Recherche de la catégorie dans le sprint
    const categorie = sprint.categorie_tache.id(categorieId);
    if (!categorie) {
      return res.status(404).json({ message: 'Catégorie non trouvée' });
    }

    // Ajouter la nouvelle tâche à la catégorie
    const nouvelleTache = { date_echeance, description_tache, id_membre, status, priorite };
    categorie.taches.push(nouvelleTache);

    // Sauvegarder les modifications dans le projet
    const updatedProjet = await projet.save();

    // Retourner la réponse avec les données mises à jour
    res.status(200).json({ message: 'Tâche ajoutée avec succès', updatedProjet });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de l\'ajout de la tâche', error: error.message });
  }
};

