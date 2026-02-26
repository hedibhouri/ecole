import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCoureComponent } from './edit-coure.component';

describe('EditCoureComponent', () => {
  let component: EditCoureComponent;
  let fixture: ComponentFixture<EditCoureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditCoureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCoureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
