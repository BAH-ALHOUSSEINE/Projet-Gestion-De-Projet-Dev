import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Projet } from '../models/projet';  // Importation du modèle Projet

@Injectable({
  providedIn: 'root'
})
export class ProjetService {

  private readonly API_URL = 'http://localhost:3000/api/projects'; // URL de l'API backend

  constructor(private http: HttpClient) {}

  // Récupérer les projets de l'utilisateur
  getProjetsUtilisateur(): Observable<Projet[]> {
    return this.http.get<Projet[]>(`${this.API_URL}`);
  }

  // Créer un projet
  creerProjet(nomProjet: string): Observable<Projet> {
    const projetData = { nom_projet: nomProjet }; // Corps de la requête avec la bonne propriété
    return this.http.post<Projet>(`${this.API_URL}`, projetData);
  }

  // Charger un projet spécifique
  getProjetParId(id: string): Observable<Projet> {
    return this.http.get<Projet>(`${this.API_URL}/${id}`);
  }
}
