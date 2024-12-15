import { TestBed } from '@angular/core/testing';

import { ProjetService } from './projet.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('ProjetServiceService', () => {
  let service: ProjetService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProjetService]
    });
    service = TestBed.inject(ProjetService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
