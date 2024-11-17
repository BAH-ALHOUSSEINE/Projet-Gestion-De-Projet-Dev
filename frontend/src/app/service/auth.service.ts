// src/app/services/auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenSubject: BehaviorSubject<string | null>;

  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {
    this.tokenSubject = new BehaviorSubject<string | null>(
      this.storageService.getItem('token')
    );
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>('http://localhost:3000/api/auth/login', { email, password })
      .pipe(
        tap(response => {
          this.storageService.setItem('token', response.token);
          console.log('Token stored:', response.token); // Pour le débogage
          this.tokenSubject.next(response.token);
        })
      );
  }

  logout() {
    this.storageService.removeItem('token');
    this.tokenSubject.next(null);
  }

  getToken(): string | null {
    return this.tokenSubject.value;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
