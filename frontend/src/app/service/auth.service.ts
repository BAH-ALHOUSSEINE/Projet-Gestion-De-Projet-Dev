import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})


export class UserService {

 
  private baseUrl = 'http://localhost:3000/api/auth'; 

  constructor(private http: HttpClient) { }


  register(user: User): Observable<any> {
   
    const url = `${this.baseUrl}/register`;
   
    return this.http.post<any>(url, user, httpOptions);
  }


  login(email: string | undefined , password : String | undefined) : Observable<any>{

    const url = `${this.baseUrl}/login`;

    const body = {email,password};

    return  this.http.post<any>(url, body, httpOptions);
  }



}
