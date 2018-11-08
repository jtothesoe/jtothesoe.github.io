import { Component, ViewChild, OnInit, Output, EventEmitter } from '@angular/core';
import * as Scanner from 'instascan/src/scanner';
import * as Camera from 'instascan/src/camera';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';

/**
 * Generated class for the QrReaderComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'qr-reader',
  templateUrl: 'qr-reader.html'
})
export class QrReaderComponent implements OnInit{
  @ViewChild('videoPlayer') mVideoPlayer: any;
  
  scanner:any;
  @Output() scanQrEvent = new EventEmitter();

  ngOnInit() {
    this.scanner =  new Scanner({video: this.mVideoPlayer.nativeElement});
    
    this.scanner.addListener('scan', (content)=>{
      this.scanQrEvent.emit(content);
    })
    
    Observable.fromPromise(Camera.getCameras())
    .subscribe((cameras)=>{

      if(cameras[0])
        this.scanner.start(cameras[0])
      else  
        console.error('no camera found')

    },
    function(err){
      console.log(err)
    })

  }


  constructor() {
  }

}
