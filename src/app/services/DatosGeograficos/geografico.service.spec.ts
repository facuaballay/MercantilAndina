import { TestBed } from '@angular/core/testing';

import { GeograficoService } from './geografico.service';

describe('GeograficoService', () => {
  let service: GeograficoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeograficoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
