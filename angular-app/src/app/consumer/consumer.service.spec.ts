import { TestBed, inject } from '@angular/core/testing';

import { ConsumerService } from './consumer.service';

describe('ConsumerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConsumerService]
    });
  });

  it('should ...', inject([ConsumerService], (service: ConsumerService) => {
    expect(service).toBeTruthy();
  }));
});
