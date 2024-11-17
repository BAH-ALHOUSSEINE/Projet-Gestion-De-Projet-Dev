const Project = require('../models/Project');

const createProject = async (req, res) => {
  try {
    const project = new Project({ ...req.body, id_admin: req.user.id });
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProjects = async (req, res) => {
  try {
    const projets = await Projet.find({ id_admin: req.user.id }); // Filtre les projets par l'ID de l'utilisateur connecté
    res.json(projets);
  } catch (error) {
    res.status(500).json({ message: error.message });
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

module.exports = { createProject, addMember, getProjects };
