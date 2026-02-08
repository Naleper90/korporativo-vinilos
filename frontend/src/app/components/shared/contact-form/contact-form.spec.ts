import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactForm } from './contact-form';
import { LoadingService } from '../../../services/loading';
import { NotificationService } from '../../../services/notification';
import { of } from 'rxjs';

describe('ContactForm', () => {
  let component: ContactForm;
  let fixture: ComponentFixture<ContactForm>;
  let loadingService: any;
  let notificationService: any;

  beforeEach(async () => {
    const loadingServiceMock = {
      show: jasmine.createSpy('show'),
      hide: jasmine.createSpy('hide'),
      loading$: of(false)
    };

    const notificationServiceMock = {
      show: jasmine.createSpy('show'),
      notifications$: of([])
    };

    await TestBed.configureTestingModule({
      imports: [ContactForm],
      providers: [
        { provide: LoadingService, useValue: loadingServiceMock },
        { provide: NotificationService, useValue: notificationServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ContactForm);
    component = fixture.componentInstance;
    loadingService = TestBed.inject(LoadingService);
    notificationService = TestBed.inject(NotificationService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty values', () => {
    expect(component.form.value).toEqual({ name: '', email: '', message: '' });
  });

  it('should mark form as invalid when empty', () => {
    expect(component.form.valid).toBe(false);
  });

  it('should validate email format', () => {
    const emailControl = component.form.get('email');
    emailControl?.setValue('invalid-email');
    expect(emailControl?.hasError('email')).toBe(true);
    
    emailControl?.setValue('valid@email.com');
    expect(emailControl?.hasError('email')).toBe(false);
  });

  it('should validate message minimum length', () => {
    const messageControl = component.form.get('message');
    messageControl?.setValue('short');
    expect(messageControl?.hasError('minlength')).toBe(true);
    
    messageControl?.setValue('This is a valid message with more than 10 characters');
    expect(messageControl?.hasError('minlength')).toBe(false);
  });

  it('should mark form as valid when all fields are correct', () => {
    component.form.patchValue({
      name: 'John Doe',
      email: 'john@example.com',
      message: 'This is a valid message'
    });
    
    expect(component.form.valid).toBe(true);
  });

  it('should not submit when form is invalid', () => {
    component.onSubmit();
    
    expect(loadingService.show).not.toHaveBeenCalled();
    expect(notificationService.show).not.toHaveBeenCalled();
  });

  it('should mark all fields as touched when submitting invalid form', () => {
    component.onSubmit();
    
    expect(component.form.get('name')?.touched).toBe(true);
    expect(component.form.get('email')?.touched).toBe(true);
    expect(component.form.get('message')?.touched).toBe(true);
  });

  it('should submit form when valid', () => {
    component.form.patchValue({
      name: 'John Doe',
      email: 'john@example.com',
      message: 'This is a valid message'
    });
    
    component.onSubmit();
    
    expect(loadingService.show).toHaveBeenCalled();
    expect(notificationService.show).toHaveBeenCalledWith('success', '¡Formulario enviado!');
  });

  it('should emit formSubmitted event on valid submit', (done) => {
    component.form.patchValue({
      name: 'John Doe',
      email: 'john@example.com',
      message: 'This is a valid message'
    });
    
    component.formSubmitted.subscribe(() => {
      expect(true).toBe(true);
      done();
    });
    
    component.onSubmit();
  });
});
