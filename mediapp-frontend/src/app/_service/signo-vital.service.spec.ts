import { TestBed } from '@angular/core/testing';

import { SignoVitalService } from './signo-vital.service';

describe('SignoVitalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SignoVitalService = TestBed.get(SignoVitalService);
    expect(service).toBeTruthy();
  });
});
