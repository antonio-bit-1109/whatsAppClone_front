import {Component, Input} from '@angular/core';
import {Messaggio} from '../../interfaces/chat';
import {DatePipe, NgClass, NgStyle} from '@angular/common';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-comic',
  imports: [
    NgClass,
    DatePipe
  ],
  templateUrl: './comic.component.html',
  styleUrl: './comic.component.scss'
})
export class ComicComponent {

  @Input() messaggio: Messaggio | undefined

  constructor(private authService: AuthService) {
  }


  public checkIfSenderIsMe() {
    return this.messaggio?.email === this.authService.getEmail()
  }
}
