import { Injectable } from '@angular/core';
import { Projet } from '../models/projet'
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

  /**
 * Subject to hold the current project.
 */
  private projectSubject = new BehaviorSubject<Projet | null>(null);
  /**
   * Observable for the current project.
   */
  public project$ = this.projectSubject.asObservable();

  /**
   * Subject to hold the list of projects.
   */
  private projectsSubject = new BehaviorSubject<Projet[]>([]);

  /**
   * Observable for the list of projects.
   */
  public projects$ = this.projectsSubject.asObservable();

  /**
   * Base URL for the project API.
   */
  private baseUrl = 'http://localhost:3000/api/projects/project';



  constructor(private http: HttpClient) { }

  /**
 * Adds a new project for the current user.
 * 
 * @param newProject - The new project to add.
 * @returns An observable of the API response.
 */
  addProjectForCurrentUser(newProject: Projet): Observable<any> {
    const url = `${this.baseUrl}/project`;

    if (AuthGuard.canAcessLocalStorage()) {
      const token = localStorage.getItem('token') ?? '';  // Si null, utiliser une chaîne vide
      if (!newProject.id_admin) {
        newProject.id_admin = ''; // Initialisation par défaut
      }

      newProject.id_admin = token;
    }


    // Log des données envoyées pour déboguer
    console.log("Données envoyées:", newProject);

    // Appel à l'API pour créer le projet
    return this.http.post<any>(this.baseUrl, newProject, httpOptions);
  }


  /**
   * Retrieves the projects of a user.
   * 
   * @param userId - The ID of the user.
   * @returns An observable of the user's projects.
   */
  getUserProjects(userId: string): Observable<any> {
    let current_user = null;
    if (AuthGuard.canAcessLocalStorage()) {
      if (localStorage.getItem('token')) {
        console.log(localStorage.getItem('token'))
        current_user = localStorage.getItem('token');
      }
    }
    console.log("Service getUserProject : " + current_user)
    const url = `http://localhost:3000/api/projects/user/${current_user}`;
    return this.http.get<any>(url);  // Utilisation de GET pour récupérer les projets
  }

  /**
   * Retrieves a project by its ID.
   * 
   * @param projectId - The ID of the project.
   * @returns An observable of the project.
   */
  getProjectById(projectId: string): Observable<any> {
    const url = `http://localhost:3000/api/projects/${projectId}`;
    return this.http.get<any>(url);
  }


  /**
   * Updates the list of projects.
   * 
   * @param projects - The new list of projects.
   */
  updateProjects(projects: Projet[]): void {
    this.projectsSubject.next(projects); // Émettre la nouvelle liste de projets
  }

  /**
   * Adds a member to a project.
   * 
   * @param projectId - The ID of the project.
   * @param email - The email of the member to add.
   * @returns An observable of the API response.
   */
  addmembre(projectId: string | undefined, email: User): Observable<any> {
    console.log()
    const url = `http://localhost:3000/api/projects/${projectId}/members`;
    return this.http.post<any>(url, email, httpOptions);

  }


  /**
   * Updates the current project.
   * 
   * @param project - The project to update.
   */
  updateProject(project: Projet): void {
    this.projectSubject.next(project);
  }



  /**
   * Deletes a project.
   * 
   * @param Id - The ID of the project to delete.
   * @returns An observable of the API response.
   */
  deleteProject(Id: string | undefined): Observable<any> {
    const url = `http://localhost:3000/api/projects/${Id}`;  // Correction ici
    return this.http.delete<any>(url, httpOptions);  // Suppression de l'argument "id" inutile
  }


  /**
   * Deletes a member from a project.
   * 
   * @param id - The ID of the project.
   * @param email - The email of the member to delete.
   * @returns An observable of the API response.
   */
  deleteProjectmembre(id: string | undefined, email: string | undefined): Observable<any> {

    const url = `http://localhost:3000/api/projects/${id}/${email}`;  // Correction ici
    return this.http.delete<any>(url, httpOptions);

  }

}

