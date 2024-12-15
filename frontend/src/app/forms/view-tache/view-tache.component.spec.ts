import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewTacheComponent } from './view-tache.component';
import { TacheService } from '../../service/tache.service';
import { Tache } from '../../models/tache';
import { Projet } from '../../models/projet';
import { Sprint } from '../../models/sprint';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { DynamicFormComponent } from "../../elements/dynamic-form/dynamic-form.component"; // Import the DynamicFormComponent

describe('ViewTacheComponent', () => {
  let component: ViewTacheComponent;
  let fixture: ComponentFixture<ViewTacheComponent>;
  let debugElement: DebugElement;
  let tacheService: jasmine.SpyObj<TacheService>;

  beforeEach(async () => {
    const tacheServiceSpy = jasmine.createSpyObj('TacheService', ['updateTache']);

    await TestBed.configureTestingModule({
      declarations: [ViewTacheComponent, DynamicFormComponent],
      imports: [FormsModule, HttpClientTestingModule],
      providers: [
        { provide: TacheService, useValue: tacheServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewTacheComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    tacheService = TestBed.inject(TacheService) as jasmine.SpyObj<TacheService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});