import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelbrandsComponent } from './modelbrands.component';

describe('ModelbrandsComponent', () => {
  let component: ModelbrandsComponent;
  let fixture: ComponentFixture<ModelbrandsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModelbrandsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModelbrandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
