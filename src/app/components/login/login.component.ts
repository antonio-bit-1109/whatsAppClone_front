import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InputText} from 'primeng/inputtext';
import {FloatLabel} from 'primeng/floatlabel';
import {Panel} from 'primeng/panel';
import {Button, ButtonDirective} from 'primeng/button';
import {Router, RouterLink} from '@angular/router';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {ILogin, IRegister} from '../../interfaces/auth';
import {ToastMessageService} from '../../services/toast-message.service';
import {DatePickerModule} from 'primeng/datepicker';
import {LogoAppComponent} from '../logo-app/logo-app.component';
import {handleHttpErrorResp, IErrorResponse} from '../../interfaces/errorResponse';
import {ISuccessResponse} from '../../interfaces/SuccessResponse';
import {HttpErrorResponse} from '@angular/common/http';
import {Select} from 'primeng/select';
import {citiesArrayConst} from '../../costanti/const';
import {CustomValidators} from '../../customValidators/pswMatchConfirmPsw';
import {AudioPlayerService} from '../../services/audio-player.service';
import {UlFormErrorsComponent} from '../ul-form-errors/ul-form-errors.component';

@Component({
  selector: 'app-login',
  imports: [CommonModule, InputText, FloatLabel, Panel, Button, RouterLink, ReactiveFormsModule, DatePickerModule, ButtonDirective, LogoAppComponent, Select, UlFormErrorsComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  public cities: any[] | undefined;
  @Input() public isLogin = true;
  public loginForm = new FormGroup({
    username: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required)
  })

  public registerForm = new FormGroup({
      username: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required),
      confermaPassword: new FormControl("", Validators.required),
      nome: new FormControl("", [Validators.required, Validators.minLength(2)]),
      cognome: new FormControl("", [Validators.required, Validators.minLength(2)]),
      cf: new FormControl("", [
        Validators.required,
        Validators.pattern("^[A-Za-z]{6}[0-9]{2}[A-Za-z][0-9]{2}[A-Za-z][0-9]{3}[A-Za-z]$")
      ]),
      dataNascita: new FormControl("", Validators.required),
      luogoNascita: new FormControl("", Validators.required),
      telefono: new FormControl("", Validators.required),
      email: new FormControl("", [
        Validators.required,
        Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.(it|com)$")
      ])
    },
    {validators: CustomValidators.validatePswAndConfirmPsw}
  );


  constructor(private authService: AuthService,
              private toastService: ToastMessageService,
              private router: Router,
              private audioPlayerService: AudioPlayerService) {

    // sorteggio nomi citta in ordine alfabetico
    this.cities = citiesArrayConst.sort((a, b) => a.item.localeCompare(b.item))
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
      next: (resp: ISuccessResponse) => {
        this.toastService.show("success", "Login", "Login effettuato con successo.")
        this.authService.saveToken(resp.message)
        this.audioPlayerService.startNewAudio("assets/fart1.mp3")
        void this.router.navigateByUrl("/home")
      },
      error: (err: HttpErrorResponse) => {
        const errObj = err.error as IErrorResponse
        this.toastService.show("error", "Login", errObj.errMsg);
      }
    })
  }

  // public checkIfErrorAndTouched(field: string, errType: string) {
  //
  //   if (this.registerForm.get(field)?.hasError(errType) &&
  //     this.registerForm.get(field)?.touched) {
  //     return true
  //   }
  //
  //   return false;
  // }
  //
  // public getCustomError(errorFieldName: string) {
  //   if (this.registerForm.hasError(errorFieldName) &&
  //     this.registerForm.touched) {
  //     return true
  //   }
  //   return false;
  // }

  public getRegisterField(field: string): string {

    const value = this.registerForm.get(field)?.value;

    if (typeof value === null || typeof value === undefined) {
      return ""
    }

    if (typeof value === 'string') {
      return value;
    }

    if (typeof value === 'object' && 'item' in value) {
      return value.item
    }

    return String(value);

  }


  public onSubmitRegister() {
    if (!this.registerForm.valid) {
      return
    }
    console.log(this.registerForm.value)

    const registerData: IRegister = {
      cognome: this.getRegisterField("cognome"),
      nome: this.getRegisterField("nome"),
      dataNascita: this.registerForm.controls.dataNascita.value ?
        this.registerForm.controls.dataNascita.value : "",
      cf: this.getRegisterField("cf").toUpperCase(),
      luogoNascita: this.getRegisterField("luogoNascita"),
      username: this.getRegisterField("username"),
      telefono: this.getRegisterField("telefono"),
      password: this.getRegisterField("password"),
      email: this.getRegisterField("email")
    }

    this.authService.register(registerData).subscribe({
      next: (resp: ISuccessResponse) => {
        this.toastService.show("success", "registrazione utente", resp.message)
        void this.router.navigateByUrl("/login");
      },
      error: (err: HttpErrorResponse) => {
        this.toastService.show("error", "registrazione utente", handleHttpErrorResp(err))
      }
    })

  }

  public redirectToGoogleAuth() {
    this.authService.loginWithGoogle()
  }

  protected readonly parseInt = parseInt;
  protected readonly Number = Number;
}
