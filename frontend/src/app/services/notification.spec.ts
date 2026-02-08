import { TestBed } from '@angular/core/testing';

import { NotificationService, Notification } from './notification';

describe('NotificationService', () => {
  let service: NotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit notification when show is called', (done) => {
    service.notifications$.subscribe((notification: Notification) => {
      expect(notification.type).toBe('success');
      expect(notification.message).toBe('Test message');
      expect(notification.duration).toBe(4000);
      done();
    });

    service.show('success', 'Test message');
  });

  it('should use custom duration when provided', (done) => {
    service.notifications$.subscribe((notification: Notification) => {
      expect(notification.duration).toBe(2000);
      done();
    });

    service.show('info', 'Custom duration', 2000);
  });

  it('should handle different notification types', (done) => {
    let count = 0;
    const types: Notification['type'][] = [];

    service.notifications$.subscribe((notification: Notification) => {
      types.push(notification.type);
      count++;

      if (count === 4) {
        expect(types).toEqual(['success', 'error', 'info', 'warning']);
        done();
      }
    });

    service.show('success', 'Success message');
    service.show('error', 'Error message');
    service.show('info', 'Info message');
    service.show('warning', 'Warning message');
  });
});
