import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ConnexionComponent } from './connexion.component';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { AuthGuard } from '../guards/auth.guard';
import { UserService } from '../service/auth.service';

fdescribe('ConnexionComponent', () => {
  let component: ConnexionComponent;
  let fixture: ComponentFixture<ConnexionComponent>;
  let userService: jasmine.SpyObj<UserService>;
  let router: jasmine.SpyObj<Router>;
  let authGuard: jasmine.SpyObj<AuthGuard>;

  beforeEach(async () => {
    const userServiceSpy = jasmine.createSpyObj('UserService', ['login']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const authGuardSpy = jasmine.createSpyObj('AuthGuard', ['login']);

    await TestBed.configureTestingModule({
      declarations: [ConnexionComponent],
      imports: [FormsModule], // Add FormsModule here
      providers: [
        { provide: UserService, useValue: userServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: AuthGuard, useValue: authGuardSpy },
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ConnexionComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    authGuard = TestBed.inject(AuthGuard) as jasmine.SpyObj<AuthGuard>;
    fixture.detectChanges();

    userService.login.and.returnValue(of({ token: 'fake-token' }));
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should sets champEmpty to 1 when email or password is empty', () => {
    component.user.email = '';
    component.user.password = '';
    component.login();
    expect(component.champEmpty).toBe(1);

    component.user.email = 'test@email.com';
    component.user.password = '';
    expect(component.champEmpty).toBe(1);

    component.user.email = '';
    component.user.password = 'password';
    expect(component.champEmpty).toBe(1);
  });

  it('should call userService.login when parameters are correct', () => {
    component.user.email = 'test@email.com';
    component.user.password = 'password';
    component.login();
    expect(userService.login).toHaveBeenCalledWith(component.user.email, component.user.password);
  });
});
