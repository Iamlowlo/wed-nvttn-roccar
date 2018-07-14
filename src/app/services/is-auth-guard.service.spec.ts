import { TestBed, inject } from '@angular/core/testing';

import { IsAuthGuardService } from './is-auth-guard.service';

describe('IsAuthGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IsAuthGuardService]
    });
  });

  it('should be created', inject([IsAuthGuardService], (service: IsAuthGuardService) => {
    expect(service).toBeTruthy();
  }));
});
