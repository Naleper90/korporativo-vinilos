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
