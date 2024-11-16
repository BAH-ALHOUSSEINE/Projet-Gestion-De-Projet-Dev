import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // Pour récupérer les paramètres de l'URL
import { ProjetService } from '../service/projet.service'; // Importation du service
import { SprintService } from '../service/sprint.service'; // Importation du service Sprint
import { Projet } from '../models/projet'; 
import { Sprint } from '../models/sprint'; 

@Component({
  selector: 'app-detail-projet',
  templateUrl: './detail-projet.component.html',
  styleUrls: ['./detail-projet.component.css']
})

export class DetailProjetComponent implements OnInit {

  projet: Projet | null = null;
  sprintEnCours: Sprint | null = null; // Sprint en cours
  projetId: string = ''; // ID du projet récupéré depuis l'URL
  sprints: Sprint[] = []; // Liste des sprints du projet

  constructor(
    private route: ActivatedRoute, // Pour récupérer l'ID du projet depuis l'URL
    private projetService: ProjetService, // Pour récupérer les détails du projet
    private sprintService: SprintService // Pour récupérer les sprints du projet
  ) {}

  ngOnInit(): void {
    // Récupérer l'ID du projet depuis l'URL
    this.route.paramMap.subscribe(params => {
      this.projetId = params.get('id') || ''; // Définit l'ID du projet
      if (this.projetId) {
        this.chargerProjet(); // Charger les détails du projet
        this.chargerSprints(); // Charger les sprints du projet
      }
    });
  }

  chargerProjet() {
    this.projetService.getProjetParId(this.projetId).subscribe({
      next: (projet: Projet) => {
        this.projet = projet; // Met à jour les informations du projet
      },
      error: (err) => {
        console.error('Erreur lors du chargement du projet :', err);
      }
    });
  }

  chargerSprints() {
    this.sprintService.getSprintsByProject(this.projetId).subscribe({
      next: (sprints: Sprint[]) => {
        this.sprints = sprints; // Met à jour la liste des sprints
        // Définir le sprint en cours si disponible
        this.sprintEnCours = this.sprints.find(sprint => sprint.startDate <= new Date() && sprint.endDate >= new Date()) || null;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des sprints :', err);
      }
    });
  }

  // Méthode pour mettre à jour le sprint en cours basé sur la sélection de l'utilisateur
  selectionnerSprint(sprintId: string) {
    this.sprintEnCours = this.sprints.find(sprint => sprint._id === sprintId) || null;
  }
}
