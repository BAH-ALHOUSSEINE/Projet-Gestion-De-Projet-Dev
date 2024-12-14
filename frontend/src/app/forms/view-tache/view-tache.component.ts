import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Tache } from '../../models/tache';
import { CategorieTache } from '../../models/categorie-tache';
import { Projet } from '../../models/projet';
import { Status } from '../../models/status.enum';
import { Sprint } from '../../models/sprint';
import { TacheService } from '../../service/tache.service';

@Component({
  selector: 'app-view-tache',
  templateUrl: './view-tache.component.html',
  styleUrl: './view-tache.component.css'
})
export class ViewTacheComponent {
  @Input() task!: Tache;
  @Input() project!: Projet;
  @Input() sprint!: Sprint;
  @Input() categorie: string | undefined;
  @Output() formCancel = new EventEmitter<void>(); // Événement pour annuler la modification
  @Output() taskUpdated = new EventEmitter<Tache>();

  formHeader: string = ''; // Initialize with a default value

  projectFormConfig: any[] = [];
  constructor(private tacheService: TacheService) {}

  

  formData: any = {};


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['task'] && this.task) {
      // Normalisation de date_echeance uniquement si elle existe
      if (this.task.date_echeance && !(this.task.date_echeance instanceof Date)) {
        this.task.date_echeance = new Date(this.task.date_echeance);
      }
      this.updateFormData();
    }
  }

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
          { value: "Aucun", label: 'Aucun' }, // Option par défaut
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

  cancelCreation(): void {
    this.formCancel.emit(); // Informe le parent que la création est annulée
  }

  submitTacheCreation(): void {

    let new_task : Tache = new Tache();
    new_task._id = this.task._id;
    new_task.description = this.formData.description

    new_task.date_echeance = new Date(this.formData.date_echeance)

    new_task.membre = this.formData.membre
    new_task.status = this.formData.status
    new_task.priorite = this.formData.priorite
    console.log("new : ", new_task);
    this.tacheService.updateTache(
    this.project._id,    // Make sure this is correctly assigned
    this.sprint._id,     // Make sure this is correctly assigned
    this.categorie,      // Ensure this is not undefined
    this.task!._id,      // Ensure this is not undefined
    new_task
  ).subscribe(response => {
    console.log(response)
    this.taskUpdated.emit(new_task);
  });

    
  }

  updateFormData() {
  
    this.formData.description = this.task.description;
    this.formData.status = this.task.status;
    this.formData.priorite = this.task.priorite;
    this.formData.membre = this.task.membre?._id ? this.task.membre._id : 'Aucun';


 // Vérification et conversion explicite de date_echeance
 if (this.task.date_echeance) {
  const dateEcheance = this.task.date_echeance instanceof Date
    ? this.task.date_echeance
    : new Date(this.task.date_echeance);

  this.formData.date_echeance = dateEcheance.toISOString().split('T')[0];
    } else {
      this.formData.date_echeance = ''; // Valeur par défaut si date_echeance est indéfinie
    }

    this.formData.date_echeance = this.task.date_echeance?.toISOString().split('T')[0];

    console.log("Membre data: ", this.formData.membre);
  }




}
