import {Component, OnInit} from '@angular/core';
import {Drawer} from 'primeng/drawer';
import {Button} from 'primeng/button';
import {LogoAppComponent} from '../logo-app/logo-app.component';
import {MenuItem} from 'primeng/api';
import {Menu} from 'primeng/menu';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-main-home',
  imports: [
    Drawer,
    Button,
    LogoAppComponent,
    Menu,
  ],
  templateUrl: './main-home.component.html',
  styleUrl: './main-home.component.scss'
})
export class MainHomeComponent implements OnInit {
  visible: boolean = false;
  items: MenuItem[] | undefined;

  constructor(protected authService: AuthService) {
  }

  ngOnInit() {
    this.items = [
      {label: 'prova1', icon: 'pi pi-plus'},
      {label: 'prova2', icon: 'pi pi-search'}
    ];
  }
}

