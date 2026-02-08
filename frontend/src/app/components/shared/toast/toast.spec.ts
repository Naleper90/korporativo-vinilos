import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToastComponent, Notification } from './toast';

describe('ToastComponent', () => {
  let component: ToastComponent;
  let fixture: ComponentFixture<ToastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToastComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToastComponent);
    component = fixture.componentInstance;
    component.notification = { type: 'success', message: 'Test message' };
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should accept notification input', () => {
    const notification: Notification = { type: 'error', message: 'Error message', duration: 3000 };
    component.notification = notification;
    expect(component.notification).toEqual(notification);
  });

  it('should emit closed event when close is called', (done) => {
    component.closed.subscribe(() => {
      expect(true).toBe(true);
      done();
    });
    
    component.close();
  });

  it('should handle different notification types', () => {
    const types: Array<'success' | 'error' | 'info' | 'warning'> = ['success', 'error', 'info', 'warning'];
    
    types.forEach(type => {
      component.notification = { type, message: `${type} message` };
      expect(component.notification.type).toBe(type);
    });
  });

  it('should handle notification with duration', () => {
    const notification: Notification = { type: 'info', message: 'Test', duration: 5000 };
    component.notification = notification;
    expect(component.notification.duration).toBe(5000);
  });

  it('should handle notification without duration', () => {
    const notification: Notification = { type: 'success', message: 'Test' };
    component.notification = notification;
    expect(component.notification.duration).toBeUndefined();
  });
});
