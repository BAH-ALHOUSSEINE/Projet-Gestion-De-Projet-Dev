import { Injectable } from '@angular/core';
import {Projet} from '../models/projet'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthGuard } from '../guards/auth.guard';
import { User } from '../models/user';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class ProjetService {

  private projectSubject = new BehaviorSubject<Projet | null>(null);
  public project$ = this.projectSubject.asObservable();

  private projectsSubject = new BehaviorSubject<Projet[]>([]); // Initialisation de la liste des projets
  public projects$ = this.projectsSubject.asObservable(); // Observable pour que le composant puisse s'abonner

  private baseUrl = 'http://localhost:3000/api/projects/project'; 

  

  constructor(private http: HttpClient) { }

  addProjectForCurrentUser(newProject: Projet): Observable<any> {
    const url = `${this.baseUrl}/project`;

    if (AuthGuard.canAcessLocalStorage()) {
      const token = localStorage.getItem('token') ?? '';  // Si null, utiliser une chaîne vide
      newProject.id_admin = token;
    }


    // Log des données envoyées pour déboguer
    console.log("Données envoyées:", newProject);

    // Appel à l'API pour créer le projet
    return this.http.post<any>(this.baseUrl, newProject, httpOptions);
  }

  // Fonction pour récupérer les projets d'un utilisateur
  getUserProjects(userId: string): Observable<any> {
    let current_user = null;
    if(AuthGuard.canAcessLocalStorage())
    {
      if(localStorage.getItem('token'))
      {
        console.log(localStorage.getItem('token'))
        current_user = localStorage.getItem('token');
      }
    }
    console.log("Service getUserProject : " + current_user)
    const url = `http://localhost:3000/api/projects/user/${current_user}`;
    return this.http.get<any>(url);  // Utilisation de GET pour récupérer les projets
  }

  getProjectById(projectId: string): Observable<any> {
    const url = `http://localhost:3000/api/projects/${projectId}`;
    return this.http.get<any>(url);
  }

  // Appeler cette méthode pour mettre à jour les projets
  updateProjects(projects: Projet[]): void {
    this.projectsSubject.next(projects); // Émettre la nouvelle liste de projets
  }

  addmembre(projectId: string | undefined ,email : User): Observable<any> {
    console.log()
    const url = `http://localhost:3000/api/projects/${projectId}/members`;
    return this.http.post<any>(url,email , httpOptions);

  }

  updateProject(project: Projet): void {
    this.projectSubject.next(project);
  }


}
