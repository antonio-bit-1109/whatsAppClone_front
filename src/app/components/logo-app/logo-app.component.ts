import {Component, Input} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-logo-app',
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './logo-app.component.html',
  styleUrl: './logo-app.component.scss'
})
export class LogoAppComponent {

  @Input() classes: string = ""
}
