import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateProjectFormComponent } from './create-project-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { DynamicFormComponent } from "../../elements/dynamic-form/dynamic-form.component"; // Import the DynamicFormComponent

describe('CreateProjectFormComponent', () => {
  let component: CreateProjectFormComponent;
  let fixture: ComponentFixture<CreateProjectFormComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CreateProjectFormComponent,
        DynamicFormComponent // Declare the DynamicFormComponent
      ],
      imports: [FormsModule, ReactiveFormsModule, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateProjectFormComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});