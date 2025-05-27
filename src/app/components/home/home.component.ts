import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {SideBarComponent} from '../side-bar/side-bar.component';
import {HandleWebSocketConnectionService} from '../../services/handle-web-socket-connection.service';

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

  constructor(private webSocketService: HandleWebSocketConnectionService) {

    this.webSocketService.connectToServerSocket("8080");

  }
}
