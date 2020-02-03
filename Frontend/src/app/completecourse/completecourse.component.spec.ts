import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletecourseComponent } from './completecourse.component';

describe('CompletecourseComponent', () => {
  let component: CompletecourseComponent;
  let fixture: ComponentFixture<CompletecourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompletecourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletecourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
