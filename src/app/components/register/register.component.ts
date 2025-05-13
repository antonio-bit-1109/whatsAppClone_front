import {Component} from '@angular/core';
import {Divider} from 'primeng/divider';
import {ButtonDirective} from 'primeng/button';
import {RouterLink} from '@angular/router';
import {LoginComponent} from '../login/login.component';

@Component({
  selector: 'app-register',
  imports: [

    LoginComponent
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

}
