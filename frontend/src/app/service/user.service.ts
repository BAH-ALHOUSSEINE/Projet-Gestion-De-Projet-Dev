import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
export class UserService {
  

  constructor(private http: HttpClient) { }

  getUserById(userId: string): Observable<any> {
    const url = `http://localhost:3000/api/users/${userId}`;
    return this.http.get<any>(url);
  }


}
