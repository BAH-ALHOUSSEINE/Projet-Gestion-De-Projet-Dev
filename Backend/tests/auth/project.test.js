const request = require('supertest');
const express = require('express');
const { 
  createProject, 
  getUserProjects, 
  getProjectById, 
  deleteprojet 
} = require('../../controllers/projetController');
const Project = require('../../models/Project');
const { authenticateUser } = require('../../middleware/authomiddleware');

// Create Express app
const app = express();
app.use(express.json());

// Mock dependencies
jest.mock('../../models/Project');
jest.mock('../../models/User');
jest.mock('../../middleware/authomiddleware');

describe('Project Controller', () => {
  // Setup mock data before tests
  const mockUserId = '60d5ecb8b3b3a83f5c7a4f1a';
  const mockProjectId = '60d5ecb8b3b3a83f5c7a4f1b';
  const mockProject = {
    _id: mockProjectId,
    nom_projet: 'Test Project',
    id_admin: mockUserId,
    type_projet: 'Development',
    description_projet: 'A test project',
    date_debut: new Date(),
    date_fin: new Date(),
    membres: [mockUserId],
    sprints: []
  };

  // Reset mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // createProject tests
  describe('POST /create-project', () => {
    app.post('/create-project', createProject);

    it('should successfully create a project', async () => {
      // Mock authentication
      authenticateUser.mockReturnValue(mockUserId);

      // Mock Project.save
      Project.mockImplementationOnce(() => ({
        save: jest.fn().mockResolvedValue(mockProject)
      }));

      const response = await request(app)
        .post('/create-project')
        .send({
          nom_projet: 'Test Project',
          id_admin: mockUserId,
          type_projet: 'Development',
          description_projet: 'A test project',
          date_debut: new Date().toISOString(),
          date_fin: new Date().toISOString(),
          membres: [mockUserId]
        });

      expect(response.status).toBe(201);
      expect(response.body.message).toBe('Projet créé avec succès.');
      expect(response.body.projet).toBeDefined();
    });

    it('should return an error if required fields are missing', async () => {
      const response = await request(app)
        .post('/create-project')
        .send({
          nom_projet: 'Incomplete Project'
          // Missing other required fields
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Tous les champs sont requis.');
    });
  });

  // getUserProjects tests
  describe('GET /user-projects/:userId', () => {
    app.get('/user-projects/:userId', getUserProjects);

    it('should retrieve user projects', async () => {
      // Mock authentication
      authenticateUser.mockReturnValue(mockUserId);

      // Modify Project.find to return a resolved promise with an array
      Project.find = jest.fn().mockImplementation(() => ({
        populate: jest.fn().mockImplementation(() => ({
          populate: jest.fn().mockResolvedValue([mockProject])
        }))
      }));

      const response = await request(app)
        .get(`/user-projects/${mockUserId}`);

      expect(response.status).toBe(200);
      expect(response.body.length).toBeGreaterThan(0);
    });

    it('should handle errors when retrieving projects', async () => {
      // Mock authentication
      authenticateUser.mockReturnValue(mockUserId);

      // Modify Project.find to simulate an error
      Project.find = jest.fn().mockImplementation(() => ({
        populate: jest.fn().mockImplementation(() => ({
          populate: jest.fn().mockRejectedValue(new Error('Database error'))
        }))
      }));

      const response = await request(app)
        .get(`/user-projects/${mockUserId}`);

      expect(response.status).toBe(500);
      expect(response.body.message).toBe('Erreur lors de la récupération des projets.');
    });
  });

  // getProjectById tests
  describe('GET /project/:projectId', () => {
    app.get('/project/:projectId', getProjectById);

    it('should retrieve a specific project by ID', async () => {
      // Mock Project.findById to return a resolved promise with an object that has a populate method
      Project.findById = jest.fn().mockImplementation(() => ({
        populate: jest.fn().mockImplementation(() => ({
          populate: jest.fn().mockResolvedValue(mockProject)
        }))
      }));

      const response = await request(app)
        .get(`/project/${mockProjectId}`);

      expect(response.status).toBe(200);
      expect(response.body.nom_projet).toBe('Test Project');
    });

    it('should return 404 if project is not found', async () => {
      // Mock Project.findById to return a resolved promise with null
      Project.findById = jest.fn().mockImplementation(() => ({
        populate: jest.fn().mockImplementation(() => ({
          populate: jest.fn().mockResolvedValue(null)
        }))
      }));

      const response = await request(app)
        .get(`/project/${mockProjectId}`);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Projet introuvable.');
    });
  });

  // deleteprojet tests
  describe('DELETE /project/:projectId', () => {
    app.delete('/project/:projectId', deleteprojet);

    it('should successfully delete a project', async () => {
      // Mock finding the project first
      Project.findById.mockResolvedValue(mockProject);

      // Mock project deletion
      mockProject.deleteOne = jest.fn().mockResolvedValue({});

      const response = await request(app)
        .delete(`/project/${mockProjectId}`);

      expect(response.status).toBe(200);
      expect(response.body._id).toBe(mockProjectId);
    });

    it('should return 404 if project to delete is not found', async () => {
      // Mock Project.findById to return null
      Project.findById.mockResolvedValue(null);

      const response = await request(app)
        .delete(`/project/${mockProjectId}`);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Projet introuvable');
    });
  });
});