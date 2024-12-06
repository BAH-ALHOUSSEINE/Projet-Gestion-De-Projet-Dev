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

  projectMock : Projet = new Projet();
    
  constructor(@Inject('project') public project: Projet,private cdr: ChangeDetectorRef,private serviveproject : ProjetService, private projectdetail : ProjectDetailComponent ) {

    console.log("ça marche ?")
   // console.log(project)
   this.projectMock = this.project;
  }

  Annuler(){
    this.showdiallogue=false;
 }
 
 ajoutermembre() {
  console.log("user-email : ", this.user.email)
  this.serviveproject.addmembre(this.project._id, this.user).subscribe((newUser: User) => {

    this.projectMock.membres?.push(newUser)
        
    console.log("new user : ", newUser)
    this.cdr.detectChanges();


  });
}

deleteprojetmembre(email: string | undefined) {
  if (!email) {
    console.error("Email non spécifié !");
    return;
  }

  this.serviveproject.deleteProjectmemebre(this.project._id, email).subscribe({
    next: (response: User) => {
      // Suppression locale du membre dans le tableau des membres
      this.project.membres = this.project.membres?.filter(membre => membre.email !== email);
      // Met à jour la vue avec ChangeDetectorRef
      this.cdr.detectChanges();
      console.log(`Membre avec l'email ${email} supprimé avec succès.`);
    },
    error: (err) => {
      console.error("Erreur lors de la suppression du membre :", err);
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
