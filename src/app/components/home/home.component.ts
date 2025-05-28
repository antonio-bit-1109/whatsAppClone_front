import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {SideBarComponent} from '../side-bar/side-bar.component';

@Component({
  selector: 'app-home',
  imports: [
    RouterOutlet,
    SideBarComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor() {

  }
}
