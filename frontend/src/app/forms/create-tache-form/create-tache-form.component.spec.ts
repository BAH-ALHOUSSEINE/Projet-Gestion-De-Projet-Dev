import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTacheFormComponent } from './create-tache-form.component';

describe('CreateTacheFormComponent', () => {
  let component: CreateTacheFormComponent;
  let fixture: ComponentFixture<CreateTacheFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateTacheFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateTacheFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
