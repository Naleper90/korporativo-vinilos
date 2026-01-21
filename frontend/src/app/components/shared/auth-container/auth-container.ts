import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from '../login-form/login-form';
import { RegisterFormComponent } from '../register-form/register-form';

@Component({
  selector: 'app-auth-container',
  standalone: true,
  imports: [CommonModule, LoginFormComponent, RegisterFormComponent],
  templateUrl: './auth-container.html',
  styleUrls: ['./auth-container.scss']
})
export class AuthContainerComponent {
  isLoginView = true; // Por defecto mostramos Login

  toggleView(isLogin: boolean) {
    this.isLoginView = isLogin;
  }

  // Se llama cuando el registro termina con éxito
  onRegisterSuccess() {
    this.isLoginView = true; // Volvemos al Login automáticamente
  }
}
