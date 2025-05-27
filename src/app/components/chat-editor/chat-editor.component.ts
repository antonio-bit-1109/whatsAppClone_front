import {Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges} from '@angular/core';

// @ts-ignore
import Editor from '@toast-ui/editor';

@Component({
  selector: 'app-chat-editor',
  imports: [],
  templateUrl: './chat-editor.component.html',
  styleUrl: './chat-editor.component.scss'
})
export class ChatEditorComponent implements OnInit, OnChanges {
  public editorInstance: Editor | undefined;
  @Output() emitMarkDown = new EventEmitter();
  @Input() public cleanMarkDown: string | null = null;

  ngOnInit() {

    this.editorInstance = new Editor({
      el: document.querySelector('#editor'),
      height: '150px',
      width: '100%',
      initialEditType: 'wysiwyg',
      initialValue: "",
      previewStyle: 'tab',
    });

    this.editorInstance.on('change', () => {
      this.getMarkDownContent();
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['cleanMarkDown'].currentValue != changes['cleanMarkDown'].previousValue) {
      console.log(this.cleanMarkDown)
      this.editorInstance.setMarkdown("")
    }
  }

  public getMarkDownContent() {
    this.emitMarkDown.emit(this.editorInstance.getMarkdown())
  }

}
