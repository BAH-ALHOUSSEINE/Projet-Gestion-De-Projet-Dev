import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateSprintFormComponent } from './create-sprint-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement, EventEmitter } from '@angular/core';
import { SprintService } from '../../service/sprint.service';
import { Projet } from '../../models/projet';
import { Sprint } from '../../models/sprint';
import { of } from 'rxjs';
import { DynamicFormComponent } from "../../elements/dynamic-form/dynamic-form.component"; // Import the DynamicFormComponent

describe('CreateSprintFormComponent', () => {
  let component: CreateSprintFormComponent;
  let fixture: ComponentFixture<CreateSprintFormComponent>;
  let debugElement: DebugElement;
  let sprintService: jasmine.SpyObj<SprintService>;

  beforeEach(async () => {
    const sprintServiceSpy = jasmine.createSpyObj('SprintService', ['addSprintForCurrentProject']);

    await TestBed.configureTestingModule({
      declarations: [CreateSprintFormComponent, DynamicFormComponent],
      imports: [FormsModule, ReactiveFormsModule, HttpClientTestingModule],
      providers: [
        { provide: SprintService, useValue: sprintServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateSprintFormComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    sprintService = TestBed.inject(SprintService) as jasmine.SpyObj<SprintService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});