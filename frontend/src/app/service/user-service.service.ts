import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})


export class UserServiceService {

 
  private baseUrl = 'http://localhost:3000/api/auth'; 

  constructor(private http: HttpClient) { }


  register(user: User): Observable<User> {
   
    const url = `${this.baseUrl}/register`;
   
    return this.http.post<User>(url, user, httpOptions);
  }

}
