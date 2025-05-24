import {AfterViewInit, Component, ElementRef, OnInit, ViewChild, OnDestroy} from '@angular/core';
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

    const editor = new Editor({
      el: document.querySelector('#editor'),
      height: '200px',
      initialEditType: 'wysiwyg',
      initialValue: "Inserisci messaggio.",
      previewStyle: 'tab',
    });
    this.editorInstance = editor;
    editor.getMarkdown();
  }

  // submitForm() {
  //   console.log(this.editorInstance.getMarkdown());
  //   console.log((this.editorInstance as Editor).getHTML());
  // }

}
