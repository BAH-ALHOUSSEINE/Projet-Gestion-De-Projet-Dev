import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Tache } from '../../models/tache';
import { Projet } from '../../models/projet';
import { Status } from '../../models/status.enum';
import { Sprint } from '../../models/sprint';
import { TacheService } from '../../service/tache.service';

@Component({
  selector: 'app-view-tache',
  templateUrl: './view-tache.component.html',
  styleUrl: './view-tache.component.css'
})/**
* Component for viewing and editing a task.
* 
* @selector app-view-tache
* @templateUrl ./view-tache.component.html
* @styleUrl ./view-tache.component.css
*/
export class ViewTacheComponent {
  /**
   * The task to be viewed or edited.
   */
  @Input() task!: Tache;

  /**
   * The project associated with the task.
   */
  @Input() project!: Projet;

  /**
   * The sprint associated with the task.
   */
  @Input() sprint!: Sprint;

  /**
   * The category of the task.
   */
  @Input() categorie: string | undefined;

  /**
   * Event emitted when the form is cancelled.
   */
  @Output() formCancel = new EventEmitter<void>();

  /**
   * Event emitted when the task is updated.
   */
  @Output() taskUpdated = new EventEmitter<Tache>();

  /**
   * The header of the form.
   */
  formHeader: string = '';

  /**
   * Configuration for the project form.
   */
  projectFormConfig: any[] = [];

  /**
   * Data for the form.
   */
  formData: any = {};

  /**
   * Constructor for ViewTacheComponent.
   * 
   * @param tacheService - Service for handling task operations.
   */
  constructor(private tacheService: TacheService) { }

  /**
   * Lifecycle hook that is called when any data-bound property of a directive changes.
   * 
   * @param changes - The changed properties.
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['task'] && this.task) {
      if (this.task.date_echeance && !(this.task.date_echeance instanceof Date)) {
        this.task.date_echeance = new Date(this.task.date_echeance);
      }
      this.updateFormData();
    }
  }

  /**
   * Lifecycle hook that is called after data-bound properties of a directive are initialized.
   */
  ngOnInit() {
    this.projectFormConfig = [
      { id: 'description', name: 'description', label: 'Description du tache', type: 'text', required: true },
      { id: 'date_echeance', name: 'date_echeance', label: 'Date echeance', type: 'date', required: true },
      {
        id: 'status',
        name: 'status',
        label: 'status',
        type: 'select',
        required: true,
        options: [
          { value: Status.Afaire, label: Status.Afaire },
          { value: Status.EnCours, label: Status.EnCours },
          { value: Status.Termine, label: Status.Termine },
        ],
      },
      {
        id: 'prioritie',
        name: 'priorite',
        label: 'prioritie',
        type: 'select',
        required: true,
        options: [
          { value: Status.Base, label: Status.Base },
          { value: Status.Moyenne, label: Status.Moyenne },
          { value: Status.Haute, label: Status.Haute },
        ],
      },
      {
        id: 'membre',
        name: 'membre',
        label: 'Membre',
        type: 'select',
        required: true,
        options: [
          { value: "Aucun", label: 'Aucun' },
          ...(this.project?.membres?.map(user => ({
            value: user._id,
            label: `${user.prenom}`
          })) || []),
        ],
      },
    ];

    this.formData.description = this.task.description;
    this.formData.status = this.task.status;
    this.formData.priorite = this.task.priorite;
    this.formData.date_echeance = this.task.date_echeance?.toISOString().split('T')[0];
    this.formData.membre = this.task.membre?._id ? this.task.membre._id : 'Aucun';
  }

  /**
   * Cancels the creation of the task and emits the formCancel event.
   */
  cancelCreation(): void {
    this.formCancel.emit();
  }

  /**
   * Submits the task creation form and updates the task.
   */
  submitTacheCreation(): void {
    let new_task: Tache = new Tache();
    new_task._id = this.task._id;
    new_task.description = this.formData.description;
    new_task.date_echeance = new Date(this.formData.date_echeance);
    new_task.membre = this.formData.membre;
    new_task.status = this.formData.status;
    new_task.priorite = this.formData.priorite;

    this.tacheService.updateTache(
      this.project._id,
      this.sprint._id,
      this.categorie,
      this.task!._id,
      new_task
    ).subscribe(response => {
      this.taskUpdated.emit(new_task);
    });
  }

  /**
   * Updates the form data with the current task values.
   */
  updateFormData() {
    this.formData.description = this.task.description;
    this.formData.status = this.task.status;
    this.formData.priorite = this.task.priorite;
    this.formData.membre = this.task.membre?._id ? this.task.membre._id : 'Aucun';

    if (this.task.date_echeance) {
      const dateEcheance = this.task.date_echeance instanceof Date
        ? this.task.date_echeance
        : new Date(this.task.date_echeance);

      this.formData.date_echeance = dateEcheance.toISOString().split('T')[0];
    } else {
      this.formData.date_echeance = '';
    }
  }
}





