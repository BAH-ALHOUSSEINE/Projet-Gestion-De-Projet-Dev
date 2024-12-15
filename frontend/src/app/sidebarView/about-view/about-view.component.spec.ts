import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AboutViewComponent } from './about-view.component';
import { ProjetService } from '../../service/projet.service';
import { ProjectDetailComponent } from '../../project-detail/project-detail.component';
import { ChangeDetectorRef } from '@angular/core';
import { of } from 'rxjs';
import { User } from '../../models/user';
import { Projet } from '../../models/projet';

describe('AboutViewComponent', () => {
  let component: AboutViewComponent;
  let fixture: ComponentFixture<AboutViewComponent>;
  let projetServiceMock: any;
  let projectDetailMock: any;

  beforeEach(async () => {
    projetServiceMock = {
      addmembre: jasmine.createSpy('addmembre').and.returnValue(of(new User())),
      deleteProjectmemebre: jasmine.createSpy('deleteProjectmemebre').and.returnValue(of(new User()))
    };

    projectDetailMock = {};

    await TestBed.configureTestingModule({
      declarations: [AboutViewComponent],
      providers: [
        { provide: ProjetService, useValue: projetServiceMock },
        { provide: ProjectDetailComponent, useValue: projectDetailMock },
        ChangeDetectorRef,
        { provide: 'project', useValue: new Projet() }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add a member', () => {
    const user = new User();
    user.email = 'test@example.com';
    component.user = user;

    component.ajoutermembre();

    expect(projetServiceMock.addmembre).toHaveBeenCalledWith(component.project._id, user);
  });

  it('should delete a project member', () => {
    const email = 'test@example.com';
    const user = new User();
    user.email = email;
    component.project.membres = [user];

    component.deleteprojetmembre(email);

    expect(projetServiceMock.deleteProjectmemebre).toHaveBeenCalledWith(component.project._id, email);
  });

  it('should format date in French', () => {
    const date = new Date('2023-10-10');
    const formattedDate = component.formatDateInFrench(date);
    expect(formattedDate).toBe('mardi 10 octobre 2023');
  });
});
