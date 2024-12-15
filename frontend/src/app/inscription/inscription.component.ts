import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../service/auth.service';

/**
 * InscriptionComponent is responsible for handling user registration.
 * It interacts with the UserService to register a new user and navigates
 * to the login page upon successful registration.
 */
@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css'],
})
export class InscriptionComponent {
  /**
   * The user object containing registration details.
   */
  user: User = new User();

  /**
   * Flag to indicate if any required field is empty.
   * 0 - All fields are filled.
   * 1 - At least one required field is empty.
   */
  champEmpty: number = 0;

  /**
   * Error message to display if registration fails.
   */
  errorMessage: string = '';

  /**
   * Constructor to initialize the component with necessary services.
   * @param userService - Service to handle user registration.
   * @param router - Router to navigate between routes.
   */
  constructor(private userService: UserService, private router: Router) {
    this.user = {
      email: '',
      nom: '',
      password: '',
      prenom: '',
    };
  }

  /**
   * Method to add a new user by calling the register method of UserService.
   * It checks if all required fields are filled before making the API call.
   * If registration is successful, it navigates to the login page.
   * If there is an error, it sets the appropriate error message.
   */
  ajoutUser(): void {
    if (
      this.user.prenom === '' ||
      this.user.password === '' ||
      this.user.email === ''
    ) {
      this.champEmpty = 1;
    } else {
      this.userService.register(this.user).subscribe({
        next: (response) => {
          console.log('Email validé', response);
          this.router.navigate(['/connexion']);
        },
        error: (err) => {
          if (err.status === 400) {
            this.champEmpty = 0;
            this.errorMessage = err.error.error;
          }
        },
      });
    }
  }
}
