import { TestBed } from '@angular/core/testing';

import { TarifAutoService } from './tarif-auto.service';

describe('TarifAutoService', () => {
  let service: TarifAutoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TarifAutoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
