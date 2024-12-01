import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupadduserComponent } from './popupadduser.component';

describe('PopupadduserComponent', () => {
  let component: PopupadduserComponent;
  let fixture: ComponentFixture<PopupadduserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PopupadduserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupadduserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
