const Projet = require('../models/Project');
const mongoose = require('mongoose');




/**
 * Ajouter une tâche à une catégorie de tâches dans un sprint
 * @async
 * @function addTacheToCategorie
 * @param {Object} req - L'objet de requête HTTP
 * @param {Object} req.params - Les paramètres de la requête
 * @param {string} req.params.projetId - L'ID du projet
 * @param {string} req.params.sprintId - L'ID du sprint
 * @param {string} req.params.categorieId - L'ID de la catégorie de tâches
 * @param {Object} req.body - Le corps de la requête
 * @param {string} req.body.date_echeance - La date d'échéance de la tâche
 * @param {string} req.body.description - La description de la tâche
 * @param {string} req.body.id_membre - L'ID du membre assigné à la tâche
 * @param {string} req.body.status - Le statut de la tâche
 * @param {string} req.body.priorite - La priorité de la tâche
 * @param {Object} res - L'objet de réponse HTTP
 * @returns {Promise<void>}
 */
exports.addTacheToCategorie = async (req, res) => {
  try {
    const { projetId, sprintId, categorieId } = req.params;
    const { date_echeance, description, id_membre, status, priorite } = req.body;

    // Vérification des données d'entrée
    if (!date_echeance || !description || !status || !priorite) {
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

   
    const nouvelleTache = {
      _id: new mongoose.Types.ObjectId(),
      date_echeance,
      description,
      id_membre,
      status,
      priorite
    };
        categorie.taches.push(nouvelleTache);

    // Sauvegarder les modifications dans le projet
    await projet.save();
    console.log("creation réussie")
    // Retourner la réponse avec les données mises à jour
    res.status(200).json({ message: 'Tâche ajoutée avec succès', nouvelleTache });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de l\'ajout de la tâche', error: error.message });
  }
};



/**
 * Mettre à jour une tâche dans une catégorie de tâches dans un sprint
 * @async
 * @function updateTache
 * @param {Object} req - L'objet de requête HTTP
 * @param {Object} req.params - Les paramètres de la requête
 * @param {string} req.params.projetId - L'ID du projet
 * @param {string} req.params.sprintId - L'ID du sprint
 * @param {string} req.params.categorieId - L'ID de la catégorie de tâches
 * @param {string} req.params.tacheId - L'ID de la tâche
 * @param {Object} req.body - Le corps de la requête
 * @param {string} [req.body.date_echeance] - La date d'échéance de la tâche
 * @param {string} [req.body.description] - La description de la tâche
 * @param {string} [req.body.membre] - L'ID du membre assigné à la tâche
 * @param {string} [req.body.status] - Le statut de la tâche
 * @param {string} [req.body.priorite] - La priorité de la tâche
 * @param {Object} res - L'objet de réponse HTTP
 * @returns {Promise<void>}
 */
exports.updateTache = async (req, res) => {
  try {
    const { projetId, sprintId, categorieId, tacheId } = req.params;
    const { date_echeance, description, membre, status, priorite } = req.body;

    // Vérification des données d'entrée
    if (!date_echeance && !description && !status && !priorite) {
      return res.status(400).json({ message: 'Au moins un champ doit être renseigné pour la modification' });
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

    // Recherche de la tâche dans la catégorie
    const tache = categorie.taches.id(tacheId);
    if (!tache) {
      return res.status(404).json({ message: 'Tâche non trouvée' });
    }




    // Mise à jour des champs de la tâche (seulement les champs fournis)
    if (date_echeance) tache.date_echeance = date_echeance;
    if (description) tache.description = description;
   // Logique pour le membre : Si 'Aucun', supprimer le membre, sinon affecter l'id_membre
   if (membre === 'Aucun') {
    tache.id_membre = undefined;  // Supprimer le membre
  } else if (membre) {
    tache.id_membre = membre;  // Affecter l'ID du membre
  }    if (status) tache.status = status;
    if (priorite) tache.priorite = priorite;

    // Sauvegarder les modifications dans le projet
    await projet.save();

    // Retourner la réponse avec la tâche mise à jour
    res.status(200).json({ message: 'Tâche mise à jour avec succès', tache });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour de la tâche', error: error.message });
  }
};

/**
 * Supprimer une tâche d'une catégorie de tâches dans un sprint
 * @async
 * @function deleteTache
 * @param {Object} req - L'objet de requête HTTP
 * @param {Object} req.params - Les paramètres de la requête
 * @param {string} req.params.projetId - L'ID du projet
 * @param {string} req.params.sprintId - L'ID du sprint
 * @param {string} req.params.categorieId - L'ID de la catégorie de tâches
 * @param {string} req.params.tacheId - L'ID de la tâche
 * @param {Object} res - L'objet de réponse HTTP
 * @returns {Promise<void>}
 */

exports.deleteTache = async (req, res) => {
  try {
    console.log("Suppression d'une tâche")
    const { projetId, sprintId, categorieId, tacheId } = req.params;

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

    // Recherche de la tâche dans la catégorie
    const tache = categorie.taches.id(tacheId);
    if (!tache) {
      return res.status(404).json({ message: 'Tâche non trouvée' });
    }
    const tacheIndex = categorie.taches.findIndex(t => t._id.toString() === tacheId);
    if (tacheIndex === -1) {
      return res.status(404).json({ message: 'Tâche non trouvée' });
    }

    // Suppression de la tâche
    categorie.taches.splice(tacheIndex, 1);

    // Sauvegarder les modifications dans le projet
    await projet.save();

    // Retourner la réponse avec succès
    res.status(200).json({ message: 'Tâche supprimée avec succès' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la suppression de la tâche', error: error.message });
  }
};

