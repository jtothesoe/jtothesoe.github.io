import { Component, Input, OnDestroy} from '@angular/core';
import { OverlayProvider } from '../../providers/overlay/overlay';
/**
 * Generated class for the ToolTipComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'tool-tip',
  templateUrl: 'tool-tip.html'
})

export class ToolTipComponent implements OnDestroy{

  @Input() text: string;
  @Input() header: string;
  @Input() img: string;
  headerStyle ={'color': 'white', 'font-size' : '42px', 'margin-bottom' : '2%', 'margin-top': '10%'};
  textStyle = {'color': 'white', 'font-size' : '18px'};
  
  constructor(private overlayService: OverlayProvider) {
    console.log('Hello ToolTipComponent Component');
  }

  updateOverlayState(){
    this.overlayService.updateOverlayState();
  }

  ngOnDestroy(){
    this.overlayService.reset();
  }

  close(){
    this.overlayService.updateOverlayState();
  }
}
