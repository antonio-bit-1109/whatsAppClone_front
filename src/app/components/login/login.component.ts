import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import {ButtonDirective} from 'primeng/button';
import {InputText} from 'primeng/inputtext';
import {Divider} from 'primeng/divider';

@Component({
  selector: 'app-login',
  imports: [CommonModule, InputText, Divider, ButtonDirective],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

}
