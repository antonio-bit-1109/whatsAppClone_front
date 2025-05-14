import {Component, Input} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {InputText} from 'primeng/inputtext';
import {FloatLabel} from 'primeng/floatlabel';
import {Panel} from 'primeng/panel';
import {Button} from 'primeng/button';
import {RouterLink} from '@angular/router';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {ILogin, IRegister} from '../../interfaces/auth';
// @ts-ignore
import {HttpErrorResponse} from '@angular/common/module.d-CnjH8Dlt';
import {ToastMessageService} from '../../services/toast-message.service';
import {DatePickerModule} from 'primeng/datepicker';

@Component({
  selector: 'app-login',
  imports: [CommonModule, InputText, FloatLabel, Panel, NgOptimizedImage, Button, RouterLink, ReactiveFormsModule, DatePickerModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  @Input() public isLogin = true;
  public loginForm = new FormGroup({
    username: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required)
  })

  public registerForm = new FormGroup({
    username: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required),
    confermaPassword: new FormControl("", Validators.required),
    nome: new FormControl("", Validators.required),
    cognome: new FormControl("", Validators.required),
    cf: new FormControl("", [
      Validators.required,
      Validators.pattern("^[A-Z]{6}[0-9]{2}[A-Z][0-9]{2}[A-Z][0-9]{3}[A-Z]$")
    ]),
    dataNascita: new FormControl("", Validators.required),
    luogoNascita: new FormControl("", Validators.required),
    telefono: new FormControl("", Validators.required)
  })

  constructor(private authService: AuthService,
              private toastService: ToastMessageService) {
  }

  onSubmitLogin() {

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

  public checkIfErrorAndTouched(field: string, errType: string) {


    if (this.registerForm.get(field)?.hasError(errType) &&
      this.registerForm.get(field)?.touched) {
      return true
    }

    return false;
  }

  public getRegisterField(field: string): string {
    return this.registerForm.get(field)?.value;
  }


  public onSubmitRegister() {
    if (!this.registerForm.valid) {
      return
    }

    const registerData: IRegister = {
      cognome: this.getRegisterField("cognome"),
      nome: this.getRegisterField("nome"),
      dataNascita: this.getRegisterField("dataNascita"),
      cf: this.getRegisterField("cf").toUpperCase(),
      luogoNascita: this.getRegisterField("luogoNascita"),
      username: this.getRegisterField("username"),
      telefono: this.getRegisterField("telefono"),
      password: this.getRegisterField("password")

    }

    this.authService.register(registerData).subscribe({
      next: (resp) => {
        console.log(resp)
      },
      error: (err: HttpErrorResponse) => {
        console.error(err.error)
      }
    })

  }

}
