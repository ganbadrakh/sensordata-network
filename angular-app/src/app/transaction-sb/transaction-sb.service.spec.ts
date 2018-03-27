import { TestBed, inject } from '@angular/core/testing';

import { TransactionSbService } from './transaction-sb.service';

describe('TransactionSbService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TransactionSbService]
    });
  });

  it('should be created', inject([TransactionSbService], (service: TransactionSbService) => {
    expect(service).toBeTruthy();
  }));
});
