import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCategorieFormComponent } from './create-categorie-form.component';

describe('CreateCategorieFormComponent', () => {
  let component: CreateCategorieFormComponent;
  let fixture: ComponentFixture<CreateCategorieFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateCategorieFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCategorieFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
