import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Button } from '../button/button';
import { LoadingService } from '../../../services/loading';
import { NotificationService } from '../../../services/notification';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [ReactiveFormsModule, Button, NgIf],
  templateUrl: './contact-form.html',
  styleUrls: ['./contact-form.scss']
})
export class ContactForm {
  @Output() formSubmitted = new EventEmitter<void>();

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loadingService: LoadingService,
    private notifService: NotificationService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  onSubmit(): void {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loadingService.show();
    console.log(this.form.value);
    this.notifService.show('success', '¡Formulario enviado!');
    this.formSubmitted.emit();
    setTimeout(() => this.loadingService.hide(), 2000);
  }
}
