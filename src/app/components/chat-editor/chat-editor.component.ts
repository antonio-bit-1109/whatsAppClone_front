import {Component, OnInit} from '@angular/core';
// @ts-ignore
import Editor from '@toast-ui/editor';


@Component({
  selector: 'app-chat-editor',
  imports: [],
  templateUrl: './chat-editor.component.html',
  styleUrl: './chat-editor.component.scss'
})
export class ChatEditorComponent implements OnInit {
  public editorInstance: any;

  ngOnInit() {

    this.editorInstance = new Editor({
      el: document.querySelector('#editor'),
      height: '150px',
      width: '100%',
      initialEditType: 'wysiwyg',
      initialValue: "",
      previewStyle: 'tab',
    });
  }
  

}
