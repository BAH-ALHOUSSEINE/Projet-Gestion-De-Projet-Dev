import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Status } from '../../models/status.enum';
import { SprintService } from '../../service/sprint.service';
import { Projet } from '../../models/projet';
import { Sprint } from '../../models/sprint';

@Component({
  selector: 'app-create-sprint-form',
  templateUrl: './create-sprint-form.component.html',
  styleUrl: './create-sprint-form.component.css'
})
export class CreateSprintFormComponent {
  @Output() formCancel = new EventEmitter<void>();
  @Input() project!: Projet;  // Ajoutez cette ligne pour recevoir le projet
  newSprint : Sprint = new Sprint();

  @Output() sprintCreated = new EventEmitter<Sprint>();  

  projectFormConfig = [
    { id: 'dateDebut', name: 'date_debut', label: 'Date de début', type: 'date', required: true },
    { id: 'dateFin', name: 'date_fin', label: 'Date de fin', type: 'date', required: true },
    {id: 'status',name: 'status',label: 'Catégorie',type: 'select',required: true,
      options: [
        { value: Status.EnAttente, label: Status.EnAttente },
        { value: Status.EnCours, label: Status.EnCours },
        { value: Status.Termine, label: Status.Termine },
      ],
    }
  ];

  constructor(private sprintService: SprintService) {}



  submitSprintCreation(): void {
    if (this.project._id) {
      this.sprintService.addSprintForCurrentProject(this.project._id, this.newSprint).subscribe((newSprint: any) => {
        
        this.sprintCreated.emit(newSprint); // Émet l'événement avec le sprint créé

      });
    }
  }
  
  cancelCreation(): void {
    this.formCancel.emit(); // Informe le parent que la création est annulée
  }

}
