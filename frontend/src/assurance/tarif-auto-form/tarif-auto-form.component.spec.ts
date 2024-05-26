import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarifAutoFormComponent } from './tarif-auto-form.component';

describe('TarifAutoFormComponent', () => {
  let component: TarifAutoFormComponent;
  let fixture: ComponentFixture<TarifAutoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TarifAutoFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TarifAutoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
