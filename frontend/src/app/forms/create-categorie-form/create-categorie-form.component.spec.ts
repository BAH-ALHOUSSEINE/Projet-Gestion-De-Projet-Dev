import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateCategorieFormComponent } from './create-categorie-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement, EventEmitter } from '@angular/core';
import { SprintService } from '../../service/sprint.service';
import { CategorieTache } from '../../models/categorie-tache';
import { Projet } from '../../models/projet';
import { Sprint } from '../../models/sprint';
import { DynamicFormComponent } from "../../elements/dynamic-form/dynamic-form.component"; // Import the DynamicFormComponent

describe('CreateCategorieFormComponent', () => {
  let component: CreateCategorieFormComponent;
  let fixture: ComponentFixture<CreateCategorieFormComponent>;
  let debugElement: DebugElement;
  let sprintService: jasmine.SpyObj<SprintService>;

  beforeEach(async () => {
    const sprintServiceSpy = jasmine.createSpyObj('SprintService', ['someMethod']);

    await TestBed.configureTestingModule({
      declarations: [CreateCategorieFormComponent, DynamicFormComponent],
      imports: [FormsModule, ReactiveFormsModule, HttpClientTestingModule],
      providers: [
        { provide: SprintService, useValue: sprintServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateCategorieFormComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    sprintService = TestBed.inject(SprintService) as jasmine.SpyObj<SprintService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});