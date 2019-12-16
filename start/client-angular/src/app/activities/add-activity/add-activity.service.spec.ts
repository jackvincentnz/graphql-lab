import { TestBed } from '@angular/core/testing';

import { AddActivityService } from './add-activity.service';

describe('AddActivityService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddActivityService = TestBed.get(AddActivityService);
    expect(service).toBeTruthy();
  });
});
