import { TestBed } from '@angular/core/testing';

import { DatosVehiculosService } from './datos-vehiculos.service';

describe('DatosVehiculosService', () => {
  let service: DatosVehiculosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatosVehiculosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
