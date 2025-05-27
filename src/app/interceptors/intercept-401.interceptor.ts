import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {tap} from 'rxjs';
import {inject} from '@angular/core';
import {ToastMessageService} from '../services/toast-message.service';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';

export const intercept401Interceptor: HttpInterceptorFn = (req, next) => {

  const toastService = inject(ToastMessageService);
  const router = inject(Router);
  const authService = inject(AuthService);

  return next(req).pipe(
    tap({
      next: (resp) => console.log("risposta ok -->", resp),
      error: (err: HttpErrorResponse) => {

        if (err.status === 401) {
          toastService.show("error", "sessione scaduta", "la tua sessione è scaduta, rieffettua il login.");
          authService.logout();
          void router.navigateByUrl("/login")
        }
      }
    })
  );
};
