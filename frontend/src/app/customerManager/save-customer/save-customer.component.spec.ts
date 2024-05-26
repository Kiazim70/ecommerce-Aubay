import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveCustomerComponent } from './save-customer.component';

describe('SaveCustomerComponent', () => {
  let component: SaveCustomerComponent;
  let fixture: ComponentFixture<SaveCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaveCustomerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SaveCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
