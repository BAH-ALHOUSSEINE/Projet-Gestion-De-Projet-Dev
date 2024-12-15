import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PopupadduserComponent } from './popupadduser.component';
import { ProjetService } from '../service/projet.service';
import { ActivatedRoute } from '@angular/router';
import { Injector } from '@angular/core';
import { of } from 'rxjs';

describe('PopupadduserComponent', () => {
  let component: PopupadduserComponent;
  let fixture: ComponentFixture<PopupadduserComponent>;
  let projetService: jasmine.SpyObj<ProjetService>;
  let route: jasmine.SpyObj<ActivatedRoute>;
  let injector: jasmine.SpyObj<Injector>;
  let dialogRef: jasmine.SpyObj<MatDialogRef<PopupadduserComponent>>;

  beforeEach(async () => {
    const projetServiceSpy = jasmine.createSpyObj('ProjetService', ['someMethod']);
    const routeSpy = jasmine.createSpyObj('ActivatedRoute', ['snapshot']);
    const injectorSpy = jasmine.createSpyObj('Injector', ['get']);
    const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      declarations: [PopupadduserComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: ProjetService, useValue: projetServiceSpy },
        { provide: ActivatedRoute, useValue: routeSpy },
        { provide: Injector, useValue: injectorSpy },
        { provide: MatDialogRef, useValue: dialogRefSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PopupadduserComponent);
    component = fixture.componentInstance;
    projetService = TestBed.inject(ProjetService) as jasmine.SpyObj<ProjetService>;
    route = TestBed.inject(ActivatedRoute) as jasmine.SpyObj<ActivatedRoute>;
    injector = TestBed.inject(Injector) as jasmine.SpyObj<Injector>;
    dialogRef = TestBed.inject(MatDialogRef) as jasmine.SpyObj<MatDialogRef<PopupadduserComponent>>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});