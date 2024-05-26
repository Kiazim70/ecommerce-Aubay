import { TestBed } from '@angular/core/testing';

import { RentcarService } from './rentcar.service';

describe('RentcarService', () => {
  let service: RentcarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RentcarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
