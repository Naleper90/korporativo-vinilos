import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface Notification {
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  duration?: number;
}

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private notifications = new Subject<Notification>();
  public notifications$ = this.notifications.asObservable();

  show(type: Notification['type'], message: string, duration = 4000) {
    this.notifications.next({ type, message, duration });
  }
}
