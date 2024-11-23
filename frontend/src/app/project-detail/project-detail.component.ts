import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjetService } from '../service/projet.service';
import { Projet } from '../models/projet';
import { AboutViewComponent } from '../sidebarView/about-view/about-view.component';
import { TaskViewComponent } from '../sidebarView/task-view/task-view.component';
import { Injector } from '@angular/core';


@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {
  project: Projet | null = null;


  views = [
    { id: 'about', name: 'À propos', component: AboutViewComponent },
    { id: 'tasks', name: 'Tâches', component: TaskViewComponent },
    // { id: 'test', name: 'Test', component: TestComponent },
    // { id: 'release', name: 'Release', component: ReleaseComponent },
    // { id: 'collaborator', name: 'Collaborateurs', component: CollaboratorComponent }
  ];

  activeView: string = this.views[0].id; // Vue par défaut

  get activeViewComponent() {
    return this.views.find(view => view.id === this.activeView) || null;
  }

  setActiveView(viewId: string) {
    this.activeView = viewId;
  }

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjetService,
    private injector: Injector
  ) {}


  createInjector(data: any) {
    return Injector.create({
      providers: [{ provide: 'project', useValue: data }],
      parent: this.injector,
    });
  }

  ngOnInit(): void {
    const projectId = this.route.snapshot.paramMap.get('id'); // Récupérer l'ID depuis l'URL
    if (projectId) {
      this.projectService.getProjectById(projectId).subscribe((projectData) => {
        console.log(projectData)
        this.project = Projet.fromData(projectData); // Charger les données du projet
      });
    }
  }
}
