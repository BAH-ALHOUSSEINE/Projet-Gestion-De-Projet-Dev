import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

/**
 * Service to handle user-related operations.
 * 
 * @@Injectable({
 *   providedIn: 'root'
 * })
 */
export class UserService {

  /**
   * Constructor to inject HttpClient dependency.
   * 
   * @param http - HttpClient instance to make HTTP requests.
   */
  constructor(private http: HttpClient) { }

  /**
   * Fetches a user by their ID.
   * 
   * @param userId - The ID of the user to fetch.
   * @returns An Observable containing the user data.
   */
  getUserById(userId: string): Observable<any> {
    const url = `http://localhost:3000/api/users/${userId}`;
    return this.http.get<any>(url);
  }
}
