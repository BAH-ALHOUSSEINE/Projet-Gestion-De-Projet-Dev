import { Component } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrl: './inscription.component.css'
})
export class InscriptionComponent {

  user: User = new User();
  champEmpty: number = 0;
  errorMessage: String = "";





  constructor(private userService: UserService, private router: Router) {
    this.user.email = "";
    this.user.name = "";
    this.user.password = "";
    this.user.prenom = "";
  }

  ajoutUser() {


    if (this.user.name == "" || this.user.prenom == "" || this.user.password == "" || this.user.email == "") {
      this.champEmpty = 1;
    }
    else {


      this.userService.register(this.user).subscribe({
        next: (response) => {
          // Si l'email est valide (aucune erreur 400)
          console.log('Email validé', response);
          this.router.navigate(['/connexion']);
        },
        error: (err) => {
          // Si l'API retourne une erreur 400, affichez le message d'erreur
          if (err.status === 400) {
            this.champEmpty = 0;
            this.errorMessage = err.error.error;  // Message d'erreur de l'API
          }
        }
      }



      );

    }


  }



}



