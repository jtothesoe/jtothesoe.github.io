import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NavController } from 'ionic-angular';
import { OverlayProvider } from '../../providers/overlay/overlay';
/**
 * Generated class for the CardInputComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'card-input',
  templateUrl: 'card-input.html'
})
export class CardInputComponent {

  @Input() text: string;
  @Input() btnText: string;
  @Output() onClickEvent: EventEmitter<any> = new EventEmitter();

  constructor(public navCtrl: NavController, private overlayService: OverlayProvider) {
    console.log('Hello CardInputComponent Component');
  }

  clickEvent(): void {
    this.onClickEvent.emit();
  }

  cancel(){
    this.overlayService.updateOverlayState();
  }
}
