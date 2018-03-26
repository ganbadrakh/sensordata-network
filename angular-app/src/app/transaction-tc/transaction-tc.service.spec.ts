import { TestBed, inject } from '@angular/core/testing';

import { TransactionTCService } from './transaction-tc.service';

describe('TransactionTCService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TransactionTCService]
    });
  });

  it('should ...', inject([TransactionTCService], (service: TransactionTCService) => {
    expect(service).toBeTruthy();
  }));
});
