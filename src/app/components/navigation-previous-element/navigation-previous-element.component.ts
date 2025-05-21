import {Component} from '@angular/core';
import {Button, ButtonDirective} from "primeng/button";
import {Toast} from "primeng/toast";
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-navigation-previous-element',
  imports: [],
  templateUrl: './navigation-previous-element.component.html',
  styleUrl: './navigation-previous-element.component.scss'
})
export class NavigationPreviousElementComponent {
  constructor(private messageService: MessageService) {
  }

  show() {
    this.messageService.add({severity: 'success', summary: 'Success', detail: 'Message Content'});
  }
}
