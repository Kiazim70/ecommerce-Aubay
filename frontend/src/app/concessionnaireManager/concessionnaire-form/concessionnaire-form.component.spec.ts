import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcessionnaireFormComponent } from './concessionnaire-form.component';

describe('ConcessionnaireFormComponent', () => {
  let component: ConcessionnaireFormComponent;
  let fixture: ComponentFixture<ConcessionnaireFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConcessionnaireFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConcessionnaireFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
