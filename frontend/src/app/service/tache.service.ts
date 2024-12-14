import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Tache } from '../models/tache';
// import { Tache } from '../models/tache';

@Injectable({
  providedIn: 'root',
})
export class TacheService {
  constructor(private http: HttpClient) {}

  baseURL = "http://localhost:3000/api/tasks/";

  updateTache(projetId: string | undefined, idsprint: string | undefined, idcategorie: string | undefined, tacheId: string | undefined, tache: Tache | undefined): Observable<any> {
    const url = `${this.baseURL}${projetId}/sprints/${idsprint}/categories/${idcategorie}/tasks/${tacheId}`;
    
    console.log("URL de la requête:", url);
    console.log("Données envoyées:", tache);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // Add any necessary headers
      })
    };

    return this.http.put(url, tache, httpOptions).pipe(
      catchError(error => {
        console.error('Erreur lors de la modification de la tâche', error);
        return of({ success: false, message: 'Erreur lors de la modification de la tâche' });
      })
    );
  }

  deleteTache(
    projetId: string | undefined,
    sprintId: string | undefined,
    categorieId: string | undefined,
    tacheId: string | undefined  ): Observable<any> {
    const url = `${this.baseURL}${projetId}/sprints/${sprintId}/categories/${categorieId}/tasks/${tacheId}`;
    
    console.log("URL de la requête DELETE:", url);
  
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // Ajoutez d'autres en-têtes si nécessaire
      })
    };
  
    return this.http.delete(url, httpOptions).pipe(
      catchError(error => {
        console.error('Erreur lors de la suppression de la tâche', error);
        return of({ success: false, message: 'Erreur lors de la suppression de la tâche' });
      })
    );
  }
}



