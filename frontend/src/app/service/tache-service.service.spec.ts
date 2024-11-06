import { TestBed } from '@angular/core/testing';

import { TacheServiceService } from './tache-service.service';

describe('TacheServiceService', () => {
  let service: TacheServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TacheServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
