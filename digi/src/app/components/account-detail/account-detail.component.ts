import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.scss']
})
export class AccountDetailComponent{
  @Input() balance;
  @Input() title:String = "Balance";

  constructor() { }

}
