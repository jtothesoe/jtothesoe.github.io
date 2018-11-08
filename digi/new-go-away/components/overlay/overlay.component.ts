import { Component, OnDestroy } from '@angular/core';
import { trigger, state,  style, animate, transition } from '@angular/animations';
import { OverlayService } from '../../services/overlay.service';
import { Subscription } from 'rxjs';

/**
 * Generated class for the OverlayComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss'],
  animations: [
    trigger('overlayState',[
      state('active', style({
        transform: 'translateY(0%)',
        opacity : '1'
      })),
      state('inactive', style({
        transform: 'translateY(100%)',
        opacity : '0'
      })),
      transition('inactive => active', animate('250ms ease-out')),
      transition('active => inactive', animate('250ms ease-in'))
    ])
  ]
})
export class OverlayComponent implements OnDestroy{

  toolSub = new Subscription();
  overlay: any;
  constructor(private overlaySerivce: OverlayService) {
    console.log('create new')
    
    this.toolSub = this.overlaySerivce.getOverlayState().subscribe((state)=>{  
      console.log(state)    
      this.overlay = state;
    })
  }

  ngOnDestroy(){
    console.log('destory')
    this.toolSub.unsubscribe();
  }
  

}
