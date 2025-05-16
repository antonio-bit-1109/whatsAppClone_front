import {Component, OnInit} from '@angular/core';
import {Drawer} from 'primeng/drawer';
import {Button} from 'primeng/button';
import {LogoAppComponent} from '../logo-app/logo-app.component';
import {MenuItem} from 'primeng/api';
import {Menu} from 'primeng/menu';

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

  ngOnInit() {
    this.items = [
      {label: 'New', icon: 'pi pi-plus'},
      {label: 'Logout', icon: 'pi pi-search'}
    ];
  }
}

