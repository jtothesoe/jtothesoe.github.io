import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MoneyTransferCompletePage } from './money-transfer-complete.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: MoneyTransferCompletePage
      }
    ])
  ],
  declarations: [MoneyTransferCompletePage]
})
export class MoneyTransferCompletePageModule {}
