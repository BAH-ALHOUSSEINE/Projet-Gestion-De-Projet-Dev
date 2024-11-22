const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  description_tache: String,
  id_membre: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date_echeance: Date,
  status: { type: String, enum: ['À faire', 'En cours', 'Terminé'], default: 'À faire' },
  priorite: { type: String, enum: ['Basse', 'Moyenne', 'Haute'] }
});

module.exports = mongoose.model('Task', TaskSchema);
