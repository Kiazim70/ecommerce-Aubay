import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcessionnaireUpdateComponent } from './concessionnaire-update.component';

describe('ConcessionnaireUpdateComponent', () => {
  let component: ConcessionnaireUpdateComponent;
  let fixture: ComponentFixture<ConcessionnaireUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConcessionnaireUpdateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConcessionnaireUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
