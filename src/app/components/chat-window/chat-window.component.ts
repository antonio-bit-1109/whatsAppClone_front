import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {ChatEditorComponent} from '../chat-editor/chat-editor.component';
import {IChatDto} from '../../interfaces/chat';
import {Panel} from 'primeng/panel';
import {ImageComponentComponent} from '../image-component/image-component.component';
import {Button, ButtonDirective} from 'primeng/button';
import {NgForOf, NgIf} from '@angular/common';
import {UtilityMethodService} from '../../services/utility-method.service';

@Component({
  selector: 'app-chat-window',
  imports: [
    ChatEditorComponent,
    Panel,
    ImageComponentComponent,
    Button,
    NgIf,
    NgForOf,
    ButtonDirective
  ],
  templateUrl: './chat-window.component.html',
  styleUrl: './chat-window.component.scss'
})
export class ChatWindowComponent implements OnChanges {

  @Input() public selectedchat: IChatDto | null = null;
  public populated: boolean = false;

  constructor(protected utilityMethod: UtilityMethodService) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedchat']) {
      const currValue = changes['selectedchat'].currentValue;
      if (currValue) {
        this.populated = true;
      }
    }
  }

  public takePartecipante() {
    return this.selectedchat && this.selectedchat?.listaPartecipanti ?
      this.selectedchat.listaPartecipanti[0] : [][0]
  }
}
