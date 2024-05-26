import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelCustomerComponent } from './model-customer.component';

describe('ModelCustomerComponent', () => {
  let component: ModelCustomerComponent;
  let fixture: ComponentFixture<ModelCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModelCustomerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModelCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
