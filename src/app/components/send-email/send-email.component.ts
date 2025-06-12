import {Component} from '@angular/core';
import {Button} from "primeng/button";
import {FloatLabel} from "primeng/floatlabel";
import {Panel} from "primeng/panel";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {LogoAppComponent} from '../logo-app/logo-app.component';
import {InputText} from 'primeng/inputtext';
import {AuthService} from '../../services/auth.service';
import {NgIf} from '@angular/common';
import {UlFormErrorsComponent} from '../ul-form-errors/ul-form-errors.component';
import {SendMeMessagesService} from '../../services/send-me-messages.service';
import {ISendMeMessage} from '../../interfaces/SendMeMessage';
import {HttpErrorResponse} from '@angular/common/http';
import {ISuccessResponse} from '../../interfaces/SuccessResponse';
import {ToastMessageService} from '../../services/toast-message.service';
import {IErrorResponse} from '../../interfaces/errorResponse';


@Component({
  selector: 'app-send-email',
  imports: [
    Panel,
    ReactiveFormsModule,
    FloatLabel,
    Button,
    RouterLink,
    LogoAppComponent,
    NgIf,
    UlFormErrorsComponent,
  ],
  templateUrl: './send-email.component.html',
  styleUrl: './send-email.component.scss'
})
export class SendEmailComponent {

  public isAutenticated: boolean = false;


  public sendEmailForm = new FormGroup({
    // email: new FormControl("", [
    //   Validators.required,
    //   Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.(it|com)$")
    // ]),
    text: new FormControl("", Validators.required)
  })

  constructor(private authService: AuthService,
              private sendMeMessageService: SendMeMessagesService,
              private toastMessage: ToastMessageService) {

    if (this.authService.getToken() !== null) {
      this.isAutenticated = true;
    }

  }


  sendEmail() {

    if (!this.sendEmailForm.valid) {
      return;
    }

    const sender = this.authService.getEmail()
    const text = this.sendEmailForm.controls.text.value

    if (sender && text) {
      const message: ISendMeMessage = {
        sender: sender,
        message: text
      }

      this.sendMeMessageService.sendMeMessage(message).subscribe({
        next: (resp: ISuccessResponse) => {
          this.toastMessage.show("success", "Invio Messaggio", resp.message)
          this.sendEmailForm.reset()
        },
        error: (err: HttpErrorResponse) => {
          const errObj = err.error as IErrorResponse
          this.toastMessage.show("error", "Invio Messaggio", errObj.errMsg)
        }
      })

    } else {
      console.error("email o messaggio null o non utilizzabili.")
    }

  }
}
