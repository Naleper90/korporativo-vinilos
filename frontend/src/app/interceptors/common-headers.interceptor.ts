/**
 * Interceptor para añadir headers comunes a todas las peticiones HTTP.
 */
import { HttpInterceptorFn } from '@angular/common/http';

export const commonHeadersInterceptor: HttpInterceptorFn = (req, next) => {
  const cloned = req.clone({
    setHeaders: {
      'Content-Type': 'application/json',
      'Accept-Language': 'es-ES',
    },
  });

  return next(cloned);
};
