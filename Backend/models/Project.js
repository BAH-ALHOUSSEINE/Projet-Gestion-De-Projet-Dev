const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  nom_projet: String,
  id_admin: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  type_projet: String,
  description_projet: String,
  date_debut: Date,
  date_fin: Date,
  membres: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

module.exports = mongoose.model('Project', ProjectSchema);
