import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Projet } from '../../models/projet';
import { ProjetService } from '../../service/projet.service';

@Component({
  selector: 'app-create-project-form',
  templateUrl: './create-project-form.component.html',
  styleUrl: './create-project-form.component.css'
})/**
* Component for creating a new project.
* 
* This component provides a form for creating a new project and emits events
* when the project is successfully created or when the form is canceled.
* 
* @selector app-create-project-form
* @templateUrl ./create-project-form.component.html
* @styleUrl ./create-project-form.component.css
*/
export class CreateProjectFormComponent {
 /**
  * Event emitted when a project is successfully created.
  */
 @Output() projectCreated = new EventEmitter<Projet>();

 /**
  * Event emitted when the form creation is canceled.
  */
 @Output() formCancel = new EventEmitter<void>();

 /**
  * The new project being created.
  */
 newProject: Projet = new Projet();

 /**
  * Configuration for the project creation form fields.
  */
 projectFormConfig = [
   { id: 'nomProjet', name: 'nom_projet', label: 'Nom du projet', type: 'text', required: true },
   { id: 'typeProjet', name: 'type_projet', label: 'Type de projet', type: 'text', required: true },
   { id: 'descriptionProjet', name: 'description_projet', label: 'Description', type: 'textarea', required: false },
   { id: 'dateDebut', name: 'date_debut', label: 'Date de début', type: 'date', required: true },
   { id: 'dateFin', name: 'date_fin', label: 'Date de fin', type: 'date', required: true }
 ];

 /**
  * Constructor for CreateProjectFormComponent.
  * 
  * @param projectService - The service used to manage projects.
  */
 constructor(private projectService: ProjetService) {}

 /**
  * Lifecycle hook that is called after data-bound properties of a directive are initialized.
  */
 ngOnInit(): void {
   // Initialisation si nécessaire
 }

 /**
  * Submits the project creation form.
  * 
  * This method ensures that the new project has the necessary fields and then
  * calls the project service to add the project for the current user. If the
  * project is successfully created, it emits the `projectCreated` event.
  */
 submitProjectCreation(): void {
   console.log("Soumission de la création du projet :", this.newProject);
   this.newProject.membres = [];

   this.projectService.addProjectForCurrentUser(this.newProject).subscribe({
     next: (newProjectData) => {
       const newProject = Projet.fromData(newProjectData.projet);
       console.log("new project form : " + newProject);
       this.projectCreated.emit(newProject);
     },
     error: (err) => {
       console.error("Erreur lors de la création du projet :", err);
     }
   });
 }

 /**
  * Cancels the project creation form.
  * 
  * This method emits the `formCancel` event to inform the parent component that
  * the project creation has been canceled.
  */
 cancelCreation(): void {
   this.formCancel.emit();
 }
}