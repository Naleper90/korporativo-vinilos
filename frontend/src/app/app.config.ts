/**
 * Configuración global de la aplicación Angular.
 * Incluye providers para routing, HTTP client, interceptores y hydration.
 */
import { ApplicationConfig } from '@angular/core';
import {
  provideRouter,
  withPreloading,
  PreloadAllModules,
  withViewTransitions,
  withInMemoryScrolling,
} from '@angular/router';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi, withInterceptors, withFetch } from '@angular/common/http';

import { ThemeService } from './services/theme.service';
import { routes } from './app.routes';
import { commonHeadersInterceptor } from './interceptors/common-headers.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withPreloading(PreloadAllModules),
      withViewTransitions(),
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled',
      })
    ),

    provideClientHydration(withEventReplay()),

    provideHttpClient(
      withFetch(),
      withInterceptorsFromDi(),
      withInterceptors([commonHeadersInterceptor]),
    ),

    ThemeService,
  ],
};
