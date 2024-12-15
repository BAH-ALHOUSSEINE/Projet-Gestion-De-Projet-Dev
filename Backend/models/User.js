/**
 * @file User.js
 * @description Mongoose schema and model for User.
 */

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

/**
 * User Schema
 * @typedef {Object} User
 * @property {String} nom - The last name of the user.
 * @property {String} prenom - The first name of the user.
 * @property {String} email - The email of the user, must be unique.
 * @property {String} password - The hashed password of the user.
 * @property {Array<ObjectId>} projects - The list of project IDs associated with the user.
 */

const UserSchema = new mongoose.Schema({
  nom: String,
  prenom: String,
  email: { type: String, unique: true },
  password: String,
  projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
});

/**
 * Pre-save hook to hash the password before saving the user document.
 * @function
 * @param {Function} next - The next middleware function in the stack.
 */
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

/**
 * Method to compare entered password with the hashed password.
 * @function
 * @param {String} enteredPassword - The password entered by the user.
 * @returns {Promise<Boolean>} - Returns true if the passwords match, otherwise false.
 */
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
