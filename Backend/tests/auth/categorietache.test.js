const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const Project = require('../../models/Project');
const Sprint = require('../../models/Sprint');
const CategorieTacheController = require('../../controllers/CategorieTacheController'); // Adjust the path as necessary

const app = express();
app.use(express.json());
app.post('/projects/:projetId/sprints/:sprintId/categories', CategorieTacheController.addCategorieToSprint);

describe('CategorieTacheController', () => {
    // Connect to the MongoDB Memory Server before running tests
    beforeAll(async () => {
        const URI = process.env.MONGO_URI || 'mongodb://localhost:27017/testdb';
        await mongoose.connect(URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    });

    // Disconnect from the MongoDB Memory Server after running tests
    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('should add a new category to a sprint', async () => {
        const project = new Project({ name: 'Test Project', sprints: [] });
        const sprint = new Sprint({ date_debut: new Date(), date_fin: new Date(), status: 'en attente', categorie_tache: [] });
        project.sprints.push(sprint);
        await project.save();

        const response = await request(app)
            .post(`/projects/${project._id}/sprints/${sprint._id}/categories`)
            .send({
                nom: 'New Category',
                taches: [],
            });

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Catégorie ajoutée avec succès');
        expect(response.body.categorie).toBeDefined();


        // Verify that the category was added to the sprint
        const updatedProject = await Project.findById(project._id);
        const updatedSprint = updatedProject.sprints.id(sprint._id);
        expect(updatedSprint.categorie_tache).toHaveLength(1);
        expect(updatedSprint.categorie_tache[0].nom).toBe('New Category');
    });

    it('should return 500 if there is a server error', async () => {
        const project = new Project({ name: 'Test Project', sprints: [] });
        const sprint = new Sprint({ date_debut: new Date(), date_fin: new Date(), status: 'en attente', categorie_tache: [] });
        project.sprints.push(sprint);
        await project.save();

        // Simulate a server error by sending an invalid request
        const response = await request(app)
            .post(`/projects/${project._id}/sprints/${sprint._id}/categories`)
            .send({
                nom: null, // Invalid data to trigger an error
                taches: [],
            });

        expect(response.status).toBe(500);
        expect(response.body.message).toBe('Erreur serveur lors de l\'ajout de la catégorie');
    });
});