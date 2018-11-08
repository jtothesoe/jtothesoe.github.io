import { Component, Input, OnDestroy} from '@angular/core';
import { OverlayService } from '../../services/overlay.service';
/**
 * Generated class for the ToolTipComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'tool-tip',
  templateUrl: './tool-tip.component.html',
  styleUrls: ['./tool-tip.component.scss']
})

export class ToolTipComponent implements OnDestroy{

  @Input() text: string;
  @Input() header: string;
  @Input() img: string;
  headerStyle ={'color': 'white', 'font-size' : '42px', 'margin-bottom' : '2%', 'margin-top': '10%'};
  textStyle = {'color': 'white', 'font-size' : '18px'};
  
  constructor(private overlayService: OverlayService) {
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
