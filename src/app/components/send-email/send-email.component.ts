import {Component} from '@angular/core';
import {Button} from "primeng/button";
import {FloatLabel} from "primeng/floatlabel";
import {Panel} from "primeng/panel";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {LogoAppComponent} from '../logo-app/logo-app.component';
import {InputText} from 'primeng/inputtext';

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
  ],
  templateUrl: './send-email.component.html',
  styleUrl: './send-email.component.scss'
})
export class SendEmailComponent {

  public sendEmailForm = new FormGroup({
    email: new FormControl("", Validators.required),
    text: new FormControl("", Validators.required)
  })

  sendEmail() {

  }
}
