import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Status } from '../../models/status.enum';
import { SprintService } from '../../service/sprint.service';
import { Projet } from '../../models/projet';
import { Sprint } from '../../models/sprint';

@Component({
  selector: 'app-create-sprint-form',
  templateUrl: './create-sprint-form.component.html',
  styleUrl: './create-sprint-form.component.css'
})/**
* Component for creating a new sprint within a project.
* 
* @selector app-create-sprint-form
* @templateUrl ./create-sprint-form.component.html
* @styleUrl ./create-sprint-form.component.css
*/
export class CreateSprintFormComponent {
 /**
  * Event emitted when the form creation is cancelled.
  */
 @Output() formCancel = new EventEmitter<void>();

 /**
  * The project for which the sprint is being created.
  */
 @Input() project!: Projet;

 /**
  * The new sprint being created.
  */
 newSprint: Sprint = new Sprint();

 /**
  * Event emitted when a new sprint is successfully created.
  */
 @Output() sprintCreated = new EventEmitter<Sprint>();

 /**
  * Configuration for the project form fields.
  */
 projectFormConfig = [
   { id: 'dateDebut', name: 'date_debut', label: 'Date de début', type: 'date', required: true },
   { id: 'dateFin', name: 'date_fin', label: 'Date de fin', type: 'date', required: true },
   { id: 'status', name: 'status', label: 'Catégorie', type: 'select', required: true,
     options: [
       { value: Status.EnAttente, label: Status.EnAttente },
       { value: Status.EnCours, label: Status.EnCours },
       { value: Status.Termine, label: Status.Termine },
     ],
   }
 ];

 /**
  * Constructor for CreateSprintFormComponent.
  * 
  * @param sprintService - Service for handling sprint-related operations.
  */
 constructor(private sprintService: SprintService) {}

 /**
  * Submits the sprint creation form.
  * If the project ID is available, it adds the new sprint to the current project.
  */
 submitSprintCreation(): void {
   if (this.project._id) {
     this.sprintService.addSprintForCurrentProject(this.project._id, this.newSprint).subscribe((newSprints: any) => {
       this.sprintCreated.emit(newSprints.sprint); // Emits the event with the created sprint
     });
   }
 }

 /**
  * Cancels the sprint creation process.
  * Emits an event to inform the parent component that the creation is cancelled.
  */
 cancelCreation(): void {
   this.formCancel.emit(); // Informs the parent that the creation is cancelled
 }
}

