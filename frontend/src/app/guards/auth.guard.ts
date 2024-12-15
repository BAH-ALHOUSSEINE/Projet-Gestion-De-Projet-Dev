import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';  // Importer Router pour la redirection


@Injectable({
  providedIn: 'root'
})
/**
 * AuthGuard is a route guard that determines whether a route can be activated based on the user's authentication status.
 * It uses localStorage to check if the user is logged in and manages the login state using a BehaviorSubject.
 */
export class AuthGuard implements CanActivate {


  /**
   * A BehaviorSubject to hold the login status of the user.
   */
  private isLoggedInSubject: BehaviorSubject<boolean>;

   /**
   * Checks if localStorage is accessible.
   * @returns {boolean} True if localStorage is accessible, false otherwise.
   */
  static canAcessLocalStorage(): boolean
  {
    try {
      console.log("can accesLocalStorageValue : " , typeof window !== 'undefined' && typeof localStorage !== 'undefined')
      return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
    } catch (e) {
      console.error("Accès au localStorage refusé :", e);
      return false;
    }
  }


  /**
   * Constructor for AuthGuard.
   * @param {Router} router - The Angular Router service.
   */
  constructor( private router : Router) {
    
    let isLoggedIn = false;
    if(AuthGuard.canAcessLocalStorage())
    { // Initialiser le BehaviorSubject avec l'état actuel dans localStorage 
      isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    }
    //Permettra le pattern Observateur
    this.isLoggedInSubject = new BehaviorSubject<boolean>(isLoggedIn);
  }

   /**
   * Getter for the login status as an observable.
   * @returns {Observable<boolean>} An observable of the login status.
   */
  get isLoggedIn(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }


  /**
   * Logs in the user by setting the login status and token in localStorage.
   * @param {string} token - The authentication token.
   */
    login(token : string) {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('token',token)
      this.isLoggedInSubject.next(true); // Mettre à jour le comportement
    }

  /**
   * Logs out the user by clearing the login status and token from localStorage.
   */
  logout() : void {
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.removeItem('token')
    this.isLoggedInSubject.next(false); // Mettre à jour le comportement
    this.router.navigate(['/connexion'])
  }

  /**
   * Determines if a route can be activated based on the user's login status.
   * @param {ActivatedRouteSnapshot} next - The next route snapshot.
   * @param {RouterStateSnapshot} state - The current router state snapshot.
   * @returns {boolean} True if the route can be activated, false otherwise.
   */
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if(AuthGuard.canAcessLocalStorage())
    {
      if (localStorage.getItem('isLoggedIn') === 'true') {
        return true; // User is logged in, allow access
      } else {
        this.router.navigate(['/connexion']); // Redirect to login if not logged in
        return false; // Deny access
      }
    }
    else
    {
      console.log("Problème d'accès au local storage in canActivate")
      return false;
    }
  
  }

}
