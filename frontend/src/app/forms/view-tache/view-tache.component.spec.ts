import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTacheComponent } from './view-tache.component';

describe('ViewTacheComponent', () => {
  let component: ViewTacheComponent;
  let fixture: ComponentFixture<ViewTacheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewTacheComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewTacheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
