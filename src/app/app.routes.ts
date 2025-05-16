import {Routes} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {SendEmailComponent} from './components/send-email/send-email.component';
import {ErrorComponent} from './components/error/error.component';

export const routes: Routes = [
  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  {path: "sendEmail", component: SendEmailComponent},
  {path: "error", component: ErrorComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'}, // Reindirizza alla pagina di login di default
  {path: '**', redirectTo: '/login'} // Gestione delle rotte non definite

];
