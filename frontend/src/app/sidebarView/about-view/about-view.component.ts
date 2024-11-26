import { Component, Inject } from '@angular/core';
import { Projet } from '../../models/projet';

@Component({
  selector: 'app-about-view',
  templateUrl: './about-view.component.html',
  styleUrl: './about-view.component.css'
})
export class AboutViewComponent {


  constructor(@Inject('project') public project: Projet) {

    console.log("ça marche ?")
   // console.log(project)
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
