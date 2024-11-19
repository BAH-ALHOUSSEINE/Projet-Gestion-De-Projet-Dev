const mongoose = require('mongoose');
const CategorieTacheSchema = require('../models/CategorieTache').schema;

const SprintSchema = new mongoose.Schema({
  date_debut: { type: Date, required: true },
  date_fin: { type: Date, required: true },
  status: { type: String, enum: ['en_attente', 'en_cours', 'terminé'], default: 'en_attente' },
  categorie_tache: [CategorieTacheSchema] // Liste des catégories associées à ce sprint
});

module.exports = mongoose.model('Sprint', SprintSchema);
