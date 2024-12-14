const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  description: String,
  id_membre: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date_echeance: Date,
  status: { type: String, enum: ['A faire', 'en cours', 'terminé'], default: 'À faire' },
  priorite: { type: String, enum: ['Base', 'Moyenne', 'Haute'] }
});

module.exports = mongoose.model('Task', TaskSchema);
