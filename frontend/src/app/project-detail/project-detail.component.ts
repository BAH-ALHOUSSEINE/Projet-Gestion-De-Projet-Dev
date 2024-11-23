import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjetService } from '../service/projet.service';
import { Projet } from '../models/projet';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {
  project: Projet | null = null;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjetService
  ) {}

  ngOnInit(): void {
    const projectId = this.route.snapshot.paramMap.get('id'); // Récupérer l'ID depuis l'URL
    if (projectId) {
      this.projectService.getProjectById(projectId).subscribe((projectData) => {
        this.project = Projet.fromData(projectData); // Charger les données du projet
      });
    }
  }
}
