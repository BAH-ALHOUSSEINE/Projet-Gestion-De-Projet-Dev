import { Component, Inject,ChangeDetectorRef } from '@angular/core';
import { Projet } from '../../models/projet';
import { MatDialog } from '@angular/material/dialog';
import { PopupadduserComponent } from '../../popupadduser/popupadduser.component';
import {ProjetService} from  '../../service/projet.service';
import { ProjectDetailComponent } from '../../project-detail/project-detail.component';
import { User } from '../../models/user';
@Component({
  selector: 'app-about-view',
  templateUrl: './about-view.component.html',
  styleUrl: './about-view.component.css'
})
export class AboutViewComponent {
  showdiallogue   ?: boolean; 
  user  : User = new User();
  error  : number = 0;
  errorMessage  : String ="";
    
  constructor(@Inject('project') public project: Projet,private cdr: ChangeDetectorRef,private serviveproject : ProjetService, private projectdetail : ProjectDetailComponent ) {

    console.log("ça marche ?")
   // console.log(project)
  }

  Annuler(){
    this.showdiallogue=false;
 }
 
 ajoutermembre() {
  this.serviveproject.addmembre(this.project._id, this.user).subscribe({
    next: (updatedProject) => {
      this.project = updatedProject;
      this.projectdetail.update(updatedProject); // Met à jour le projet localement
      this.cdr.detectChanges();// Notifie les autres composants
      this.showdiallogue = false;
    },
    error: (error) => {
      if (error.status === 401) {
        this.error = 1;
        this.errorMessage = error.error.error; // Message d'erreur de l'API
      } else {
        console.error(error);
      }
    },
  });
}


   openDialog(){
    this.showdiallogue=true;
   }

   formatDateInFrench(date: Date): string {
    return date.toLocaleDateString("fr-FR", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  }


}
