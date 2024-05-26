import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuymodelComponent } from './buymodel.component';

describe('BuymodelComponent', () => {
  let component: BuymodelComponent;
  let fixture: ComponentFixture<BuymodelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuymodelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BuymodelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
