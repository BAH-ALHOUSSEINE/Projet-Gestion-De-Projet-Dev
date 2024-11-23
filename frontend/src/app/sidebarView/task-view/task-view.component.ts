import { Component, Inject } from '@angular/core';
import { SprintService } from '../../service/sprint.service';
import { Projet } from '../../models/projet';
import { Sprint } from '../../models/sprint';
import { Status } from '../../models/status.enum';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrl: './task-view.component.css'
})
export class TaskViewComponent {


constructor(
  @Inject('project') public project: Projet
  ,private sprintService : SprintService){

    console.log("project in task : ", project._id)
  }

  createSprint()
  {
    let dd = new Date();
    let df = new Date();
    let st = Status.EnAttente;
    let s = new Sprint()
    s.date_debut = dd;
    s.date_fin = df;
    s.status = Status.EnAttente;
    s.categorie_tache = []
    if(this.project._id)
      this.sprintService.addSprintForCurrentProject(this.project._id, s);
  }

}
