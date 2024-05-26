import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarifAutoComponent } from './tarif-auto.component';

describe('TarifAutoComponent', () => {
  let component: TarifAutoComponent;
  let fixture: ComponentFixture<TarifAutoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TarifAutoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TarifAutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
