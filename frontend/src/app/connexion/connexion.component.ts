import { Component } from '@angular/core';
import { User } from '../models/user';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent {
  user: User = new User();
  champEmpty: number = 0;
  errorMessage: string = "";

  constructor(private authService: AuthService, private router: Router) {
    this.user.email = "";
    this.user.password = "";
  }

  login() {
    if (this.user.password == "" || this.user.email == "") {
      this.champEmpty = 1;
    } else {
      console.log(this.user);

      this.authService.login(this.user.email || '', this.user.password || '').subscribe({
        next: (response) => {
          console.log(response);
          console.log(this.user);
          this.router.navigate(['/projet']);
        },
        error: (error) => {
          if (error.status === 401) {
            this.champEmpty = 0;
            this.errorMessage = error.error.error || 'Identifiants invalides';
          }
        }
      });
    }
  }
}
