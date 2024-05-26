import { TestBed } from '@angular/core/testing';

import { MessageByLocaleService } from './message-by-locale.service';

describe('MessageByLocaleService', () => {
  let service: MessageByLocaleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageByLocaleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
