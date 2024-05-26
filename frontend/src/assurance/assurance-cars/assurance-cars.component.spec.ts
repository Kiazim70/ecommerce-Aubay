import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssuranceCarsComponent } from './assurance-cars.component';

describe('AssuranceCarsComponent', () => {
  let component: AssuranceCarsComponent;
  let fixture: ComponentFixture<AssuranceCarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssuranceCarsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssuranceCarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
