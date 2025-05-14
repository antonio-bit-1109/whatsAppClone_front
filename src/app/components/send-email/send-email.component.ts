import {Component} from '@angular/core';
import {Button} from "primeng/button";
import {FloatLabel} from "primeng/floatlabel";
import {InputText} from "primeng/inputtext";
import {NgIf, NgOptimizedImage} from "@angular/common";
import {Panel} from "primeng/panel";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-send-email',
  imports: [
    Panel,
    ReactiveFormsModule,
    NgOptimizedImage,
    FloatLabel,
    Button,
    RouterLink,
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
