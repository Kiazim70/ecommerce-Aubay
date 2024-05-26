import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarifAutoListComponent } from './tarif-auto-list.component';

describe('TarifAutoListComponent', () => {
  let component: TarifAutoListComponent;
  let fixture: ComponentFixture<TarifAutoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TarifAutoListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TarifAutoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
