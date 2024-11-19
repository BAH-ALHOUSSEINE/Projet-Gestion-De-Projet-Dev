import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';  // Importer Router pour la redirection
import { AuthGuard } from '../guards/auth.guard';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(private router: Router, private authGuard : AuthGuard) {}  // Injecter Router dans le constructeur

  ngOnInit(): void {
    this.authGuard.isLoggedIn.subscribe((status : boolean) =>
    {
      this.isLoggedIn = status;
    }
  )
  }

  // Méthode pour mettre à jour isLoggedIn
  updateLoginStatus() {
    if (typeof window !== 'undefined' && window.localStorage) {
      this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    }
  }

  logout() {
    
    this.authGuard.logout()
    // // Rediriger l'utilisateur vers la page de connexion
    // this.router.navigate(['/connexion']);
  }
}
