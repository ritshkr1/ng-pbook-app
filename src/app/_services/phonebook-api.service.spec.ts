import { TestBed, inject } from '@angular/core/testing';

import { PhonebookApiService } from './phonebook-api.service';

describe('PhonebookApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PhonebookApiService]
    });
  });

  it('should be created', inject([PhonebookApiService], (service: PhonebookApiService) => {
    expect(service).toBeTruthy();
  }));
});
