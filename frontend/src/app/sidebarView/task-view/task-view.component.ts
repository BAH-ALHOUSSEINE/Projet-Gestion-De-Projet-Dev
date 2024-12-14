import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef, Inject } from '@angular/core';
import { SprintService } from '../../service/sprint.service';
import { Projet } from '../../models/projet';
import { Sprint } from '../../models/sprint';
import { Status, StatusColor } from '../../models/status.enum';
import { Subject, takeUntil } from 'rxjs';
import { CategorieTache } from '../../models/categorie-tache';
import { ThisReceiver } from '@angular/compiler';
import { Router } from '@angular/router';
import { Tache } from '../../models/tache';
import { ProjetService } from '../../service/projet.service';
import { User } from '../../models/user';
import { TacheService } from '../../service/tache.service';

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
  categorie ? : string;


  current_tache : Tache = new Tache();
  tache_view : boolean = false;




  constructor(
    @Inject('project') public project: Projet,
    public projetService : ProjetService,
    public taskService : TacheService,
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
    this.closeAll();
    this.sprint_creation = true;
    this.sidePanel = true;
  }


  handleSprintCreated(newSprint: Sprint): void {
    if (!this.projectMock.sprints) {
      this.projectMock.sprints = [];
    }
    this.projectMock.sprints.push(newSprint); // Ajoute le sprint à la liste existante
    console.log("my new list of sprint : " ,this.projectMock.sprints)
    this.closeAll();
  }

  onSprintSelect(event: Event): void {
    const selectedIndex = (event.target as HTMLSelectElement).value;
    this.selectedSprint = this.projectMock.sprints![+selectedIndex];
  
    console.log("selected sprint: ", this.selectedSprintIndex);
  }


  closeCategorieCreation()
  {
    this.categorie_creation = false;
    this.sidePanel = false;
  }

  openCategorieCreation()
  {
    this.closeAll();
    this.categorie_creation = true;
    this.sidePanel = true;
  }

  openTacheCreation(index: number) {
    this.closeAll();
    
    // console.log("selectedSprintIndex : ", this.selectedSprintIndex);
    // console.log("Categgggggggggggggggggggorie Tache : ", this.projectMock.sprints![this.selectedSprintIndex].categorie_tache);
    if (this.projectMock.sprints![this.selectedSprintIndex].categorie_tache![index]) {
      this.categorie = this.projectMock.sprints![this.selectedSprintIndex].categorie_tache![index]._id;
      // alert(this.projectMock.sprints![this.selectedSprintIndex].categorie_tache![index]._id);
      this.tache_creation = true;
      this.sidePanel = true;
    } else {
      console.warn("Index de catégorie invalide.");
    }
  }
  




  handleCategorieCreated(newCategorie: CategorieTache): void {
    // alert("eeeeeeeeeeeeeeeeeee");
    if (!this.projectMock.sprints![this.selectedSprintIndex].categorie_tache) {
      this.projectMock.sprints![this.selectedSprintIndex].categorie_tache = [];
    }
    console.log("index for add : " , this.selectedSprintIndex)
    this.projectMock.sprints![this.selectedSprintIndex].categorie_tache?.push(newCategorie) // Ajoute le sprint à la liste existante
    console.log("cattache : " , this.projectMock.sprints![this.selectedSprintIndex].categorie_tache)
    this.closeAll();
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

  handleTacheCreated(newTache: Tache): void {
    this.closeAll()
    console.log("jen ai marre : " + this.categorie)
  

      for(const c of this.projectMock.sprints![this.selectedSprintIndex].categorie_tache!)
      {
        if(c._id == this.categorie)
        {
          console.log("jen ai marre : " + this.categorie)
          c.taches?.push(newTache)
        }
      }
  

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

  setCurrentTask(t : Tache, index : number)
  {
    console.log("NANI?")
    this.closeAll()
    //console.log(t.description)
    this.categorie = this.projectMock.sprints![this.selectedSprintIndex].categorie_tache![index]._id;
    this.current_tache = t;
    console.log(this.current_tache._id)
    this.sidePanel = true;
    this.tache_view = true;
    
  }

  deleteTask(t: Tache, index: number) {
    // Récupérer la liste des tâches de la catégorie spécifique
    const taches = this.projectMock.sprints![this.selectedSprintIndex].categorie_tache![index].taches!;
  
    // Trouver l'index de la tâche à supprimer
    const taskIndex = taches.findIndex(task => task._id === t._id);
  
    // Si la tâche existe, la supprimer
    if (taskIndex !== -1) {
      taches.splice(taskIndex, 1); // Retire la tâche de la liste
    }

    this.taskService.deleteTache(
      this.projectMock._id,
      this.selectedSprint._id,
      this.projectMock.sprints![this.selectedSprintIndex].categorie_tache![index]._id,
      t._id).subscribe(response => {
        console.log(response)
        
      });


  }


  closeAll()
  {
    this.categorie_creation = false;
    this.tache_creation = false;
    this.sprint_creation = false;
    this.tache_view = false;
    this.sidePanel = false;
  }


  handleTaskUpdated(updatedTask: Tache): void {
    this.closeAll()
  
    console.log("eeeeeee"+ updatedTask.membre)
    if (!this.projectMock.sprints) return;

    for (const sprint of this.projectMock.sprints) {
        if (!sprint.categorie_tache) continue;

        for (const categorie of sprint.categorie_tache) {
            if (!categorie.taches) continue;

            // Recherche de la tâche à mettre à jour
            const taskIndex = categorie.taches.findIndex(t => t._id === updatedTask._id);
            if (taskIndex !== -1) {
                const membre = this.project.membres!.find((m: User) => m._id === updatedTask.membre);
                console.log("mmememe"+membre)
                updatedTask.membre = membre
                // Met à jour la tâche existante
                categorie.taches[taskIndex] = updatedTask;
                console.log(`Tâche mise à jour avec succès : ${updatedTask._id}`);
                return;
            }
        }
    }

    console.log(`Tâche non trouvée : ${updatedTask._id}`);
}



statusColor(status?: string): string {
  if (!status) {
      return '#000000'; // Retourner une couleur par défaut (par exemple, noir) si `status` est undefined
  }

  switch (status) {
      case Status.Afaire:
          return StatusColor.Afaire; 
      case Status.EnCours:
          return StatusColor.EnCours;
      case Status.Termine:
          return StatusColor.Termine; 
      default:
          return '#000000'; 
  }
}


}

