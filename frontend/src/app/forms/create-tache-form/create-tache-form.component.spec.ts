import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateTacheFormComponent } from './create-tache-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement, EventEmitter } from '@angular/core';
import { SprintService } from '../../service/sprint.service';
import { Projet } from '../../models/projet';
import { Tache } from '../../models/tache';
import { Sprint } from '../../models/sprint';
import { of } from 'rxjs';
import { DynamicFormComponent } from "../../elements/dynamic-form/dynamic-form.component"; // Import the DynamicFormComponent

describe('CreateTacheFormComponent', () => {
  let component: CreateTacheFormComponent;
  let fixture: ComponentFixture<CreateTacheFormComponent>;
  let debugElement: DebugElement;
  let sprintService: jasmine.SpyObj<SprintService>;

  beforeEach(async () => {
    const sprintServiceSpy = jasmine.createSpyObj('SprintService', ['addTacheToSprint']);

    await TestBed.configureTestingModule({
      declarations: [CreateTacheFormComponent, DynamicFormComponent],
      imports: [FormsModule, ReactiveFormsModule, HttpClientTestingModule],
      providers: [
        { provide: SprintService, useValue: sprintServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateTacheFormComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    sprintService = TestBed.inject(SprintService) as jasmine.SpyObj<SprintService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});