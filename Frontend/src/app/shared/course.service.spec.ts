import { TestBed, inject } from '@angular/core/testing';
import { courseService } from './course.service';

describe('courseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [courseService]
    });
  });

  it('should be created', inject([courseService], (service: courseService) => {
    expect(service).toBeTruthy();
  }));
});
