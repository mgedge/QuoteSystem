import { TestBed } from '@angular/core/testing';

import { RoleAuthGuard } from './role-auth.guard';

describe('RoleAuthGuard', () => {
  let guard: RoleAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RoleAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
