import { Component } from '@angular/core';
import {Divider} from 'primeng/divider';
import {ButtonDirective} from 'primeng/button';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [
    Divider,
    ButtonDirective
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

}
