import { TestBed } from '@angular/core/testing';

import { ProjetServiceService } from './projet-service.service';

describe('ProjetServiceService', () => {
  let service: ProjetServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjetServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
