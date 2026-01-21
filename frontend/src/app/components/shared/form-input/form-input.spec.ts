import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-form-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
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
  @Input() formControl: AbstractControl | null = null;  // ← CLAVE

  get isInvalid(): boolean {
    return !!(this.formControl &&
      this.formControl.invalid &&
      (this.formControl.touched || this.formControl.dirty));
  }
}
