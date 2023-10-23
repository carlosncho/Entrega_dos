import { TestBed } from '@angular/core/testing';

import { DatosComunaService } from './datos-comuna.service';

describe('DatosComunaService', () => {
  let service: DatosComunaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatosComunaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
