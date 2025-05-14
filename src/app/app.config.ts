import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {routes} from './app.routes';
import {provideRouter} from '@angular/router';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {providePrimeNG} from 'primeng/config';
import Aura from '@primeng/themes/aura';
import {provideHttpClient} from '@angular/common/http';
import {MessageService} from 'primeng/api';


export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({eventCoalescing: true}),
    provideHttpClient(),
    provideRouter(routes),
    provideAnimationsAsync(),
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


