import { TestBed } from '@angular/core/testing';

import { GymModeService } from './gym-mode.service';

describe('GymModeService', () => {
  let service: GymModeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GymModeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
