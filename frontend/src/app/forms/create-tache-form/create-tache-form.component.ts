import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Status } from '../../models/status.enum';
import { SprintService } from '../../service/sprint.service';
import { Projet } from '../../models/projet';
import { Tache } from '../../models/tache';
import { Sprint } from '../../models/sprint';


@Component({
  selector: 'app-create-tache-form',
  templateUrl: './create-tache-form.component.html',
  styleUrl: './create-tache-form.component.css'
})/**
* Component for creating a new task (tache) within a project and sprint.
* 
* @selector app-create-tache-form
* @templateUrl ./create-tache-form.component.html
* @styleUrl ./create-tache-form.component.css
*/
export class CreateTacheFormComponent {

 /**
  * Event emitted when the form creation is cancelled.
  */
 @Output() formCancel = new EventEmitter<void>();

 /**
  * The project to which the task belongs.
  */
 @Input() project!: Projet;

 /**
  * The sprint to which the task belongs.
  */
 @Input() sprint!: Sprint;

 /**
  * The new task being created.
  */
 newtache: Tache = new Tache();

 /**
  * The category of the task.
  */
 @Input() categorie: string | undefined;

 /**
  * Event emitted when a new task is created.
  */
 @Output() tacheCreated = new EventEmitter<Tache>();

 /**
  * Constructor for CreateTacheFormComponent.
  * 
  * @param sprintService - Service for handling sprint-related operations.
  */
 constructor(private sprintService: SprintService) { }

 /**
  * Configuration for the project form fields.
  */
 projectFormConfig = [
   { id: 'description', name: 'description', label: 'Description du tache', type: 'text', required: true },
   { id: 'date_echeance', name: 'date_echeance', label: 'Date echeance', type: 'date', required: true },
   {
     id: 'status', name: 'status', label: 'status', type: 'select', required: true,
     options: [
       { value: Status.Afaire, label: Status.Afaire },
       { value: Status.EnCours, label: Status.EnCours },
       { value: Status.Termine, label: Status.Termine },
     ],
   },
   {
     id: 'prioritie', name: 'priorite', label: 'prioritie', type: 'select', required: true,
     options: [
       { value: Status.Base, label: Status.Base },
       { value: Status.Moyenne, label: Status.Moyenne },
       { value: Status.Haute, label: Status.Haute },
     ],
   }
 ];

 /**
  * Cancels the task creation and emits the formCancel event.
  */
 cancelCreation(): void {
   this.formCancel.emit(); // Informe le parent que la création est annulée
 }

 /**
  * Submits the task creation form and emits the tacheCreated event with the new task.
  */
 submitTacheCreation(): void {
   this.sprintService.addtache(this.project._id, this.sprint._id, this.categorie, this.newtache).subscribe((response: any) => {
     this.tacheCreated.emit(response.nouvelleTache);
   })
 }
}

