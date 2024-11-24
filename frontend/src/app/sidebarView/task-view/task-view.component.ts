import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef, Inject } from '@angular/core';
import { SprintService } from '../../service/sprint.service';
import { Projet } from '../../models/projet';
import { Sprint } from '../../models/sprint';
import { Status } from '../../models/status.enum';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrl: './task-view.component.css',
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskViewComponent {
  projectMock = new Projet();
  isDropdownOpen = false;
  selectedSprint: Sprint = new Sprint()
  current_index_sprint = 0;
  sidepanel = false;

  constructor(
    @Inject('project') public project: Projet,
    private sprintService: SprintService,
    private cdr: ChangeDetectorRef
  ) {
    this.projectMock = this.project;
    console.log("mock : ", this.projectMock);
    if (this.projectMock.sprints?.[0]) {
      this.selectedSprint = this.projectMock.sprints[0]; // Correct usage
    }
  }

  openSidePanel()
  {
    this.sidepanel = true;
    this.isDropdownOpen = false;
  }

  closeSidePanel()
  {
    this.sidepanel = false;
  }

  createSprint() {
    let dd = new Date();
    let df = new Date();
    let st = Status.EnAttente;
    let s = new Sprint();
    s.date_debut = dd;
    s.date_fin = df;
    s.status = Status.EnAttente;
    s.categorie_tache = [];
    if (this.project._id) {
      this.sprintService.addSprintForCurrentProject(this.project._id, s).subscribe((newSprint: Sprint) => {
        // Ajoute le nouveau sprint directement à la liste des sprints
        this.projectMock.sprints?.push(newSprint);
        
        // Force la détection des changements
        this.cdr.detectChanges();
      });
    }
  }

  selectSprint(sprint: any, index : any) {
    this.selectedSprint = sprint.date_debut; // Met à jour la sélection
    this.current_index_sprint = index;
    this.isDropdownOpen = false; // Ferme le menu après la sélection
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
}