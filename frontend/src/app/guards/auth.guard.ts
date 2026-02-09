/**
 * Guard para proteger rutas que requieren autenticación.
 * Redirige a /contacto si el usuario no está logueado.
 */
import { inject } from '@angular/core';
import { CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state: RouterStateSnapshot) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isLoggedIn()) {
    return true;
  }

  auth.setRedirectUrl(state.url);

  return router.parseUrl('/contacto');
};
