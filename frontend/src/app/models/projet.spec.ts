import { Projet } from './projet';
import { User } from './user';

describe('ProjetServices', () => {
  it('should create an instance', () => {
    expect(new Projet()).toBeTruthy();
  });

  it('should create an instance of Projet with default values', () => {
    const projet = new Projet();
    expect(projet._id).toBeUndefined();
    expect(projet.nom_projet).toBeUndefined();
    expect(projet.id_admin).toBeUndefined();
    expect(projet.type_projet).toBeUndefined();
    expect(projet.description_projet).toBeUndefined();
    expect(projet.date_debut).toBeUndefined();
    expect(projet.date_fin).toBeUndefined();
    expect(projet.membres).toBeUndefined();
  });

  it('should create an instance of Projet with values from projectData', () => {
    const projectData = {
      _id: '123',
      nom_projet: 'projet',
      id_admin: {_id:"admin"},
      type_projet: 'type',
      description_projet: 'description',
      date_debut: new Date(),
      date_fin: new Date(),
      membres: [new User, new User]
    };
    const projet = Projet.fromData(projectData);
    expect(projet._id).toBe('123');
    expect(projet.nom_projet).toBe('projet');
    expect(projet.id_admin).toBe("admin");
    expect(projet.type_projet).toBe('type');
    expect(projet.description_projet).toBe('description');
    expect(projet.date_debut).toEqual(new Date(projectData.date_debut));
    expect(projet.date_fin).toEqual(new Date(projectData.date_fin));
    expect(projet.membres).toEqual([new User, new User]);
  });

  it('should set membre to [] when membre is undefined or invalid', () => {
    const projectData = {
      _id: '123',
      nom_projet: 'projet',
      id_admin: {_id:"admin"},
      type_projet: 'type',
      description_projet: 'description',
      date_debut: new Date(),
      date_fin: new Date(),
      membres: undefined
    };
    const projet = Projet.fromData(projectData);
    expect(projet._id).toBe('123');
    expect(projet.nom_projet).toBe('projet');
    expect(projet.id_admin).toBe('admin');
    expect(projet.type_projet).toBe('type');
    expect(projet.description_projet).toBe('description');
    expect(projet.date_debut).toEqual(new Date(projectData.date_debut));
    expect(projet.date_fin).toEqual(new Date(projectData.date_fin));
    expect(projet.membres).toEqual([]);
    
    const projectData2 = {
      _id: '123',
      nom_projet: 'projet',
      id_admin: {_id:"admin"},
      type_projet: 'type',
      description_projet: 'description',
      date_debut: new Date(),
      date_fin: new Date(),
      membres: 'member'
    };
    const projet2 = Projet.fromData(projectData2);
    expect(projet2._id).toBe('123');
    expect(projet2.nom_projet).toBe('projet');
    expect(projet2.id_admin).toBe('admin');
    expect(projet2.type_projet).toBe('type');
    expect(projet2.description_projet).toBe('description');
    expect(projet2.date_debut).toEqual(new Date(projectData2.date_debut));
    expect(projet2.date_fin).toEqual(new Date(projectData2.date_fin));
    expect(projet2.membres).toEqual([]);
  });

  it('should set membre to [] when membre is []', () => {
    const projectData = {
      _id: '123',
      nom_projet: 'projet',
      id_admin: {_id:"admin"},
      type_projet: 'type',
      description_projet: 'description',
      date_debut: new Date(),
      date_fin: new Date(),
      membres: []
    };
    const projet = Projet.fromData(projectData);
    expect(projet._id).toBe('123');
    expect(projet.nom_projet).toBe('projet');
    expect(projet.id_admin).toBe('admin');
    expect(projet.type_projet).toBe('type');
    expect(projet.description_projet).toBe('description');
    expect(projet.date_debut).toEqual(new Date(projectData.date_debut));
    expect(projet.date_fin).toEqual(new Date(projectData.date_fin));
    expect(projet.membres).toEqual([]);
  });
});
