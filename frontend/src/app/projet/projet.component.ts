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
    console.log('isProjectCreationPanelOpen:', this.isProjectCreationPanelOpen);
    this.newProject = new Projet(); // Réinitialiser les données du nouveau projet
  }

  closeProjectCreationPanel(): void {
    this.isProjectCreationPanelOpen = false;
    console.log('isProjectCreationPanelOpen:', this.isProjectCreationPanelOpen);
  }

  submitProjectCreation(): void {
    console.log("Soumission de la création du projet :", this.newProject);
    this.newProject.membres = [];
    this.projectService.addProjectForCurrentUser(this.newProject).subscribe((newProjectData) => {
      const newProject = Projet.fromData(newProjectData.projet);
      this.projects.push(newProject);
      this.projectService.updateProjects(this.projects);
      this.closeProjectCreationPanel(); // Fermer le panneau après création
      
      // Redirection vers la page du projet
      const projectId = newProjectData.projet._id; // Récupération de l'ID du projet
      this.router.navigate([`/${projectId}`]); // Redirige vers localhost:4200/idprojet
    
    });
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
}
