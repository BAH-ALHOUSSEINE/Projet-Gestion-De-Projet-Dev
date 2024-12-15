import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';  // Importer Router pour la redirection
import { AuthGuard } from '../guards/auth.guard';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
/**
 * The HeaderComponent is responsible for managing the header section of the application.
 * It handles user authentication status and provides navigation functionalities.
 * 
 * @class
 * @implements {OnInit}
 */
export class HeaderComponent implements OnInit {
  /**
   * Indicates whether the user is logged in.
   * 
   * @type {boolean}
   */
  isLoggedIn: boolean = false;

  /**
   * Creates an instance of HeaderComponent.
   * 
   * @param {Router} router - The Angular Router service for navigation.
   * @param {AuthGuard} authGuard - The AuthGuard service for authentication status.
   */
  constructor(private router: Router, private authGuard: AuthGuard) {}

  /**
   * Angular lifecycle hook that is called after the component's view has been initialized.
   * Subscribes to the authentication status to update the `isLoggedIn` property.
   * 
   * @returns {void}
   */
  ngOnInit(): void {
    this.authGuard.isLoggedIn.subscribe((status : boolean) =>
      {
        this.isLoggedIn = status;
      }
    )
  }

  /**
   * Updates the `isLoggedIn` property based on the value stored in localStorage.
   * 
   * @returns {void}
   */
  updateLoginStatus(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    }
  }

  /**
   * Logs out the user by calling the AuthGuard's logout method and redirects to the login page.
   * 
   * @returns {void}
   */
  logout(): void {
    this.authGuard.logout()
  }

  /**
   * Navigates to the project list page.
   * 
   * @returns {void}
   */
  listeprojet(): void {
    this.router.navigate(['/projet']);
  }
}
