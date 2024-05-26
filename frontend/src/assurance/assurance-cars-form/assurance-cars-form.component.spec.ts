import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssuranceCarsFormComponent } from './assurance-cars-form.component';

describe('AssuranceCarsFormComponent', () => {
  let component: AssuranceCarsFormComponent;
  let fixture: ComponentFixture<AssuranceCarsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssuranceCarsFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssuranceCarsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
