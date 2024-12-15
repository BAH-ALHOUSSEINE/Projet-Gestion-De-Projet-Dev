import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectDetailComponent } from './project-detail.component';
import { ActivatedRoute } from '@angular/router';
import { ProjetService } from '../service/projet.service';
import { Projet } from '../models/projet';
import { AboutViewComponent } from '../sidebarView/about-view/about-view.component';
import { TaskViewComponent } from '../sidebarView/task-view/task-view.component';
import { Injector } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ProjectDetailComponent', () => {
  let component: ProjectDetailComponent;
  let fixture: ComponentFixture<ProjectDetailComponent>;
  let projetService: jasmine.SpyObj<ProjetService>;
  let route: ActivatedRoute;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const projetServiceSpy = jasmine.createSpyObj('ProjetService', ['getProjectById']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const activatedRouteStub = {
      snapshot: {
        paramMap: {
          get: (key: string) => '123' // Mock project ID
        }
      }
    };

    await TestBed.configureTestingModule({
      declarations: [ProjectDetailComponent, AboutViewComponent, TaskViewComponent],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: ProjetService, useValue: projetServiceSpy },
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectDetailComponent);
    component = fixture.componentInstance;
    projetService = TestBed.inject(ProjetService) as jasmine.SpyObj<ProjetService>;
    route = TestBed.inject(ActivatedRoute);
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});