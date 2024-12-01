import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../service/auth.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css'], // Correction de 'styleUrl' en 'styleUrls'
})
export class InscriptionComponent {
  user: User = new User();
  champEmpty: number = 0;
  errorMessage: string = '';

  constructor(private userService: UserService, private router: Router) {
    // Initialisation des champs utilisateur (peut être omise, car déjà gérée dans le modèle `User`)
    this.user = {
      email: '',
      nom: '',
      password: '',
      prenom: '',
    };
  }

  ajoutUser(): void {
    // Vérification si tous les champs sont remplis
    if (
      this.user.nom === '' ||
      this.user.prenom === '' ||
      this.user.password === '' ||
      this.user.email === ''
    ) {
      this.champEmpty = 1;
    } else {
      this.userService.register(this.user).subscribe({
        next: (response) => {
          // Si l'email est validé (aucune erreur 400)
          console.log('Email validé', response);
          this.router.navigate(['/connexion']);
        },
        error: (err) => {
          // Gestion des erreurs provenant de l'API
          if (err.status === 400) {
            this.champEmpty = 0;
            this.errorMessage = err.error.error; // Message d'erreur renvoyé par l'API
          }
        },
      });
    }
  }
}
