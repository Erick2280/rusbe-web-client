import { TestBed } from '@angular/core/testing';

import { VirtusService } from './virtus.service';

describe('VirtusService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VirtusService = TestBed.get(VirtusService);
    expect(service).toBeTruthy();
  });
});
