const { authenticateUser } = require('../middleware/authomiddleware');
const Project = require('../models/Project');


const createProject = async (req, res) => {

  console.log("createProject in Back")
  try {
    // Récupération des données envoyées dans le body de la requête

    let { nom_projet, id_admin, type_projet, description_projet, date_debut, date_fin, membres, sprints } = req.body;

    // Validation des données (si nécessaire, tu peux ajouter plus de validations ici)
    if (!nom_projet || !id_admin || !type_projet || !description_projet || !date_debut || !date_fin || !membres) {
      return res.status(400).json({ message: "Tous les champs sont requis." });
    }

    //id_admin = authenticateUser(id_admin);
    
    // Création du projet avec les données reçues
    const newProject = new Project({
      nom_projet,
      id_admin,
      type_projet,
      description_projet,
      date_debut: new Date(date_debut),
      date_fin: new Date(date_fin),
      membres,
      sprints
    });

    // console.log(newProject)

    // Sauvegarde du projet dans la base de données
    await newProject.save();

    // Réponse avec les données du projet créé
    return res.status(201).json({
      message: "Projet créé avec succès.",
      projet: newProject
    });

  } catch (error) {
    // Gestion des erreurs
    console.error("Erreur lors de la création du projet:", error.stack);
    return res.status(500).json({ message: "Erreur serveur, impossible de créer le projet." });
  }
};

const addMember = async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId);
    project.membres.push(req.body.memberId);
    await project.save();
    res.json({ message: 'Membre ajouté au projet' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getUserProjects = async (req, res) => {
  console.log("getUserProject")
  try {

    // Décode le token de l'userId passé en paramètre de la requête
    const userId = authenticateUser(req.params.userId)
    
      
 
    // Récupérer les projets où l'utilisateur est soit administrateur, soit membre
    const projects = await Project.find({
      $or: [
        { id_admin: userId }, // L'utilisateur est l'administrateur du projet
        { membres: userId }    // L'utilisateur est membre du projet
      ]
    })
      // .populate('id_admin', 'nom prenom email') //permet de prendre les info lié à l'admin
      // .populate('membres', 'nom prenom email'); 
    
    console.log("proj : " + projects)
    // Retourner la réponse avec la liste des projets
    res.status(200).json(projects);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur lors de la récupération des projets.' });
  }
};

const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId).populate('membres', 'nom email');
    if (!project) {
      return res.status(404).json({ message: 'Projet introuvable.' });
    }
    res.status(200).json(project);
  } catch (error) {
    console.error('Erreur lors de la récupération du projet:', error);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};



module.exports = { createProject, addMember, getUserProjects, getProjectById };
