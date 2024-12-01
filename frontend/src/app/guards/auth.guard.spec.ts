import { TestBed } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

describe('AuthGuard', () => {
    let authGuard: AuthGuard;
    let router: jasmine.SpyObj<Router>;

    beforeEach(() => {
        router = jasmine.createSpyObj('Router', ['navigate']);
        authGuard = new AuthGuard(router);

        TestBed.configureTestingModule({
            providers: [
                AuthGuard,
                { provide: Router, useValue: router }
            ]
        })

        authGuard = TestBed.inject(AuthGuard);
        router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    })

    afterEach(() => {
        localStorage.clear();
    })

    it('should be created', () => {
        expect(authGuard).toBeTruthy();
    })

    it('should login correctly', () => {
        const token = 'fake-token';
        authGuard.login(token);
        expect(localStorage.getItem('isLoggedIn')).toBe('true');
        expect(localStorage.getItem('token')).toBe(token);
        expect(authGuard['isLoggedInSubject'].value).toBeTrue();
        authGuard.logout();
    });

    it('should logout correctly', () => {
        const token = 'fake-token';
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('token', token);
        authGuard['isLoggedInSubject'].next(true);
        authGuard.logout();
        expect(localStorage.getItem('isLoggedIn')).toBe('false');
        expect(localStorage.getItem('token')).toBeNull();
        expect(authGuard['isLoggedInSubject'].value).toBeFalse();
        expect(router.navigate).toHaveBeenCalledWith(['/connexion']);
    });

    it('should return true if logged in', () => {
        localStorage.setItem('isLoggedIn', 'true');
        const route = {} as ActivatedRouteSnapshot;
        const state = {} as RouterStateSnapshot;
        const result = authGuard.canActivate(route, state);
        expect(result).toBe(true);
    });

    it('should return false if not logged in', () => {
        localStorage.setItem('isLoggedIn', 'false');
        const route = {} as ActivatedRouteSnapshot;
        const state = {} as RouterStateSnapshot;
        const result = authGuard.canActivate(route, state);
        expect(result).toBe(false);
        expect(router.navigate).toHaveBeenCalledWith(['/connexion']);
    });

    // it('should return false if localStorage is not accessible', () => {
    //     spyOn(AuthGuard, 'canAccessLocalStorage').and.returnValue(false);
    //     const route = {} as ActivatedRouteSnapshot;
    //     const state = {} as RouterStateSnapshot;
    //     const result = authGuard.canActivate(route, state);
    //     expect(result).toBe(false);
    //     expect(router.navigate).toHaveBeenCalledWith(['/connexion']);
    // });
})