/**
 * Servicio de autenticación con JWT.
 * Maneja login, registro, logout y estado del usuario mediante signals.
 */
import { Injectable, signal, inject, PLATFORM_ID, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../environments/environment';

// Definimos la interfaz del usuario
export interface User {
  username: string;
  id?: number; // El ID es opcional al principio hasta que logueamos
  email?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);

  private apiUrl = `${environment.apiUrl}/auth`;

  // Signal que guarda el estado del usuario
  private currentUserSignal = signal<User | null>(null);

  public isLoggedIn = computed(() => !!this.currentUserSignal());
  public currentUser = this.currentUserSignal.asReadonly();

  private redirectUrl: string | null = null;

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');

      if (token && storedUser) {
        try {
          // Recuperamos el objeto usuario guardado
          this.currentUserSignal.set(JSON.parse(storedUser));
        } catch (e) {
          console.error('Error parseando usuario local', e);
          localStorage.removeItem('user');
        }
      }
    }
  }

  // --- LOGIN ---
  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(response => {

        if (response && response.token) {
          if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('token', response.token);

            // Intentamos capturar el ID con varios nombres posibles por seguridad
            const userIdFromBackend = response.userId || response.id || response.user_id;

            if (!userIdFromBackend) {
                console.warn('⚠️ CUIDADO: El backend no ha devuelto un ID (userId/id). El perfil fallará.');
            }

            const user: User = {
              username: response.username || email,
              id: userIdFromBackend, // Asignamos el ID detectado
              email: response.email || email
            };

            // Guardamos el objeto completo con ID en localStorage
            localStorage.setItem('user', JSON.stringify(user));

            // Actualizamos la señal para que toda la app se entere
            this.currentUserSignal.set(user);
          }
        }
      }),
      catchError(error => {
        console.error('Error en login', error);
        return throwError(() => error);
      })
    );
  }

  // --- REGISTRO ---
  register(userData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, userData).pipe(
      catchError(error => {
        console.error('Error en registro', error);
        return throwError(() => error);
      })
    );
  }

  // --- LOGOUT ---
  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('username');
    }
    this.currentUserSignal.set(null);
    this.router.navigate(['/']);
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token');
    }
    return null;
  }

  setRedirectUrl(url: string) {
    this.redirectUrl = url;
  }

  getRedirectUrl(): string | null {
    return this.redirectUrl;
  }
}
