import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTextarea } from './form-textarea';

describe('FormTextarea', () => {
  let component: FormTextarea;
  let fixture: ComponentFixture<FormTextarea>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormTextarea]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormTextarea);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
