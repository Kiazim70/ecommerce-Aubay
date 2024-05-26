import { TestBed } from '@angular/core/testing';

import { AssuranceCarsService } from './assurance-cars.service';

describe('AssuranceCarsService', () => {
  let service: AssuranceCarsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssuranceCarsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
