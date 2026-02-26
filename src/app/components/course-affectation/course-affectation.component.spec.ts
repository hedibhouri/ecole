import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseAffectationComponent } from './course-affectation.component';

describe('CourseAffectationComponent', () => {
  let component: CourseAffectationComponent;
  let fixture: ComponentFixture<CourseAffectationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseAffectationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseAffectationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
