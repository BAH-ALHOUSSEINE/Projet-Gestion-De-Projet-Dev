import { Injectable } from '@angular/core';
import {Projet} from '../models/projet'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, of } from 'rxjs';
import { AuthGuard } from '../guards/auth.guard';
import { Sprint } from '../models/sprint';
import { CategorieTache } from '../models/categorie-tache';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})

export class SprintService {

    private baseURL = "http://localhost:3000/api/projet/";
  
    constructor(private http: HttpClient) { }
  
    addSprintForCurrentProject(projetId: string, sprintData: Sprint): Observable<any> {
      const url = `${this.baseURL}${projetId}/sprintaj`;  // Construction de l'URL
      console.log("URL de la requête:", url);
  
        console.log("données envoyées : " , sprintData)
      return this.http.post(url, sprintData, httpOptions).pipe(
        catchError(error => {
          console.error('Erreur lors de l\'ajout du sprint', error);
          return of({ success: false, message: 'Erreur lors de l\'ajout du sprint' });
        })
      );
    }
    
    addcategorietacge(projetId : string | undefined  , idsprint : string  | undefined ,  categorie_tache : CategorieTache | undefined ): Observable<any> {
      const url = `${this.baseURL}${projetId}/sprint/${idsprint}/categorie`;  // Construction de l'URL
      console.log("URL de la requête:", url);
  
        console.log("données envoyées : " , categorie_tache)
      return this.http.post(url, categorie_tache, httpOptions).pipe(
        catchError(error => {
          console.error('Erreur lors de l\'ajout du sprint', error);
          return of({ success: false, message: 'Erreur lors de l\'ajout du sprint' });
        })
      );
    }



  }