import { Component, OnInit } from '@angular/core';
import { ProjetService } from '../service/projet.service';
import { Projet } from '../models/projet';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projet',
  templateUrl: './projet.component.html',
  styleUrls: ['./projet.component.css']
})
export class ProjetComponent implements OnInit {

  projects: Projet[] = []; // Liste des projets dans le composant
  isProjectCreationPanelOpen = false;
  newProject: Projet = new Projet();  // Données du projet en cours de création


  constructor(private projectService: ProjetService, private router: Router) {}

  ngOnInit(): void {
    // Souscrire à la liste des projets du service
    this.projectService.projects$.subscribe((projects) => {
      this.projects = projects;  // Met à jour la liste des projets dans le composant
    });

    // Charger les projets dès le début
    this.loadUserProjects();
  }

  loadUserProjects(): void {
    const userId = '673b359e1c0adf59528029a1'; // Exemple d'ID utilisateur
    this.projectService.getUserProjects(userId).subscribe((projectsData) => {
      // Convertir les données en objets Projet
      const projects = projectsData.map((projectData: any) => Projet.fromData(projectData));
      this.projectService.updateProjects(projects); // Mettre à jour les projets dans le service
    });
  }

  openProjectCreationPanel(): void {
      this.isProjectCreationPanelOpen = true;
    // console.log('isProjectCreationPanelOpen:', this.isProjectCreationPanelOpen);
    // this.newProject = new Projet(); // Réinitialiser les données du nouveau projet
  }

  closeProjectCreationPanel(): void {
    this.isProjectCreationPanelOpen = false;
    console.log('isProjectCreationPanelOpen:', this.isProjectCreationPanelOpen);
  }

  goToProjectDetail(projectId: string): void {
    if (!projectId) {
      console.error("Impossible de rediriger vers le projet sans ID");
      return;
    }
    
    console.log("Redirection vers le projet :", projectId);
    this.router.navigate([`/${projectId}`]);
  }

  //fonction pour débugger
  callFailed(): void {
    console.log("Appel a échoué");
  }


  onProjectCreated(newProject: Projet): void {
    console.log("Projet créé avec succès :", newProject);
  
    // Ajouter le projet à la liste existante
    this.projects.push(newProject);
  
    // Mettre à jour les projets dans le service
    this.projectService.updateProjects(this.projects);
  
    // Fermer le panneau
    this.closeProjectCreationPanel();
  
    // Redirection vers la page du projet
    const projectId = newProject._id; // Assurez-vous que _id est présent dans l'objet
    if (projectId) {
      this.goToProjectDetail(projectId);
    }
  }
}
