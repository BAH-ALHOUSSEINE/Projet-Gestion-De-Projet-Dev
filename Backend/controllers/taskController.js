const Task = require('../models/Task');

const createTask = async (req, res) => {
  try {
    const task = new Task({ ...req.body, id_projet: req.params.projectId });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createTask };
