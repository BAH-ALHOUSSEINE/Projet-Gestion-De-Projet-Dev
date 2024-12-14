const mongoose = require('mongoose');
const TacheSchema = require('../models/Task').schema;

const CategorieTacheSchema = new mongoose.Schema({
  nom: { type: String },
  taches: [TacheSchema] // Liste des tâches associées à cette catégorie
});

module.exports = mongoose.model('CategorieTache', CategorieTacheSchema);