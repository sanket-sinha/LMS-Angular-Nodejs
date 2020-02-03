import { TestBed, inject } from '@angular/core/testing';

import { adminAuthGuardService } from './admin-auth-guard.service';

describe('adminAuthGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [adminAuthGuardService]
    });
  });

  it('should be created', inject([adminAuthGuardService], (service: adminAuthGuardService) => {
    expect(service).toBeTruthy();
  }));
});
