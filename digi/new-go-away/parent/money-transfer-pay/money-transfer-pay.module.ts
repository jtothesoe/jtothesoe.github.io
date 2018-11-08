import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MoneyTransferPayPage } from './money-transfer-pay.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: MoneyTransferPayPage
      }
    ])
  ],
  declarations: [MoneyTransferPayPage]
})
export class MoneyTransferPayPageModule {}
