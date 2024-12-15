const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const Project = require('../../models/Project');
const Sprint = require('../../models/Sprint'); // Adjust the path as necessary
const SprintController = require('../../controllers/SprintController'); // Adjust the path as necessary

const app = express();
app.use(express.json());
app.post('/projects/:projetId/sprints', SprintController.createSprint);

describe('Sprint Model Controller Test', () => {
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

    it('should create a sprint with valid data', async () => {
        const validSprint = new Sprint({
            date_debut: new Date(),
            date_fin: new Date(),
            status: 'en attente',
            categorie_tache: [],
        });

        const savedSprint = await validSprint.save();
        expect(savedSprint._id).toBeDefined();
        expect(savedSprint.status).toBe('en attente');
    });

    it('should fail to create a sprint without required fields', async () => {
        const invalidSprint = new Sprint({});

        let err;
        try {
            await invalidSprint.save();
        } catch (error) {
            err = error;
        }
        expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
        expect(err.errors.date_debut).toBeDefined();
        expect(err.errors.date_fin).toBeDefined();
    });

    it('should fail to create a sprint with invalid status', async () => {
        const invalidSprint = new Sprint({
            date_debut: new Date(),
            date_fin: new Date(),
            status: 'invalid_status',
            categorie_tache: [],
        });

        let err;
        try {
            await invalidSprint.save();
        } catch (error) {
            err = error;
        }
        expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
        expect(err.errors.status).toBeDefined();
    });

    it('should create a new sprint', async () => {
        const project = new Project({ name: 'Test Project', sprints: [] });
        await project.save();

        const response = await request(app)
            .post(`/projects/${project._id}/sprints`)
            .send({
                date_debut: new Date(),
                date_fin: new Date(),
                status: 'en attente',
                categorie_tache: [],
            });

        expect(response.status).toBe(201);
        expect(response.body.message).toBe('Sprint ajouté avec succès');
        expect(response.body.sprint).toBeDefined();
        expect(response.body.sprint.status).toBe('en attente');
    });

    it('should return 404 if project is not found', async () => {
        const nonExistentProjectId = new mongoose.Types.ObjectId();

        const response = await request(app)
            .post(`/projects/${nonExistentProjectId}/sprints`)
            .send({
                date_debut: new Date(),
                date_fin: new Date(),
                status: 'en attente',
                categorie_tache: [],
            });

        expect(response.status).toBe(404);
        expect(response.body.message).toBe('Projet introuvable');
    });
});