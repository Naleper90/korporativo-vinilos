import { Component } from '@angular/core';
import {
  FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors,
  ReactiveFormsModule, AsyncValidatorFn, FormArray
} from '@angular/forms';
import { NgIf } from '@angular/common';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, CommonModule],
  templateUrl: './register-form.html',
  styleUrls: ['./register-form.scss']
})
export class RegisterForm {
  form: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email], [this.emailUnicoValidator()]],
      username: ['', [Validators.required, Validators.minLength(4)], [this.usernameDisponibleValidator()]],
      phone: ['', [Validators.required, this.telefonoValidator]],
      password: ['', [Validators.required, Validators.minLength(8), this.passwordFuerteValidator]],
      confirmPassword: ['', [Validators.required]],
      telefonos: this.fb.array([
        this.fb.group({numero: ['', [Validators.required, this.telefonoValidator]]})
      ])
    }, { validators: [this.passwordsIgualesValidator] });
  }

  get telefonosArray() { return this.form.get('telefonos') as FormArray; }

  addTelefono() {
    this.telefonosArray.push(this.fb.group({numero: ['', [Validators.required, this.telefonoValidator]]}));
  }

  removeTelefono(i: number) { this.telefonosArray.removeAt(i); }

  private passwordFuerteValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value as string;
    if (!value) return null;
    const tieneMayus = /[A-Z]/.test(value);
    const tieneMinus = /[a-z]/.test(value);
    const tieneNum = /[0-9]/.test(value);
    return tieneMayus && tieneMinus && tieneNum ? null : { passwordFuerte: true };
  }

  private passwordsIgualesValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    if (!password || !confirm) return null;
    return password === confirm ? null : { passwordsNoCoinciden: true };
  }

  private telefonoValidator(control: AbstractControl): ValidationErrors | null {
    const value = (control.value || '').toString().trim();
    if (!value) return null;
    const regex = /^[0-9]{9}$/;
    return regex.test(value) ? null : { telefonoInvalido: true };
  }

  private emailUnicoValidator(): AsyncValidatorFn {
    const ocupados = ['test@demo.com', 'user@demo.com'];
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const value = (control.value || '').toLowerCase().trim();
      if (!value) return of(null);
      return of(ocupados.includes(value)).pipe(
        delay(800),
        map(existe => (existe ? { emailOcupado: true } : null))
      );
    };
  }

  private usernameDisponibleValidator(): AsyncValidatorFn {
    const ocupados = ['admin', 'user', 'demo'];
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const value = (control.value || '').toLowerCase().trim();
      if (!value) return of(null);
      return of(ocupados.includes(value)).pipe(
        delay(600),
        map(existe => (existe ? { usernameOcupado: true } : null))
      );
    };
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitted = true;
    console.log('Registro enviado', this.form.value);
  }
}
