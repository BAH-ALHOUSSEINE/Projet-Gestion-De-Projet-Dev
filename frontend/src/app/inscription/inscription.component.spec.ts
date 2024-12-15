import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscriptionComponent } from './inscription.component';
import { UserService } from '../service/auth.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('InscriptionComponent', () => {
  let component: InscriptionComponent;
  let fixture: ComponentFixture<InscriptionComponent>;
  let userService: jasmine.SpyObj<UserService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    userService = jasmine.createSpyObj('UserService', ['register']);
    router = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [InscriptionComponent],
      providers: [
        { provide: UserService, useValue: userService },
        { provide: Router, useValue: router },
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(InscriptionComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should create a InscriptionComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should create a User, a champEmpty and errorMessage', () => {
    expect(component.user).toBeTruthy();
    expect(component.champEmpty).toBe(0);
    expect(component.errorMessage).toBe("");
  });

  it('should create a User with empty values when new InscriptionComponent is created', () => {
    expect(component.user.email).toBe("");
    expect(component.user.nom).toBe("");
    expect(component.user.password).toBe("");
    expect(component.user.prenom).toBe("");
  });

  // it('should set champEmpty to 1 if any field is empty', () => {
  //   component.user.nom = '';
  //   component.user.prenom = 'prenom';
  //   component.user.password = 'password';
  //   component.user.email = 'email@example.com';
  //   component.ajoutUser();
  //   expect(component.champEmpty).toBe(1);

  //   component.user.nom = 'nom';
  //   component.user.prenom = '';
  //   component.ajoutUser();
  //   expect(component.champEmpty).toBe(1);

  //   component.user.prenom = 'prenom';
  //   component.user.password = '';
  //   component.ajoutUser();
  //   expect(component.champEmpty).toBe(1);

  //   component.user.password = 'password';
  //   component.user.email = '';
  //   component.ajoutUser();
  //   expect(component.champEmpty).toBe(1);
  // });

  it('should call userService.register when ajoutUser is called and all fields are filled', () => {
    component.user.nom = "nom";
    component.user.prenom = "prenom";
    component.user.password = "password";
    component.user.email = "email";
    userService.register.and.returnValue(of({}));
    component.ajoutUser();
    expect(userService.register).toHaveBeenCalledWith(component.user);
  });

  it('should call router.navigate when all fields are filled and there is no error', () => {
    component.user.nom = "nom";
    component.user.prenom = "prenom";
    component.user.password = "password";
    component.user.email = "email";
    userService.register.and.returnValue(of({}));
    component.ajoutUser();
    expect(router.navigate).toHaveBeenCalledWith(['/connexion']);
  });

  it('should set errorMessage when status is 400', () => {
    const errorResponse = { status: 400, error: { error: 'error 400' } };
    userService.register.and.returnValue(throwError(() => errorResponse));
    component.user.nom = "nom";
    component.user.prenom = "prenom";
    component.user.password = "password";
    component.user.email = "email";
    component.ajoutUser();
    expect(component.champEmpty).toBe(0);
    expect(component.errorMessage).toBe('error 400');
  });
});
