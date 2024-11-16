import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProjetService } from './projet.service';
import { Projet } from '../models/projet';

describe('ProjetService', () => {
  let service: ProjetService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProjetService]
    });

    service = TestBed.inject(ProjetService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Vérifie qu'aucune requête HTTP n'est en attente
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch user projects', () => {
    const mockProjects: Projet[] = [
      { id: '1', nom_projet: 'Test Project 1', description: 'Description 1', membres: [] },
      { id: '2', nom_projet: 'Test Project 2', description: 'Description 2', membres: [] }
    ];

    service.getProjetsUtilisateur().subscribe((projects) => {
      expect(projects.length).toBe(2);
      expect(projects).toEqual(mockProjects);
    });

    // Utiliser l'URL directe au lieu de service.baseUrl
    const req = httpMock.expectOne('http://localhost:3000/api/projects');
    expect(req.request.method).toBe('GET');
    req.flush(mockProjects); // Simule une réponse de l'API
  });

  it('should create a project', () => {
    const newProject: Projet = { id: '3', nom_projet: 'New Project', description: 'New Project Description', membres: [] };

    service.creerProjet('New Project').subscribe((response) => {
      expect(response).toEqual(newProject);
    });

    const req = httpMock.expectOne('http://localhost:3000/api/projects');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ nom_projet: 'New Project' });
    req.flush(newProject); // Simule une réponse de l'API
  });
});
