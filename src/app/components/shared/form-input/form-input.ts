import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form-input.html',
  styleUrls: ['./form-input.scss'],
})
export class FormInput {
  @Input() id = '';
  @Input() label = '';
  @Input() type: string = 'text';
  @Input() required = false;
  @Input() helpText = '';
  @Input() placeholder = '';
}
