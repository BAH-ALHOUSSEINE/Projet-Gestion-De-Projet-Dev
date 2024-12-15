import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


/**
 * @description
 * Service responsible for user authentication and registration.
 * Provides methods to register a new user and login an existing user.
 * 
 * @example
 * // Example usage:
 * const userService = new UserService(httpClient);
 * userService.register(newUser).subscribe(response => console.log(response));
 * userService.login(email, password).subscribe(response => console.log(response));
 */
@Injectable({
  providedIn: 'root'
})
export class UserService {

  /**
   * Base URL for authentication API endpoints.
   * @private
   * @type {string}
   */
  private baseUrl = 'http://localhost:3000/api/auth'; 

  /**
   * @constructor
   * @param {HttpClient} http - Angular's HttpClient to perform HTTP requests.
   */
  constructor(private http: HttpClient) { }

  /**
   * Registers a new user.
   * 
   * @param {User} user - The user object containing registration details.
   * @returns {Observable<any>} - An observable containing the server's response.
   */
  register(user: User): Observable<any> {
    const url = `${this.baseUrl}/register`;
    return this.http.post<any>(url, user, httpOptions);
  }

  /**
   * Logs in an existing user.
   * 
   * @param {string | undefined} email - The user's email address.
   * @param {string | undefined} password - The user's password.
   * @returns {Observable<any>} - An observable containing the server's response.
   */
  login(email: string | undefined, password: string | undefined): Observable<any> {
    const url = `${this.baseUrl}/login`;
    const body = { email, password };
    return this.http.post<any>(url, body, httpOptions);
  }
}