import {Component, Input} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {InputText} from 'primeng/inputtext';
import {FloatLabel} from 'primeng/floatlabel';
import {Panel} from 'primeng/panel';
import {Button} from 'primeng/button';
import {RouterLink} from '@angular/router';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {ILogin} from '../../interfaces/auth';
// @ts-ignore
import {HttpErrorResponse} from '@angular/common/module.d-CnjH8Dlt';
import {ToastMessageService} from '../../services/toast-message.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, InputText, FloatLabel, Panel, NgOptimizedImage, Button, RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  @Input() public isLogin = true;
  public loginForm = new FormGroup({
    username: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required)
  })

  constructor(private authService: AuthService,
              private toastService: ToastMessageService) {
  }

  onSubmit() {

    if (this.loginForm.controls.username.value === "" ||
      this.loginForm.controls.username.value === null) {
      return;
    }

    if (this.loginForm.controls.password.value === "" ||
      this.loginForm.controls.password.value === null) {
      return;
    }


    const loginData: ILogin = {
      username: this.loginForm.controls.username.value,
      password: this.loginForm.controls.password.value
    }

    this.authService.login(loginData).subscribe({
      next: (resp) => {
        this.toastService.show("success", "Login", "Login effettuato con successo.")
      },
      error: (err: HttpErrorResponse) => {
        console.error(err.error)
        this.toastService.show("error", "Login", err.error['message'])
      }
    })
  }

}
