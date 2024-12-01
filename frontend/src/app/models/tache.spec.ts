import { Tache } from './tache';

describe('Tache', () => {
  it('should create an instance', () => {
    expect(new Tache()).toBeTruthy();
  });

  it('should create an instance of Tache with default values', () => {
    const tache = new Tache();
    expect(tache.description_tache).toBeUndefined();
    expect(tache.id_membre).toBeUndefined();
    expect(tache.id_projet).toBeUndefined();
    expect(tache.date_echeance).toBeUndefined();
    expect(tache.status).toBeUndefined();
    expect(tache.priorite).toBeUndefined();
  });

  it('should allow to set optional values', () => {
    const tache = new Tache();
    tache.description_tache = 'description';
    tache.id_membre = 'membre';
    tache.id_projet = 'projet';
    tache.date_echeance = new Date();
    tache.status = 'À faire';
    tache.priorite = 'Basse';
    expect(tache.description_tache).toBe('description');
    expect(tache.id_membre).toBe('membre');
    expect(tache.id_projet).toBe('projet');
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
