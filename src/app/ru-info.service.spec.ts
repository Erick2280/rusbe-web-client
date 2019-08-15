import { TestBed } from '@angular/core/testing';

import { RuInfoService } from './ru-info.service';

describe('RuInfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RuInfoService = TestBed.get(RuInfoService);
    expect(service).toBeTruthy();
  });
});
