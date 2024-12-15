/**
 * Task Schema for MongoDB using Mongoose.
 * Represents a task with a description, member ID, due date, status, and priority.
 * 
 * @typedef {Object} Task
 * @property {string} description - The description of the task.
 * @property {mongoose.Schema.Types.ObjectId} id_membre - The ID of the member assigned to the task, references the User model.
 * @property {Date} date_echeance - The due date of the task.
 * @property {string} status - The status of the task, can be 'A faire', 'en cours', or 'terminé'. Default is 'À faire'.
 * @property {string} priorite - The priority of the task, can be 'Base', 'Moyenne', or 'Haute'.
 */
const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  description: String,
  id_membre: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date_echeance: Date,
  status: { type: String, enum: ['A faire', 'en cours', 'terminé'], default: 'À faire' },
  priorite: { type: String, enum: ['Base', 'Moyenne', 'Haute'] }
});

module.exports = mongoose.model('Task', TaskSchema);
