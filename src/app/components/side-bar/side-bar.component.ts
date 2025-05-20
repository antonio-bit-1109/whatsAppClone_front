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

@Component({
  selector: 'app-side-bar',
  imports: [
    Button,
    Drawer,
    LogoAppComponent,
    Menu,
    ImageComponentComponent
  ],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent implements OnInit {
  visible: boolean = false;
  items: MenuItem[] | undefined;

  constructor(protected authService: AuthService,
              private router: Router,
              private audioPlayerService: AudioPlayerService) {
  }

  ngOnInit() {
    this.items = [
      {label: 'chat', icon: 'pi pi-comments'},
      {
        label: 'profilo', icon: 'pi pi-user',
        command: () => this.navigateToComponent("/home/profile"),
      },
      {
        label: 'home', icon: 'pi pi-home',
        command: () => this.navigateToComponent("/home")
      },
    ];
  }

  public navigateToComponent(routerPath: string) {
    void this.router.navigateByUrl(routerPath)
  }

  public logout() {
    this.authService.logout()
    this.audioPlayerService.startNewAudio("assets/fart2.mp3")
  }


}
