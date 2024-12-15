import { Tache } from './tache';
import { User } from "./user";


describe('Tache', () => {
  it('should create an instance', () => {
    expect(new Tache()).toBeTruthy();
  });

  it('should create an instance of Tache with default values', () => {
    const tache = new Tache();
    expect(tache.description).toBeUndefined();
    expect(tache.membre).toBeUndefined();
    expect(tache.date_echeance).toBeUndefined();
    expect(tache.status).toBeUndefined();
    expect(tache.priorite).toBeUndefined();
  });

  it('should allow to set optional values', () => {
    const tache = new Tache();
    tache.description = 'description';
    const membre = new User();
    membre._id = 'membre';
    tache.membre = membre;
    tache.date_echeance = new Date();
    tache.status = 'À faire';
    tache.priorite = 'Basse';
    expect(tache.description).toBe('description');
    expect(tache.membre?._id).toBe('membre');
    expect(tache.date_echeance).toEqual(new Date());
    expect(tache.status).toBe('À faire');
    expect(tache.priorite).toBe('Basse');
  });

  it('should allow to set different status', () => {
    const tache = new Tache();
    tache.status = 'En cours';
    expect(tache.status).toBe('En cours');
    tache.status = 'Terminé';
    expect(tache.status).toBe('Terminé');
    tache.status = 'À faire';
    expect(tache.status).toBe('À faire');
  });
});
