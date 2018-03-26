import { TestBed, inject } from '@angular/core/testing';

import { TransactionSBService } from './transaction-sb.service';

describe('TransactionSBService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TransactionSBService]
    });
  });

  it('should ...', inject([TransactionSBService], (service: TransactionSBService) => {
    expect(service).toBeTruthy();
  }));
});
