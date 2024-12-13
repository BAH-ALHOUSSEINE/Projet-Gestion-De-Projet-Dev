import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { MatDialog } from '@angular/material/dialog';
import { HeaderComponent } from './header/header.component';

describe('AppComponent', () => {
  let appComponent: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let dialog: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    const dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([])
      ],
      declarations: [
        AppComponent,
        HeaderComponent
      ],
      providers: [
        { providers: MatDialog, useValue: dialogSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    appComponent = fixture.componentInstance;
    dialog = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
  });

  it('should create the app', () => {
    fixture.detectChanges();
    expect(appComponent).toBeTruthy();
  });

  // it('should call dialog.open when openPopop is called', () => {
  //   appComponent.openPopup();
  //   expect(dialog.open).toHaveBeenCalled();
  // });
});
