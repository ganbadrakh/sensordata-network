import { TestBed, inject } from '@angular/core/testing';

import { TransactionBDCService } from './transaction-bdc.service';

describe('TransactionBDCService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TransactionBDCService]
    });
  });

  it('should ...', inject([TransactionBDCService], (service: TransactionBDCService) => {
    expect(service).toBeTruthy();
  }));
});
