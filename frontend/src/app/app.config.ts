import { ApplicationConfig } from '@angular/core';
import { provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi, withInterceptors } from '@angular/common/http';

import { ThemeService } from './services/theme.service';
import { routes } from './app.routes';
import { commonHeadersInterceptor } from './interceptors/common-headers.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideClientHydration(withEventReplay()),

    provideHttpClient(
      withInterceptorsFromDi(),
      withInterceptors([commonHeadersInterceptor]),
    ),

    ThemeService,
  ],
};
