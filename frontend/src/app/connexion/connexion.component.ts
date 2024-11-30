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
export class ConnexionComponent {

  user: User = new User();
  champEmpty: number = 0;
  errorMessage: String = "";

  constructor(private userService: UserService, private router: Router, private authGuard: AuthGuard) {
    this.user.email = "";
    this.user.password = "";

  }

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
          this.authGuard.login(response.token)
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
