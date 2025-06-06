import {Component, OnInit} from '@angular/core';
import {Button} from "primeng/button";
import {Drawer} from "primeng/drawer";
import {LogoAppComponent} from "../logo-app/logo-app.component";
import {Menu} from "primeng/menu";
import {MenuItem} from 'primeng/api';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {AudioPlayerService} from '../../services/audio-player.service';
import {ImageComponentComponent} from '../image-component/image-component.component';
import {UrlHandlerService} from '../../services/url-handler.service';
import {HandleWebSocketConnectionService} from '../../services/handle-web-socket-connection.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-side-bar',
  imports: [
    Button,
    Drawer,
    LogoAppComponent,
    Menu,
    ImageComponentComponent,
    NgIf
  ],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent implements OnInit {
  visible: boolean = false;
  items: MenuItem[] | undefined;

  constructor(protected authService: AuthService,
              private router: Router,
              private audioPlayerService: AudioPlayerService,
              private urlHandler: UrlHandlerService,
              private webSocketService: HandleWebSocketConnectionService) {
  }

  ngOnInit() {
    this.items = [
      {
        label: 'Chats', icon: 'pi pi-comments',
        command: () => this.navigateToComponent("/home/chats-main"),
      },
      {
        label: 'Profilo', icon: 'pi pi-user',
        command: () => this.navigateToComponent("/home/profile"),
      },
      {
        label: 'Home', icon: 'pi pi-home',
        command: () => this.navigateToComponent("/home")
      },
      {
        label: 'Mandami un messaggio', icon: 'pi pi-inbox',
        command: () => this.navigateToComponent("/sendEmail")
      },
    ];
  }

  public getUserFullName() {
    return "Ciao, " + this.authService.getFullName();
  }

  public navigateToComponent(routerPath: string) {
    void this.router.navigateByUrl(routerPath)
    this.visible = false;
  }

  public async logout() {
    await this.webSocketService.disconnectToServerSocket()
    this.authService.logout()
    this.audioPlayerService.startNewAudio("assets/fart2.mp3")
  }


  public navigatePrevious() {
    const previousRoute = this.urlHandler.getPreviousUrl();
    previousRoute && void this.router.navigateByUrl(previousRoute)
  }
}
