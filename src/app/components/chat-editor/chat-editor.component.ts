import {Component, EventEmitter, OnInit, Output} from '@angular/core';

// @ts-ignore
import Editor from '@toast-ui/editor';

@Component({
  selector: 'app-chat-editor',
  imports: [],
  templateUrl: './chat-editor.component.html',
  styleUrl: './chat-editor.component.scss'
})
export class ChatEditorComponent implements OnInit {
  public editorInstance: Editor | undefined;
  @Output() emitMarkDown = new EventEmitter();

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

  public getMarkDownContent() {
    this.emitMarkDown.emit(this.editorInstance.getMarkdown())
  }

}
