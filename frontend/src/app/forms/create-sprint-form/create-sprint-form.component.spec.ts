import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSprintFormComponent } from './create-sprint-form.component';

describe('CreateSprintFormComponent', () => {
  let component: CreateSprintFormComponent;
  let fixture: ComponentFixture<CreateSprintFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateSprintFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateSprintFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
