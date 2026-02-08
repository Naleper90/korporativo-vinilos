import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Button } from './button';

describe('Button', () => {
  let component: Button;
  let fixture: ComponentFixture<Button>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Button]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Button);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default variant as primary', () => {
    expect(component.variant).toBe('primary');
  });

  it('should have default size as md', () => {
    expect(component.size).toBe('md');
  });

  it('should not be disabled by default', () => {
    expect(component.disabled).toBe(false);
  });

  it('should accept variant input', () => {
    component.variant = 'secondary';
    expect(component.variant).toBe('secondary');
  });

  it('should accept size input', () => {
    component.size = 'lg';
    expect(component.size).toBe('lg');
  });

  it('should accept disabled input', () => {
    component.disabled = true;
    expect(component.disabled).toBe(true);
  });
});
