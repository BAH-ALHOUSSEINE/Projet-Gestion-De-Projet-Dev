import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';  // Importer Router pour la redirection


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private isLoggedInSubject: BehaviorSubject<boolean>;

  static canAcessLocalStorage()
  {
    try {
      console.log("plat," , )
      console.log("can accesLocalStorageValue : " , typeof window !== 'undefined' && typeof localStorage !== 'undefined')
      return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
    } catch (e) {
      console.error("Accès au localStorage refusé :", e);
      return false;
    }
  }

  constructor( private router : Router) {
    
    let isLoggedIn = false;
    if(AuthGuard.canAcessLocalStorage())
    { // Initialiser le BehaviorSubject avec l'état actuel dans localStorage 
      isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    }
    //Permettra le pattern Observateur
    this.isLoggedInSubject = new BehaviorSubject<boolean>(isLoggedIn);
  }

  // Getter pour le statut de la connexion
  get isLoggedIn() {
    return this.isLoggedInSubject.asObservable();
  }

  // Méthode pour se connecter
  login(token : string) {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('token',token)
    this.isLoggedInSubject.next(true); // Mettre à jour le comportement
  }

  // Méthode pour se déconnecter
  logout() {
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.removeItem('token')
    this.isLoggedInSubject.next(false); // Mettre à jour le comportement
    this.router.navigate(['/connexion'])
  }

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
