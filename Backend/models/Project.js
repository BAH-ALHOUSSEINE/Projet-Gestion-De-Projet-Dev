/**
 * @file Project.js
 * @description Mongoose schema for the Project model.
 */

const mongoose = require('mongoose');
const SprintSchema = require('../models/Sprint').schema;

/**
 * @typedef {Object} Project
 * @property {string} nom_projet - The name of the project.
 * @property {mongoose.Schema.Types.ObjectId} id_admin - The ID of the admin user, referenced from the User model.
 * @property {string} type_projet - The type of the project.
 * @property {string} description_projet - The description of the project.
 * @property {Date} date_debut - The start date of the project.
 * @property {Date} date_fin - The end date of the project.
 * @property {mongoose.Schema.Types.ObjectId[]} membres - An array of user IDs, referenced from the User model.
 * @property {Sprint[]} sprints - An array of sprints associated with the project.
 */

const ProjectSchema = new mongoose.Schema({
  nom_projet: String,
  id_admin: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  type_projet: String,
  description_projet: String,
  date_debut: Date,
  date_fin: Date,
  membres: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  sprints : [SprintSchema]
});

module.exports = mongoose.model('Project', ProjectSchema);