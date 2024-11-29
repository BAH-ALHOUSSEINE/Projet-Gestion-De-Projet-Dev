import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjetService } from '../service/projet.service';
import { Projet } from '../models/projet';
import { AboutViewComponent } from '../sidebarView/about-view/about-view.component';
import { TaskViewComponent } from '../sidebarView/task-view/task-view.component';
import { Injector } from '@angular/core';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectDetailComponent implements OnInit {
  project: Projet | null = null;
  componentInjector: Injector | null = null;

  views = [
    { id: 'about', name: 'À propos', component: AboutViewComponent },
    { id: 'tasks', name: 'Tâches', component: TaskViewComponent },
    // Autres vues...
  ];

  activeView: string = this.views[0].id;

  get activeViewComponent() {
    return this.views.find(view => view.id === this.activeView) || null;
  }

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjetService,
    private injector: Injector,
    private cdr: ChangeDetectorRef
  ) {}

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

    // Garde la méthode createInjector pour la compatibilité avec le template
    createInjector(data: any) {
      if (!this.componentInjector) {
        this.componentInjector = Injector.create({
          providers: [{ provide: 'project', useValue: data }],
          parent: this.injector,
        });
      }
      return this.componentInjector;
    }

  setActiveView(viewId: string) {
    if (this.activeView !== viewId) {
      this.activeView = viewId;
      this.cdr.markForCheck();
    }
  }

  ngOnInit(): void {
    const projectId = this.route.snapshot.paramMap.get('id');
    if (projectId) {
      this.projectService.getProjectById(projectId).subscribe({
        next: (projectData) => {
          this.project = Projet.fromData(projectData);
          this.createInjector(this.project);
          this.cdr.markForCheck();
        },
        error: (error) => {
          console.error('Erreur lors du chargement du projet:', error);
        }
      });
    }
}

update(updatedProject: Projet): void {
  this.project = updatedProject;
}

 
}