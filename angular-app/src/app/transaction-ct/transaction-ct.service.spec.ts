import { TestBed, inject } from '@angular/core/testing';

import { TransactionCtService } from './transaction-ct.service';

describe('TransactionCtService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TransactionCtService]
    });
  });

  it('should be created', inject([TransactionCtService], (service: TransactionCtService) => {
    expect(service).toBeTruthy();
  }));
});
