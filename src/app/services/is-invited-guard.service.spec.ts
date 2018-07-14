import { TestBed, inject } from '@angular/core/testing';

import { IsInvitedGuardService } from './is-invited-guard.service';

describe('IsInvitedGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IsInvitedGuardService]
    });
  });

  it('should be created', inject([IsInvitedGuardService], (service: IsInvitedGuardService) => {
    expect(service).toBeTruthy();
  }));
});
