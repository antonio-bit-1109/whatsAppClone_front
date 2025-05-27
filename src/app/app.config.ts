import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {routes} from './app.routes';
import {provideRouter} from '@angular/router';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {providePrimeNG} from 'primeng/config';
import Aura from '@primeng/themes/aura';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {MessageService} from 'primeng/api';
import {UrlHandlerService} from './services/url-handler.service';
import {addJWTInterceptor} from './interceptors/add-jwt.interceptor';
import {intercept401Interceptor} from './interceptors/intercept-401.interceptor';


export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({eventCoalescing: true}),
    provideHttpClient(
      withInterceptors([addJWTInterceptor, intercept401Interceptor])
    ),
    provideRouter(routes),
    provideAnimationsAsync(),
    UrlHandlerService,
    MessageService,
    providePrimeNG({
      ripple: true,
      theme: {
        preset: Aura,
        options: {
          prefix: 'p',
          darkModeSelector: 'system',
          cssLayer: false
        },
      }
    })
  ]
};


