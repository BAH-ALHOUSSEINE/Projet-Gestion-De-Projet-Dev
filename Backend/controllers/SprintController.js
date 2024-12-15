const Project = require('../models/Project');
const Sprint = require('../models/Sprint');

/**
 * Créer un nouveau sprint
 * @async
 * @function createSprint
 * @param {Object} req - L'objet de requête HTTP
 * @param {Object} req.params - Les paramètres de la requête
 * @param {string} req.params.projetId - L'ID du projet
 * @param {Object} req.body - Le corps de la requête
 * @param {string} req.body.date_debut - La date de début du sprint
 * @param {string} req.body.date_fin - La date de fin du sprint
 * @param {string} req.body.status - Le statut du sprint
 * @param {string} req.body.categorie_tache - La catégorie de tâche du sprint
 * @param {Object} res - L'objet de réponse HTTP
 * @returns {Promise<void>} - Retourne une promesse qui se résout sans valeur
 * @throws {Error} - Lance une erreur si la création du sprint échoue
 */

exports.createSprint = async (req, res) => {
  console.log("Création d'un sprint côté serveur");
  const { projetId } = req.params;
  const { date_debut, date_fin, status, categorie_tache } = req.body;

  try {

    const project = await Project.findById(projetId);
    if (!project) {
      return res.status(404).json({ message: 'Projet introuvable' });
    }

    const newSprint = new Sprint ( {date_debut, date_fin, status, categorie_tache  });
    console.log("new sprint : ", newSprint);

    project.sprints = [...project.sprints, newSprint];

    await project.save();

    res.status(201).json({
      message: 'Sprint ajouté avec succès',
      sprint:newSprint
    });
    console.log("Création réussie");

  } catch (error) {
    console.error("Erreur lors de la création du sprint :", error);
    res.status(500).json({ message: 'Erreur lors de la création du sprint', error });
  }
};