import { TestBed, inject } from '@angular/core/testing';

import { TransactionCTService } from './transaction-ct.service';

describe('TransactionCTService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TransactionCTService]
    });
  });

  it('should ...', inject([TransactionCTService], (service: TransactionCTService) => {
    expect(service).toBeTruthy();
  }));
});
