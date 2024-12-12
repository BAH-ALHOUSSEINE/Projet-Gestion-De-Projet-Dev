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
  @Input() sprint! : Sprint;
  newCategorie: CategorieTache = new CategorieTache(); 
  @Output() categorieCreated = new EventEmitter<CategorieTache>(); 


  projectFormConfig = [
    { id: 'nom', name: 'nom', label: 'Nom de la catégorie', type: 'text', required: true },
  ];


 



  constructor(private sprintService: SprintService) {}



  submitCategorieCreation(): void {
   
    if (this.project._id) {
      console.log(this.project._id, " et sprint : ", this.sprint._id)
       this.sprintService.addcategorietacge(this.project._id,this.sprint._id ,this.newCategorie).subscribe( (newcat : any) => {
        console.log("new object : " , newcat)
        alert("sssssssssssss"+newcat.nouvelleCategorie._id);
        this.categorieCreated.emit(newcat.nouvelleCategorie); 

    });
    }

  }
  
  cancelCreation(): void {
    this.formCancel.emit(); // Informe le parent que la création est annulée
  }

}
