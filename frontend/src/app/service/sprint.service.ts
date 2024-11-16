// src/app/service/sprint.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SprintService {
  private readonly API_URL = 'http://localhost:3000/api/sprints'; // URL de l'API backend

  constructor(private http: HttpClient) {}

  // Récupérer les sprints d'un projet
  getSprintsByProject(projectId: string): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/projet/${projectId}`);
  }
}
