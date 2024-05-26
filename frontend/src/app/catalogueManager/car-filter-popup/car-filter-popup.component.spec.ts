import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarFilterPopupComponent } from './car-filter-popup.component';

describe('CarFilterPopupComponent', () => {
  let component: CarFilterPopupComponent;
  let fixture: ComponentFixture<CarFilterPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarFilterPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarFilterPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
