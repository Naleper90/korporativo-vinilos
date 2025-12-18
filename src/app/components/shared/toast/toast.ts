import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Notification {
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  duration?: number;
}

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.html',
  styleUrls: ['./toast.scss']
})
export class ToastComponent {
  @Input() notification!: Notification;
  @Output() closed = new EventEmitter<void>();

  close() {
    this.closed.emit();
  }
}
