import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

interface SelectOption {
  value: string;
  label: string;
}

@Component({
  selector: 'app-form-select',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form-select.html',
  styleUrls: ['./form-select.scss']
})
export class FormSelect {
  @Input() id = '';
  @Input() label = '';
  @Input() required = false;
  @Input() helpText = '';
  @Input() errorText = '';
  @Input() options: SelectOption[] = [];
}
