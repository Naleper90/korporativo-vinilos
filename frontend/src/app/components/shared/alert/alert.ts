import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Button } from '../button/button';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert.html',
  styleUrls: ['./alert.scss'],
})
export class Alert {
  @Input() variant: 'success' | 'error' | 'warning' | 'info' = 'info';
  @Input() dismissible = false;
}
