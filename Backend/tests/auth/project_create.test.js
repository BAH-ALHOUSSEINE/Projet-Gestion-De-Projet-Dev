const request = require('supertest');
const express = require('express');
const { createProject } = require('../../controllers/projetController');
const Project = require('../../models/Project');

const app = express();
app.use(express.json());
app.post('/', createProject);

jest.mock('../../models/Project');

describe('POST /', () => {
  it('crée un projet avec succès', async () => {
    const mockProject = {
      _id: '64cbd3f5e2314f1234567890',
      nom_projet: 'Projet Test',
      id_admin: '64cbd3f5e2314f1234567891',
      type_projet: 'Développement',
      description_projet: 'Description du projet',
      date_debut: '2024-01-01T00:00:00.000Z',
      date_fin: '2024-12-31T00:00:00.000Z',
      membres: ['64cbd3f5e2314f1234567891'],
    };

    Project.mockImplementation(() => ({
      save: jest.fn().mockResolvedValue(mockProject),
    }));

    const res = await request(app)
      .post('/')
      .send({
        nom_projet: 'Projet Test',
        type_projet: 'Développement',
        description_projet: 'Description du projet',
        date_debut: '2024-01-01',
        date_fin: '2024-12-31',
      });

    expect(res.status).toBe(201);
    expect(res.body).toEqual(expect.objectContaining(mockProject));
  });
});
