import { TestBed } from '@angular/core/testing';

import { FilterSignalService } from './filter-signal.service';

describe('FilterSignalService', () => {
  let service: FilterSignalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilterSignalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
