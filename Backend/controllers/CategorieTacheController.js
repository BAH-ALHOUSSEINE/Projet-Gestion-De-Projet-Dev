const Project = require('../models/Project');
const CategorieTache = require('../models/CategorieTache')

  /**
     * Creates a new instance of CategorieTache.
     *
     * @param {Object} nouvelleCategorie - The new category object.
     * @param {string} nouvelleCategorie.nom - The name of the category.
     * @param {Array} nouvelleCategorie.taches - The tasks associated with the category.
     */

exports.addCategorieToSprint = async (req, res) => {
  try {
    const { projetId, sprintId } = req.params; // Extraire les paramètres
    const { nom, taches = [] } = req.body; // Assurer une valeur par défaut pour 'taches'

    // Récupérer le projet
    const projet = await Project.findById(projetId);
    if (!projet) {
      return res.status(404).json({ message: 'Projet non trouvé' });
    }

    // Récupérer le sprint dans le projet
    const sprint = projet.sprints.id(sprintId);
    if (!sprint) {
      return res.status(404).json({ message: 'Sprint non trouvé' });
    }

    if(!nom){
      throw new Error('Le nom de la catégorie est requis');
    }
    
    // Créer une nouvelle catégorie
    const nouvelleCategorie = new CategorieTache({
      nom,
      taches,
    });

    // Ajouter la catégorie au sprint
    sprint.categorie_tache.push(nouvelleCategorie);

    // Sauvegarder le projet avec les modifications (y compris la nouvelle catégorie)
    await projet.save();

    // Retourner la catégorie nouvellement créée
    res.status(200).json({
     message:'Catégorie ajoutée avec succès', // Retourne l'objet CategorieTache complet
     categorie: nouvelleCategorie
    });
  } catch (error) {
    console.error('Erreur lors de l\'ajout de la catégorie:', error);
    res.status(500).json({ message: 'Erreur serveur lors de l\'ajout de la catégorie', error });
  }
};
