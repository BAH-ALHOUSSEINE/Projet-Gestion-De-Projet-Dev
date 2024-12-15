/**
 * @file CategorieTache.js
 * @description Mongoose model for the CategorieTache collection, representing a category of tasks.
 */

const mongoose = require('mongoose');
const TacheSchema = require('../models/Task').schema;

/**
 * @typedef {Object} CategorieTache
 * @property {String} nom - The name of the category.
 * @property {Array.<Tache>} taches - List of tasks associated with this category.
 */

const CategorieTacheSchema = new mongoose.Schema({
  nom: { type: String },
  taches: [TacheSchema] // Liste des tâches associées à cette catégorie
});

module.exports = mongoose.model('CategorieTache', CategorieTacheSchema);