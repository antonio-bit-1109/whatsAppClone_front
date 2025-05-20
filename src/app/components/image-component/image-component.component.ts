import {Component, Input} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-image-component',
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './image-component.component.html',
  styleUrl: './image-component.component.scss'
})
export class ImageComponentComponent {
  @Input() src: string = "";
  @Input() height: string = "100";
  @Input() width: string = "100";
  @Input() classes: string = "";
}
