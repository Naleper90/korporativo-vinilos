import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-textarea',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form-textarea.html',
  styleUrls: ['./form-textarea.scss']
})
export class FormTextarea {
  @Input() id = '';
  @Input() label = '';
  @Input() required = false;
  @Input() placeholder = '';
  @Input() helpText = '';
  @Input() errorText = '';
}
