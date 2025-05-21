import {ChangeDetectorRef, Component} from '@angular/core';
import {Toast} from 'primeng/toast';
import {MessageService} from 'primeng/api';
import {Button, ButtonDirective} from 'primeng/button';

@Component({
  selector: 'app-navigation-btn',
  imports: [
    Toast,
    Button,
    ButtonDirective
  ],
  templateUrl: './navigation-btn.component.html',
  styleUrl: './navigation-btn.component.scss'
})
export class NavigationBtnComponent {


  constructor(private messageService: MessageService) {
  }

  show() {
    this.messageService.add({severity: 'success', summary: 'Success', detail: 'Message Content'});
  }
}
