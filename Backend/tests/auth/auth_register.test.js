// register.test.js
const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const { register } = require('../../controllers/authController'); // Assurez-vous d'importer votre fonction correctement
const User = require('../../models/User'); // Assurez-vous d'importer le modèle User

// Créer une instance d'application Express
const app = express();
app.use(express.json()); // Pour que express puisse parser le JSON
app.post('/register', register); // Lier la route d'enregistrement à la fonction

// Mock de User.save() pour éviter de toucher à la base de données
jest.mock('../../models/User');

describe('POST /register', () => {

    //it() : C'est une fonction de Jest qui définit un test. Le premier argument est une description de ce que le test est censé vérifier, et le second est une fonction qui contient le test lui-même.
    it('devrait enregistrer un utilisateur et renvoyer un message de succès', async () => {
        //méthode save() de User doit renvoyer une promesse réussie
        User.mockImplementationOnce(() => {
            return { save: jest.fn().mockResolvedValue(true) }; // Simule un enregistrement réussi
        });

        const response = await request(app)
            .post('/register')
            .send({
                nom: 'Doe',
                prenom: 'John',
                email: 'john.doe@example.com',
                password: 'password123',
            });

        expect(response.status).toBe(201);
        expect(response.body.message).toBe('Utilisateur créé avec succès');
    });

    it('devrait renvoyer une erreur en cas d\'échec de l\'enregistrement', async () => {
        // Mock de l'instance de User.save() qui échoue
        User.mockImplementationOnce(() => {
            return { save: jest.fn().mockRejectedValue(new Error('Erreur lors de la création de l\'utilisateur')) };
        });

        const response = await request(app)
            .post('/register')
            .send({
                nom: 'Doe',
                prenom: 'Jane',
                email: 'jane.doe@example.com',
                password: 'password123',
            });

        expect(response.status).toBe(500);
        expect(response.body.error).toBe('Erreur lors de la création de l\'utilisateur');
    });

    it('devrait renvoyer une erreur si l\'email est déjà utilisé', async () => {
        // Mock de findOne pour simuler un utilisateur déjà existant
        User.findOne = jest.fn().mockResolvedValue(true); // Simule que l'email existe déjà

        // Envoie une requête d'inscription avec un email déjà pris
        const response = await request(app)
            .post('/register')
            .send({
                nom: 'Yli',
                prenom: 'Villot',
                email: 'john.doe@example.com',  // Email qui existe déjà
                password: 'password123',
            });

        // Vérifie que la réponse retourne bien une erreur avec un statut 400
        expect(response.status).toBe(400);
    });

    // Test si les champs requis sont manquants
    it('devrait renvoyer une erreur si un champ requis est manquant', async () => {
        const response = await request(app)
            .post('/register')
            .send({
                nom: 'Doe',
                prenom: 'John',
                email: 'john.doe@example.com',
                // Le champ password est manquant
            });

        expect(response.status).toBe(400); });

});