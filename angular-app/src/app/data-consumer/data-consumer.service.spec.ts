import { TestBed, inject } from '@angular/core/testing';

import { DataConsumerService } from './data-consumer.service';

describe('DataConsumerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataConsumerService]
    });
  });

  it('should be created', inject([DataConsumerService], (service: DataConsumerService) => {
    expect(service).toBeTruthy();
  }));
});
