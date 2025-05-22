import {Component} from '@angular/core';
import {Button} from "primeng/button";
import {FloatLabel} from "primeng/floatlabel";
import {Panel} from "primeng/panel";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {LogoAppComponent} from '../logo-app/logo-app.component';
import {InputText} from 'primeng/inputtext';
import {UrlHandlerService} from '../../services/url-handler.service';
import {AuthService} from '../../services/auth.service';
import {NgIf} from '@angular/common';


@Component({
  selector: 'app-send-email',
  imports: [
    Panel,
    ReactiveFormsModule,
    FloatLabel,
    Button,
    RouterLink,
    LogoAppComponent,
    InputText,
    NgIf,
  ],
  templateUrl: './send-email.component.html',
  styleUrl: './send-email.component.scss'
})
export class SendEmailComponent {

  public isAutenticated: boolean = false;


  public sendEmailForm = new FormGroup({
    email: new FormControl("", [
      Validators.required,
      Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.(it|com)$\n")
    ]),
    text: new FormControl("", Validators.required)
  })

  constructor(protected urlHandler: UrlHandlerService,
              private authService: AuthService) {

    if (this.authService.getToken() !== null &&
      this.urlHandler.getPreviousUrl() !== null) {
      this.isAutenticated = true;
    }

  }


  sendEmail() {

  }
}
