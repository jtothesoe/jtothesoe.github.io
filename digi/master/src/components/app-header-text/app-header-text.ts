import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header-text',
  templateUrl: 'app-header-text.html'
})
export class AppHeaderTextComponent {

  @Input() text: string;
  @Input() header: string;
  @Input() textStyle: any;
  @Input() headerStyle: any;

  constructor() {
  }

}
