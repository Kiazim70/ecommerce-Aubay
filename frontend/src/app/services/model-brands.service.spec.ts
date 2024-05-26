import { TestBed } from '@angular/core/testing';

import { ModelBrandsService } from './model-brands.service';

describe('ModelBrandsService', () => {
  let service: ModelBrandsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModelBrandsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
