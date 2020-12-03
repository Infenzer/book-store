import { TestBed } from '@angular/core/testing';

import { BookBackendService } from './book-backend.service';

describe('BookBackendService', () => {
  let service: BookBackendService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookBackendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
