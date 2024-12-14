
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Status } from '../../models/status.enum';
import { SprintService } from '../../service/sprint.service';
import { Projet } from '../../models/projet';
import { Tache } from '../../models/tache';
import { Sprint } from '../../models/sprint';
import { CategorieTache } from '../../models/categorie-tache';
import { response } from 'express';

@Component({
  selector: 'app-create-tache-form',
  templateUrl: './create-tache-form.component.html',
  styleUrl: './create-tache-form.component.css'
})
export class CreateTacheFormComponent {


  @Output() formCancel = new EventEmitter<void>();
  @Input() project!: Projet; 
  @Input() sprint! : Sprint; // Ajoutez cette ligne pour recevoir le projet
  newtache : Tache = new Tache();
  @Input() categorie  :  string | undefined;
  @Output()  tachecreated = new EventEmitter<Tache>(); 
 
  constructor(private sprintService: SprintService) {}


  projectFormConfig = [
    { id: 'description', name: 'description', label: 'Description du tache', type: 'text', required: true },
    {id: 'date_echeance',name: 'date_echeance',label: 'Date echeance',type: 'date',required: true},
    {id: 'status',name: 'status',label: 'status',type: 'select',required: true,
      options: [
        { value: Status.Afaire, label: Status.Afaire},
        { value: Status.EnCours, label: Status.EnCours },
        { value: Status.Termine, label: Status.Termine },
      ],
    },
    {id: 'prioritie',name: 'priorite',label: 'prioritie',type: 'select',required: true,
      options: [
        { value: Status.Base, label: Status.Base},
        { value: Status.Moyenne, label: Status.Moyenne },
        { value: Status.Haute, label: Status.Haute },
      ],
    }
  ];



  cancelCreation(): void {
    this.formCancel.emit(); // Informe le parent que la création est annulée
  }


  submitTacheCreation (): void {

    alert(this.newtache.date_echeance);

    this.sprintService.addtache(this.project._id,this.sprint._id,this.categorie,this.newtache).subscribe((response : any )=>{


        

              this.tachecreated.emit(response);
    })

      
  }


}

