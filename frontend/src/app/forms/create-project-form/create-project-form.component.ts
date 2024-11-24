import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Projet } from '../../models/projet';
import { ProjetService } from '../../service/projet.service';

@Component({
  selector: 'app-create-project-form',
  templateUrl: './create-project-form.component.html',
  styleUrl: './create-project-form.component.css'
})
export class CreateProjectFormComponent {
  @Output() projectCreated = new EventEmitter<Projet>(); // Événement à émettre lors de la création réussie
  @Output() formCancel = new EventEmitter<void>(); // Événement pour annuler la création
  newProject: Projet = new Projet(); 
  
  projectFormConfig = [
    { id: 'nomProjet', name: 'nom_projet', label: 'Nom du projet', type: 'text', required: true },
    { id: 'typeProjet', name: 'type_projet', label: 'Type de projet', type: 'text', required: true },
    { id: 'descriptionProjet', name: 'description_projet', label: 'Description', type: 'textarea', required: false },
    { id: 'dateDebut', name: 'date_debut', label: 'Date de début', type: 'date', required: true },
    { id: 'dateFin', name: 'date_fin', label: 'Date de fin', type: 'date', required: true }
  ];

  constructor(private projectService: ProjetService) {}

  ngOnInit(): void {
    // Initialisation si nécessaire
  }

  submitProjectCreation(): void {
    console.log("Soumission de la création du projet :", this.newProject);
    // Assurez-vous que le projet a les champs nécessaires
    this.newProject.membres = [];

    // Appel au service pour ajouter le projet
    this.projectService.addProjectForCurrentUser(this.newProject).subscribe({
      next: (newProjectData) => {
        const newProject = Projet.fromData(newProjectData.projet); // Transformer les données en objet Projet
        this.projectCreated.emit(newProject); // Émet le projet créé au parent
      },
      error: (err) => {
        console.error("Erreur lors de la création du projet :", err);
      }
    });
  }

  cancelCreation(): void {
    this.formCancel.emit(); // Informe le parent que la création est annulée
  }
}