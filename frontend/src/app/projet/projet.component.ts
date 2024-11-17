import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjetService } from '../service/projet.service'; // Importation du service
import { AuthService } from '../service/auth.service';
import { Projet } from '../models/projet'; // Importer le modèle Projet

@Component({
  selector: 'app-projet',
  templateUrl: './projet.component.html',
  styleUrls: ['./projet.component.css']
})
export class ProjetComponent implements OnInit {

  projets: Projet[] = [];

  constructor(
    private projetService: ProjetService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.chargerProjets();
    } else {
      this.router.navigate(['/connexion']);
    }
  }

  chargerProjets() {
    this.projetService.getProjetsUtilisateur().subscribe({
      next: (projets: Projet[]) => {
        this.projets = projets;
      },
      error: (err) => {
        console.error("Erreur lors du chargement des projets :", err);
        /*if (err.status === 401) {
          this.authService.logout();
          this.router.navigate(['/connexion']);
        }*/
      }
    });
  }

  ouvrirProjet(id: string) {
    console.log(`Projet ouvert avec l'id : ${id}`);
    this.router.navigate(['/projets', id]); // Redirige vers une route spécifique au projet  
  }

  creerProjet() {
    console.log('Création d’un nouveau projet');
    const nomProjet = prompt('Entrez le nom de votre projet :'); // Exemple simple, remplacé par un formulaire dans une modale ou une autre page
    if (nomProjet) {
      this.projetService.creerProjet(nomProjet).subscribe({
        next: (projetCree) => {  // projetCree est l'objet projet retourné par l'API
          console.log('Projet créé avec succès');
          this.router.navigate(['/projets', projetCree.id]);  // Utilisation de l'id du projet créé
        },
        error: (err) => {
          console.error('Erreur lors de la création du projet :', err);
          /*if (err.status === 401) {
            // Token expiré ou invalide
            this.authService.logout();
            this.router.navigate(['/connexion']);
          }*/
        }
      });
    }
  }
}
