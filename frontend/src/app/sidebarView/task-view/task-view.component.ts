import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef, Inject } from '@angular/core';
import { SprintService } from '../../service/sprint.service';
import { Projet } from '../../models/projet';
import { Sprint } from '../../models/sprint';
import { Status } from '../../models/status.enum';
import { Subject, takeUntil } from 'rxjs';
import { CategorieTache } from '../../models/categorie-tache';
import { ThisReceiver } from '@angular/compiler';
import { Router } from '@angular/router';
import { Tache } from '../../models/tache';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrl: './task-view.component.css',
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskViewComponent {

  projectMock = new Projet();

  
  selectedSprint: Sprint = new Sprint()
  selectedSprintIndex: number = 2;
  sprint_creation: boolean = false;
  tache_creation  : boolean = false;

  information ? : String;

  sidePanel : boolean = false;

  categorie_creation : boolean = false;
  selectedCategories : CategorieTache[] = [];
  categorie ? : String;




  constructor(
    @Inject('project') public project: Projet,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {

    this.projectMock = this.project;
  }

  ngOnInit(): void {
    console.log("eee",this.project)
    if (this.projectMock.sprints && this.projectMock.sprints.length > 0) {
      this.selectedSprintIndex = 0;
      this.selectedSprint = this.projectMock.sprints[this.selectedSprintIndex];
      console.log(this.projectMock.sprints[this.selectedSprintIndex].categorie_tache);
    } else {
      console.warn('Aucun sprint trouvé dans le projet.');
      this.selectedSprintIndex = -1; 
      this.selectedSprint = new Sprint();
    }


    this.sidePanel = false;
    this.sprint_creation = false;
    this.categorie_creation= false;
    


  }

  closeSprintCreation()
  {
    this.sprint_creation = false;
    this.sidePanel = false;
  }

  openSprintCreation()
  {
    this.sprint_creation = true;
    this.sidePanel = true;
  }


  handleSprintCreated(newSprint: Sprint): void {
    if (!this.projectMock.sprints) {
      this.projectMock.sprints = [];
    }
    this.projectMock.sprints.push(newSprint); // Ajoute le sprint à la liste existante
    console.log("my new list of sprint : " ,this.projectMock.sprints)
    this.closeSprintCreation(); // Ferme le formulaire de création
  }

  onSprintSelect(event: Event): void {
    const selectedIndex = (event.target as HTMLSelectElement).value;
    this.selectedSprint = this.projectMock.sprints![+selectedIndex];
    alert(this.selectedSprint._id);
    console.log("selected sprint: ", this.selectedSprintIndex);
  }


  closeCategorieCreation()
  {
    this.categorie_creation = false;
    this.sidePanel = false;
  }

  openCategorieCreation()
  {
    this.categorie_creation = true;
    this.sidePanel = true;
  }

  openTacheCreation(index: number) {
    
    console.log("selectedSprintIndex : ", this.selectedSprintIndex);
    console.log("Categgggggggggggggggggggorie Tache : ", this.projectMock.sprints![this.selectedSprintIndex].categorie_tache);
    if (this.projectMock.sprints![this.selectedSprintIndex].categorie_tache![index]) {
      this.categorie = this.projectMock.sprints![this.selectedSprintIndex].categorie_tache![index]._id;
      alert(this.projectMock.sprints![this.selectedSprintIndex].categorie_tache![index]._id);
      this.tache_creation = true;
      this.sidePanel = true;
    } else {
      console.warn("Index de catégorie invalide.");
    }
  }
  

  closetacheCreation()
  {
    this.tache_creation = false;
    this.sidePanel = false;
  }


  handleCategorieCreated(newCategorie: CategorieTache): void {
    alert("eeeeeeeeeeeeeeeeeee");
    if (!this.projectMock.sprints![this.selectedSprintIndex].categorie_tache) {
      this.projectMock.sprints![this.selectedSprintIndex].categorie_tache = [];
    }
    console.log("index for add : " , this.selectedSprintIndex)
    this.projectMock.sprints![this.selectedSprintIndex].categorie_tache?.push(newCategorie) // Ajoute le sprint à la liste existante
    console.log("cattache : " , this.projectMock.sprints![this.selectedSprintIndex].categorie_tache)
    this.closeCategorieCreation(); // Ferme le formulaire de création
    console.log("hehehe");
   
  }

  toggleCategorie(categorie: CategorieTache): void {
    const pos = this.selectedCategories.indexOf(categorie);
    if (pos > -1) {
      // Si l'index est déjà sélectionné, on le retire
      this.selectedCategories.splice(pos, 1);
    } else {
      // Sinon, on l'ajoute
      this.selectedCategories.push(categorie);
    }
  }

  getIdcategorie(){
    return this.categorie;
  }

  handleTacheCreated(newCategorie: CategorieTache): void {
    if (!this.projectMock.sprints![this.selectedSprintIndex].categorie_tache) {
      this.projectMock.sprints![this.selectedSprintIndex].categorie_tache = [];
    }
    console.log("index for add : " , this.selectedSprintIndex)
    this.projectMock.sprints![this.selectedSprintIndex].categorie_tache?.push(newCategorie) // Ajoute le sprint à la liste existante
    console.log("cattache : " , this.projectMock.sprints![this.selectedSprintIndex].categorie_tache)
    this.closeCategorieCreation(); // Ferme le formulaire de création
    console.log("hehehe");
  }


  taskOfCategorie(categorie: CategorieTache): Tache[] {
    // Vérifie si la catégorie est dans les catégories ouvertes
    let task : Tache[] = [];
    this.selectedCategories.map(ct =>
    {
      if(ct._id == categorie._id)
      {task = ct.taches!;}})
    return task;
  }


}

