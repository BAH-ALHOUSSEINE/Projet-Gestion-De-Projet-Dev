import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjetService } from '../service/projet.service'; // Importation du service
import { Projet } from '../models/projet'; // Importer le modèle Projet

@Component({
  selector: 'app-projet',
  templateUrl: './projet.component.html',
  styleUrls: ['./projet.component.css']
})
export class ProjetComponent implements OnInit {

  projets: Projet[] = []; // Utiliser le modèle Projet

  constructor(private projetService: ProjetService, private router: Router) {}

  ngOnInit() {
    this.chargerProjets();
  }
  
  // Charger les projets via un service
  chargerProjets() {
    this.projetService.getProjetsUtilisateur().subscribe({
      next: (projets: Projet[]) => { // Adapter le type des projets récupérés
        this.projets = projets; // Met à jour la liste des projets si disponibles
      },
      error: (err) => {
        console.error("Erreur lors du chargement des projets :", err);
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
        }
      });
    }
  }
  
}
