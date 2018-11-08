import { Component, ViewChild, Input } from '@angular/core';
import Qrcode from 'qrcode';
/**
 * Generated class for the QrCodeComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'qr-code',
  templateUrl: 'qr-code.html'
})
export class QrCodeComponent {
  @ViewChild('qr') qr:any;
  @Input() qrHash:any;

  ngAfterContentInit(){
    this.generateQr(this.qrHash);
  }

  generateQr(qrHash){
    Qrcode.toCanvas(this.qr.nativeElement, qrHash, (err)=>{
      if(err)
        console.log(err)
      else  
        console.log('success')
    })
  }

  constructor() {
    console.log('Hello QrCodeComponent Component');

  }

}
