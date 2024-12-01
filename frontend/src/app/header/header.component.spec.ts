import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { AuthGuard } from '../guards/auth.guard';
import { HeaderComponent } from './header.component';
import { of } from 'rxjs';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let router: jasmine.SpyObj<Router>;
  let authGuard: jasmine.SpyObj<AuthGuard>;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const authGuardSpy = jasmine.createSpyObj('AuthGuard', ['isLoggedIn', 'logout'], { isLoggedIn: of(true) });

    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: AuthGuard, useValue: authGuardSpy },
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    authGuard = TestBed.inject(AuthGuard) as jasmine.SpyObj<AuthGuard>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call authGuard.isLoggedIn.subscribe on init', () => {
    const subscribeSpy = spyOn(authGuard.isLoggedIn, 'subscribe');
    fixture.detectChanges(); // ngOnInit:  called after the constructor
    expect(subscribeSpy).toHaveBeenCalled();
  });

  it('should update component.isLoggedIn based on localStorage', () => {
    localStorage.setItem('isLoggedIn', 'true');
    component.updateLoginStatus();
    expect(component.isLoggedIn).toBeTrue();

    localStorage.setItem('isLoggedIn', 'false');
    component.updateLoginStatus();
    expect(component.isLoggedIn).toBeFalse();
  });

  it('should call authGuard.logout on logout', () => {
    component.logout();
    expect(authGuard.logout).toHaveBeenCalled();
  });
});
