import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursedataComponent } from './coursedata.component';

describe('CoursedataComponent', () => {
  let component: CoursedataComponent;
  let fixture: ComponentFixture<CoursedataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursedataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursedataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
