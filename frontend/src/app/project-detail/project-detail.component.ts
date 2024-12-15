import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjetService } from '../service/projet.service';
import { Projet } from '../models/projet';
import { AboutViewComponent } from '../sidebarView/about-view/about-view.component';
import { TaskViewComponent } from '../sidebarView/task-view/task-view.component';
import { Injector } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

/**
 * Component for displaying project details.
 * 
 * @component
 * @selector app-project-detail
 * @templateUrl ./project-detail.component.html
 * @styleUrls ./project-detail.component.css
 * @changeDetection ChangeDetectionStrategy.OnPush
 */
export class ProjectDetailComponent implements OnInit {
  /**
   * The project to display.
   */
  project: Projet | null = null;

  /**
   * Injector for dynamically created components.
   */
  componentInjector: Injector | null = null;

  /**
   * ID of the user.
   */
  iduser?: String;

  /**
   * Flag indicating if the project can be deleted.
   */
  isdeleteprojet?: boolean = true;

  /**
   * List of views available in the project detail component.
   */
  views = [
    { id: 'about', name: 'À propos', component: AboutViewComponent },
    { id: 'tasks', name: 'Tâches', component: TaskViewComponent },
    // Autres vues...
  ];

  /**
   * The currently active view ID.
   */
  activeView: string = this.views[0].id;

  /**
   * Gets the component of the active view.
   */
  get activeViewComponent() {
    return this.views.find(view => view.id === this.activeView) || null;
  }

  /**
   * Constructor for ProjectDetailComponent.
   * 
   * @param route - ActivatedRoute for accessing route parameters.
   * @param projectService - Service for handling project data.
   * @param injector - Injector for dependency injection.
   * @param cdr - ChangeDetectorRef for marking changes.
   * @param router - Router for navigation.
   */
  constructor(
    private route: ActivatedRoute,
    private projectService: ProjetService,
    private injector: Injector,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  /**
   * Updates the injector with the current project.
   */
  private updateInjector() {
    if (this.project) {
      this.componentInjector = Injector.create({
        providers: [{ 
          provide: 'project',
          useValue: this.project
        }],
        parent: this.injector,
      });
      this.cdr.markForCheck();
    }
  }

  /**
   * Creates an injector with the provided data.
   * 
   * @param data - Data to be injected.
   * @returns The created injector.
   */
  createInjector(data: any) {
    if (!this.componentInjector) {
      this.componentInjector = Injector.create({
        providers: [{ provide: 'project', useValue: data }],
        parent: this.injector,
      });
    }
    return this.componentInjector;
  }

  /**
   * Sets the active view by its ID.
   * 
   * @param viewId - The ID of the view to activate.
   */
  setActiveView(viewId: string) {
    if (this.activeView !== viewId) {
      this.activeView = viewId;
      this.cdr.markForCheck();
    }
  }

  /**
   * Initializes the component and loads the project data.
   */
  ngOnInit(): void {
    const projectId = this.route.snapshot.paramMap.get('id');
    if (projectId) {
      this.projectService.getProjectById(projectId).subscribe({
        next: (projectData) => {
          this.project = Projet.fromData(projectData);
          this.createInjector(this.project);
          if (typeof window !== 'undefined' && typeof sessionStorage !== 'undefined') {
            console.log(this.project);
           
            this.iduser = String(sessionStorage.getItem('iduser') || "");
            if (this.iduser !== this.project?.id_admin) {
              this.isdeleteprojet = false;
              console.log("Utilisateur non administrateur :", this.iduser);
            } else {
              this.isdeleteprojet = true;
            }
          } else {
            console.warn("sessionStorage n'est pas disponible.");
            this.iduser = "";
            this.isdeleteprojet = false;
          }
          this.cdr.markForCheck();
        },
        error: (error) => {
          console.error('Erreur lors du chargement du projet:', error);
        }
      });
    }
  }

  /**
   * Updates the project with the provided data.
   * 
   * @param updatedProject - The updated project data.
   */
  update(updatedProject: Projet): void {
    this.project = updatedProject;
  }

  /**
   * Deletes the project by its ID.
   * 
   * @param idprojet - The ID of the project to delete.
   */
  deleteprojet(idprojet: string | undefined) {
    this.projectService.deleteProject(idprojet).subscribe(reponse => {
      this.router.navigate(['/projet']);
    });
  }

  /**
   * Navigates to the project list.
   */
  listeprojet() {
    this.router.navigate(['/projet']);
  }
}