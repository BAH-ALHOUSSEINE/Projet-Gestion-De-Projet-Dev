/**
 * @file Sprint.js
 * @description Mongoose model for the Sprint collection.
 */

const mongoose = require('mongoose');
const CategorieTacheSchema = require('./CategorieTache').schema;

/**
 * @typedef {Object} Sprint
 * @property {Date} date_debut - The start date of the sprint.
 * @property {Date} date_fin - The end date of the sprint.
 * @property {string} status - The status of the sprint. Can be 'en attente', 'en cours', 'terminé', 'en_attente', or 'en_cours'.
 * @property {CategorieTache[]} categorie_tache - List of task categories associated with this sprint.
 */

const SprintSchema = new mongoose.Schema({
  date_debut: { type: Date, required: true },
  date_fin: { type: Date, required: true },
  status: { type: String, enum: ['en attente', 'en cours', 'terminé', "en_attente", "en_cours"], default: 'en attente' },
  categorie_tache: [CategorieTacheSchema] // Liste des catégories associées à ce sprint
});

module.exports = mongoose.model('Sprint', SprintSchema);