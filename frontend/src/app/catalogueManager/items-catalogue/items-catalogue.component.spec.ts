import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsCatalogueComponent } from './items-catalogue.component';

describe('ItemsCatalogueComponent', () => {
  let component: ItemsCatalogueComponent;
  let fixture: ComponentFixture<ItemsCatalogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemsCatalogueComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ItemsCatalogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
