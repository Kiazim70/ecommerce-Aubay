import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyconcessComponent } from './buyconcess.component';

describe('BuyconcessComponent', () => {
  let component: BuyconcessComponent;
  let fixture: ComponentFixture<BuyconcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuyconcessComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BuyconcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
