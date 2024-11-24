import { Component } from '@angular/core';

@Component({
  selector: 'app-create-sprint-form',
  templateUrl: './create-sprint-form.component.html',
  styleUrl: './create-sprint-form.component.css'
})
export class CreateSprintFormComponent {


  projectFormConfig = [
    { id: 'dateDebut', name: 'date_debut', label: 'Date de début', type: 'date', required: true },
    { id: 'dateFin', name: 'date_fin', label: 'Date de fin', type: 'date', required: true }
  ];

}
