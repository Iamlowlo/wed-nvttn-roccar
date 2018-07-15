import { TestBed, inject } from '@angular/core/testing';

import { IsAdminGuardService } from './is-admin-guard.service';

describe('IsAdminGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IsAdminGuardService]
    });
  });

  it('should be created', inject([IsAdminGuardService], (service: IsAdminGuardService) => {
    expect(service).toBeTruthy();
  }));
});
