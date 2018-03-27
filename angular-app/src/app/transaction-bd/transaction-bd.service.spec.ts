import { TestBed, inject } from '@angular/core/testing';

import { TransactionBdService } from './transaction-bd.service';

describe('TransactionBdService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TransactionBdService]
    });
  });

  it('should be created', inject([TransactionBdService], (service: TransactionBdService) => {
    expect(service).toBeTruthy();
  }));
});
