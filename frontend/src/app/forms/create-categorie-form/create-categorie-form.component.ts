/**
 * Component for creating a new category within a project.
 * 
 * This component provides a form to create a new category (`CategorieTache`) 
 * within a specified project (`Projet`) and sprint (`Sprint`). It emits events 
 * to notify the parent component about the creation or cancellation of the category.
 * 
 * @selector app-create-categorie-form
 * @templateUrl ./create-categorie-form.component.html
 * @styleUrl ./create-categorie-form.component.css
 * 
 * @property {EventEmitter<void>} formCancel - Event emitter to notify when the form is cancelled.
 * @property {Projet} project - The project within which the category is being created.
 * @property {Sprint} sprint - The sprint within which the category is being created.
 * @property {CategorieTache} newCategorie - The new category being created.
 * @property {EventEmitter<CategorieTache>} categorieCreated - Event emitter to notify when a new category is created.
 * @property {Array<Object>} projectFormConfig - Configuration for the project form fields.
 * 
 * @method submitCategorieCreation - Submits the creation of a new category. 
 * Calls the sprint service to add the new category if the project ID is available. 
 * Emits the `categorieCreated` event with the newly created category.
 * 
 * @method cancelCreation - Cancels the creation of the category. 
 * Emits the `formCancel` event to notify the parent component.
 * 
 * @constructor
 * @param {SprintService} sprintService - Service to handle sprint-related operations.
 */


import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Projet } from '../../models/projet';
import { CategorieTache } from '../../models/categorie-tache';
import { SprintService } from '../../service/sprint.service';
import { Sprint } from '../../models/sprint';

@Component({
  selector: 'app-create-categorie-form',
  templateUrl: './create-categorie-form.component.html',
  styleUrl: './create-categorie-form.component.css'
})
export class CreateCategorieFormComponent {

  @Output() formCancel = new EventEmitter<void>();
  @Input() project!: Projet;
  @Input() sprint!: Sprint;
  newCategorie: CategorieTache = new CategorieTache();
  @Output() categorieCreated = new EventEmitter<CategorieTache>();


  projectFormConfig = [
    { id: 'nom', name: 'nom', label: 'Nom de la catégorie', type: 'text', required: true },
  ];


  constructor(private sprintService: SprintService) { }

  submitCategorieCreation(): void {

    if (this.project._id) {
      console.log(this.project._id, " et sprint : ", this.sprint._id)
      this.sprintService.addcategorietacge(this.project._id, this.sprint._id, this.newCategorie).subscribe((newcat: any) => {
        console.log("categorie in form : " + newcat.categorie)
        this.categorieCreated.emit(newcat.categorie);
      });
    }
  }

  cancelCreation(): void {
    this.formCancel.emit(); // Informe le parent que la création est annulée
  }

}
