import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef, Inject } from '@angular/core';
import { SprintService } from '../../service/sprint.service';
import { Projet } from '../../models/projet';
import { Sprint } from '../../models/sprint';
import { Status } from '../../models/status.enum';
import { Subject, takeUntil } from 'rxjs';
import { CategorieTache } from '../../models/categorie-tache';
import { ThisReceiver } from '@angular/compiler';
import { Router } from '@angular/router';

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
  sprint : Sprint = new Sprint();
  creation_sprint ? : boolean;
  creation_categorie_tache ? : boolean;
  affichage_sprint ? : boolean;
  categorie_tache  : CategorieTache = new CategorieTache ();
  idsprint  ? : string ;



  constructor(
    @Inject('project') public project: Projet,
    private sprintService: SprintService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {
    this.projectMock = this.project;
    console.log("modddddddddddddck : ", this.projectMock.sprints);
    
    
  }

  ngOnInit(): void {

    this.creation_sprint=false;
    this.creation_categorie_tache=false;
    this.affichage_sprint = true;
   
   
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

  
    
    if (this.project._id) {
      this.sprintService.addSprintForCurrentProject(this.project._id, this.sprint).subscribe((newSprint: Sprint) => {
        // Ajoute le nouveau sprint directement à la liste des sprints
        this.router.navigate([`/${this.project._id}`]);
        // Force la détection des changements
      });
    }
  }


  createcategorietache (){

    
    
    this.sprintService.addcategorietacge(this.project._id,this.idsprint ,this.categorie_tache).subscribe( (newcat : CategorieTache) => {
      this.router.navigate([`/${this.project._id}`]);
    });
  }

  selectSprint(sprint: any, index : any) {
    this.selectedSprint = sprint.date_debut; // Met à jour la sélection
    this.current_index_sprint = index;
    this.isDropdownOpen = false; // Ferme le menu après la sélection
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }



  affiher_form_sprint(){

    
    this.creation_sprint=true;
    this.creation_categorie_tache=false;
    this.affichage_sprint = false;

    }

    affiher_form_categorie(){

      this.creation_sprint=false;
      this.creation_categorie_tache=true;
      this.affichage_sprint = false;

    }

}

