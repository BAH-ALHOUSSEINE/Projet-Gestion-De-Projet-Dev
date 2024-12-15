import { Component } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../service/auth.service';
import { AuthGuard } from "../guards/auth.guard"

import { Router } from '@angular/router';
@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrl: './connexion.component.css'
})
/**
 * ConnexionComponent is responsible for handling user login functionality.
 * It interacts with the UserService to authenticate the user and manages
 * the routing upon successful login.
 * 
 * @component
 * @selector app-connexion
 * @templateUrl ./connexion.component.html
 * @styleUrl ./connexion.component.css
 */
export class ConnexionComponent {

  /**
   * The user object containing email and password.
   */
  user: User = new User();

  /**
   * Flag to indicate if any input field is empty.
   */
  champEmpty: number = 0;

  /**
   * Error message to display in case of login failure.
   */
  errorMessage: String = "";

  /**
   * Constructor to inject necessary services.
   * 
   * @param userService - Service to handle user-related operations.
   * @param router - Router service to navigate between routes.
   * @param authGuard - AuthGuard service to manage authentication state.
   */
  constructor(private userService: UserService, private router: Router, private authGuard: AuthGuard) {
    this.user.email = "";
    this.user.password = "";
  }

  /**
   * Method to handle user login.
   * It checks if the input fields are not empty, then calls the login method
   * of UserService. On successful login, it stores the user ID in session storage
   * and navigates to the 'projet' route. In case of an error, it sets the appropriate
   * error message.
   */



  login() {
    if (this.user.password == "" || this.user.email == "") {
      this.champEmpty = 1;
    }
    else {

      console.log(this.user);

      this.userService.login(this.user.email, this.user.password).subscribe({
        next: (response) => {
          console.log("reponse : " + response);
          console.log("token : " + response.token);
          this.authGuard.login(response.token);
          sessionStorage.setItem('iduser', response.userId ? response.userId.toString() : '');

          this.router.navigate(['/projet']);
        },
        error: (err) => {
          // Si l'API retourne une erreur 401, affichez le message d'erreur
          if (err.status === 401) {

            this.champEmpty = 0;
            this.errorMessage = err.error.error;  // Message d'erreur de l'API
          }
        }
      }
      );
    }
  }

}
