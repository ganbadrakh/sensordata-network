import { TestBed, inject } from '@angular/core/testing';

import { TransactionTcService } from './transaction-tc.service';

describe('TransactionTcService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TransactionTcService]
    });
  });

  it('should be created', inject([TransactionTcService], (service: TransactionTcService) => {
    expect(service).toBeTruthy();
  }));
});
