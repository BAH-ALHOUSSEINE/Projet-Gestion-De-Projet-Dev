import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef, Inject } from '@angular/core';
import { Projet } from '../../models/projet';
import { Sprint } from '../../models/sprint';
import { Status, StatusColor } from '../../models/status.enum';
import { CategorieTache } from '../../models/categorie-tache';
import { Router } from '@angular/router';
import { Tache } from '../../models/tache';
import { ProjetService } from '../../service/projet.service';
import { User } from '../../models/user';
import { TacheService } from '../../service/tache.service';

/**
 * Component for viewing and managing tasks within a project.
 */
@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrl: './task-view.component.css',
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskViewComponent {

  /**
   * Mock project data.
   */
  projectMock = new Projet();

  /**
   * Currently selected sprint.
   */
  selectedSprint: Sprint = new Sprint();

  /**
   * Index of the currently selected sprint.
   */
  selectedSprintIndex: number = 2;

  /**
   * Flag indicating if sprint creation panel is open.
   */
  sprint_creation: boolean = false;

  /**
   * Flag indicating if task creation panel is open.
   */
  tache_creation: boolean = false;

  /**
   * Optional information string.
   */
  information?: String;

  /**
   * Flag indicating if the side panel is open.
   */
  sidePanel: boolean = false;

  /**
   * Flag indicating if category creation panel is open.
   */
  categorie_creation: boolean = false;

  /**
   * List of selected categories.
   */
  selectedCategories: CategorieTache[] = [];

  /**
   * Optional selected category ID.
   */
  categorie?: string;

  /**
   * Currently selected task.
   */
  current_tache: Tache = new Tache();

  /**
   * Flag indicating if task view panel is open.
   */
  tache_view: boolean = false;

  /**
   * Constructor for TaskViewComponent.
   * @param project Injected project data.
   * @param projetService Service for managing projects.
   * @param taskService Service for managing tasks.
   * @param cdr Change detector reference.
   * @param router Router for navigation.
   */
  constructor(
    @Inject('project') public project: Projet,
    public projetService: ProjetService,
    public taskService: TacheService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {
    this.projectMock = this.project;
  }

  /**
   * Lifecycle hook that is called after data-bound properties are initialized.
   */
  ngOnInit(): void {
    if (this.projectMock.sprints && this.projectMock.sprints.length > 0) {
      this.selectedSprintIndex = 0;
      this.selectedSprint = this.projectMock.sprints[this.selectedSprintIndex];
    } else {
      console.warn('Aucun sprint trouvé dans le projet.');
      this.selectedSprintIndex = -1;
      this.selectedSprint = new Sprint();
    }

    this.sidePanel = false;
    this.sprint_creation = false;
    this.categorie_creation = false;
  }

  /**
   * Closes the sprint creation panel.
   */
  closeSprintCreation(): void {
    this.sprint_creation = false;
    this.sidePanel = false;
  }

  /**
   * Opens the sprint creation panel.
   */
  openSprintCreation(): void {
    this.closeAll();
    this.sprint_creation = true;
    this.sidePanel = true;
  }

  /**
   * Handles the creation of a new sprint.
   * @param newSprint The newly created sprint.
   */
  handleSprintCreated(newSprint: Sprint): void {
    console.log("new sprint" + newSprint);
    if (!this.projectMock.sprints) {
      this.projectMock.sprints = [];
    }
    this.projectMock.sprints.push(newSprint);
    console.log("my new list of sprint: ", this.projectMock.sprints);
    this.closeAll();
  }

  /**
   * Handles the selection of a sprint.
   * @param event The event triggered by selecting a sprint.
   */
  onSprintSelect(event: Event): void {
    const selectedIndex = (event.target as HTMLSelectElement).value;
    this.selectedSprint = this.projectMock.sprints![+selectedIndex];
    console.log("selected sprint: ", this.selectedSprintIndex);
  }

  /**
   * Closes the category creation panel.
   */
  closeCategorieCreation(): void {
    this.categorie_creation = false;
    this.sidePanel = false;
  }

  /**
   * Opens the category creation panel.
   */
  openCategorieCreation(): void {
    this.closeAll();
    this.categorie_creation = true;
    this.sidePanel = true;
  }

  /**
   * Opens the task creation panel for a specific category.
   * @param index The index of the category.
   */
  openTacheCreation(index: number): void {
    this.closeAll();
    if (this.projectMock.sprints![this.selectedSprintIndex].categorie_tache![index]) {
      this.categorie = this.projectMock.sprints![this.selectedSprintIndex].categorie_tache![index]._id;
      this.tache_creation = true;
      this.sidePanel = true;
    } else {
      console.warn("Index de catégorie invalide.");
    }
  }

  /**
   * Handles the creation of a new category.
   * @param newCategorie The newly created category.
   */
  handleCategorieCreated(newCategorie: CategorieTache): void {
    if (!this.projectMock.sprints![this.selectedSprintIndex].categorie_tache) {
      this.projectMock.sprints![this.selectedSprintIndex].categorie_tache = [];
    }
    console.log("index for add: ", this.selectedSprintIndex);
    this.projectMock.sprints![this.selectedSprintIndex].categorie_tache?.push(newCategorie);
    console.log("catégorie tache: ", this.projectMock.sprints![this.selectedSprintIndex].categorie_tache);
    this.closeAll();
  }

  /**
   * Toggles the selection of a category.
   * @param categorie The category to toggle.
   */
  toggleCategorie(categorie: CategorieTache): void {
    const pos = this.selectedCategories.indexOf(categorie);
    if (pos > -1) {
      this.selectedCategories.splice(pos, 1);
    } else {
      this.selectedCategories.push(categorie);
    }
  }

  /**
   * Gets the ID of the selected category.
   * @returns The ID of the selected category.
   */
  getIdcategorie(): string | undefined {
    return this.categorie;
  }

  /**
   * Handles the creation of a new task.
   * @param newTache The newly created task.
   */
  handleTacheCreated(newTache: Tache): void {
    this.closeAll();
    for (const c of this.projectMock.sprints![this.selectedSprintIndex].categorie_tache!) {
      if (c._id == this.categorie) {
        c.taches?.push(newTache);
      }
    }
  }

  /**
   * Gets the tasks of a specific category.
   * @param categorie The category to get tasks for.
   * @returns The list of tasks for the category.
   */
  taskOfCategorie(categorie: CategorieTache): Tache[] {
    let task: Tache[] = [];
    this.selectedCategories.map(ct => {
      if (ct._id == categorie._id) {
        task = ct.taches!;
      }
    });
    return task;
  }

  /**
   * Sets the current task for viewing.
   * @param t The task to set as current.
   * @param index The index of the category containing the task.
   */
  setCurrentTask(t: Tache, index: number): void {
    this.closeAll();
    this.categorie = this.projectMock.sprints![this.selectedSprintIndex].categorie_tache![index]._id;
    this.current_tache = t;
    console.log(this.current_tache._id);
    this.sidePanel = true;
    this.tache_view = true;
  }

  /**
   * Deletes a task from a specific category.
   * @param t The task to delete.
   * @param index The index of the category containing the task.
   */
  deleteTask(t: Tache, index: number): void {
    const taches = this.projectMock.sprints![this.selectedSprintIndex].categorie_tache![index].taches!;
    const taskIndex = taches.findIndex(task => task._id === t._id);
    if (taskIndex !== -1) {
      taches.splice(taskIndex, 1);
    }

    this.taskService.deleteTache(
      this.projectMock._id,
      this.selectedSprint._id,
      this.projectMock.sprints![this.selectedSprintIndex].categorie_tache![index]._id,
      t._id).subscribe(response => {
        console.log(response);
      });
  }

  /**
   * Closes all open panels.
   */
  closeAll(): void {
    this.categorie_creation = false;
    this.tache_creation = false;
    this.sprint_creation = false;
    this.tache_view = false;
    this.sidePanel = false;
  }

  /**
   * Handles the update of a task.
   * @param updatedTask The updated task.
   */
  handleTaskUpdated(updatedTask: Tache): void {
    this.closeAll();
    if (!this.projectMock.sprints) return;

    for (const sprint of this.projectMock.sprints) {
      if (!sprint.categorie_tache) continue;

      for (const categorie of sprint.categorie_tache) {
        if (!categorie.taches) continue;

        const taskIndex = categorie.taches.findIndex(t => t._id === updatedTask._id);
        if (taskIndex !== -1) {
          const membre = this.project.membres!.find((m: User) => m._id === updatedTask.membre);
          console.log("membre :" + membre);
          updatedTask.membre = membre;
          categorie.taches[taskIndex] = updatedTask;
          console.log(`Tâche mise à jour avec succès: ${updatedTask._id}`);
          return;
        }
      }
    }

    console.log(`Tâche non trouvée: ${updatedTask._id}`);
  }

  /**
   * Gets the color associated with a task status.
   * @param status The status of the task.
   * @returns The color associated with the status.
   */
  statusColor(status?: string): string {
    if (!status) {
      return '#000000';
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

