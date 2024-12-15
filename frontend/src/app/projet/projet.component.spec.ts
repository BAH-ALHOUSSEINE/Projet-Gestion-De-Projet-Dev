import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ProjetService } from '../service/projet.service';
import { ProjetComponent } from './projet.component';
import { Projet } from '../models/projet';
import { Router } from '@angular/router';

describe('ProjetComponent', () => {
  let component: ProjetComponent;
  let fixture: ComponentFixture<ProjetComponent>;
  let projetService: jasmine.SpyObj<ProjetService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const projetServiceSpy = jasmine.createSpyObj('ProjetService', ['getUserProjects', 'updateProjects'], {
      projects$: of([new Projet(), new Projet()]) // Provide a mock observable
    });
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [ProjetComponent],
      providers: [
        { provide: ProjetService, useValue: projetServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProjetComponent);
    component = fixture.componentInstance;
    projetService = TestBed.inject(ProjetService) as jasmine.SpyObj<ProjetService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});