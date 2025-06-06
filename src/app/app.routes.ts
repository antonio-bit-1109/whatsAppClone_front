import {Routes} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {SendEmailComponent} from './components/send-email/send-email.component';
import {ErrorComponent} from './components/error/error.component';
import {SuccessComponent} from './components/success/success.component';
import {HomeComponent} from './components/home/home.component';
import {MainHomeComponent} from './components/main-home/main-home.component';
import {ProfileComponent} from './components/profile/profile.component';
import {ChatMainComponent} from './components/chat-main/chat-main.component';
import {HandleEmailsComponent} from './components/handle-emails/handle-emails.component';

export const routes: Routes = [
  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  {path: "sendEmail", component: SendEmailComponent},
  {path: "error", component: ErrorComponent},
  {path: "success", component: SuccessComponent},
  {
    path: "home", component: HomeComponent, children: [
      {path: '', component: MainHomeComponent},
      {path: 'profile', component: ProfileComponent},
      {path: 'chats-main', component: ChatMainComponent},
      {path: 'handle-emails', component: HandleEmailsComponent},
    ]
  },
  {path: '', redirectTo: '/login', pathMatch: 'full'}, // Reindirizza alla pagina di login di default
  {path: '**', redirectTo: '/login'} // Gestione delle rotte non definite

];
