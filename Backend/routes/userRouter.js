const express = require('express');
const router = express.Router();

const { getUserById } = require('../controllers/userController'); // Assurez-vous que le chemin est correct

// Route pour obtenir un utilisateur par ID
router.get('/:userId', getUserById);


module.exports = router;
